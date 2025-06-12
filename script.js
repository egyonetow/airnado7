// script.js
import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// ✅ تشمل كل العمليات: تسجيل، تسجيل دخول، لعب، سحب، مراسلة، دعوات، إشعارات...

// 🔄 حفظ الوضع الليلي/النهاري
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.body.classList.add(savedTheme);
window.toggleTheme = function () {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark-mode" : "light-mode");
};

// 📌 عناصر DOM المستخدمة كثيرًا
const usernameSpan = document.getElementById("username");
const balanceSpan = document.getElementById("balance");
const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");

// 🔐 تسجيل مستخدم جديد
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const referral = document.getElementById("regReferral").value.trim();

    const userData = {
      username,
      password,
      phone: document.getElementById("regPhone").value,
      email: document.getElementById("regEmail").value,
      country: document.getElementById("regCountry").value,
      balance: 0,
      referrals: 0,
      createdAt: new Date().toISOString()
    };

    try {
      if (referral && referral !== username) {
        const referrerDoc = await getDoc(doc(db, "users", referral));
        if (referrerDoc.exists()) {
          userData.referrer = referral;
          const count = (referrerDoc.data().referrals || 0) + 1;
          await updateDoc(doc(db, "users", referral), { referrals: count });
        }
      }
      await setDoc(doc(db, "users", username), userData);
      alert("تم إنشاء الحساب بنجاح!");
      registerForm.reset();
    } catch (err) {
      alert("خطأ في التسجيل: " + err.message);
    }
  });
}

// 🔓 تسجيل الدخول
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const ref = doc(db, "users", username);
    const snap = await getDoc(ref);
    if (!snap.exists() || snap.data().password !== password) return alert("بيانات غير صحيحة");

    loginScreen.style.display = "none";
    gameScreen.style.display = "block";
    usernameSpan.textContent = `مرحباً، ${username}`;
    balanceSpan.textContent = snap.data().balance.toFixed(2);
    loadReferralInfo(username);
    startMessageWatcher(username);
    loadInbox(username);
  });
}

// 📥 السحب
const withdrawForm = document.getElementById("withdrawForm");
if (withdrawForm) {
  withdrawForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = usernameSpan.textContent.replace("مرحباً، ", "").trim();
    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    const method = document.getElementById("withdrawMethod").value;
    const account = document.getElementById("withdrawAccount").value.trim();
    if (!amount || !method || !account) return;
    await addDoc(collection(db, "withdraw_requests"), {
      username, amount, method, account,
      status: "pending",
      requestedAt: new Date().toISOString()
    });
    alert("تم إرسال الطلب");
    withdrawForm.reset();
    document.getElementById("withdrawModal").style.display = "none";
  });
}

// 🧾 عرض معلومات الدعوة
async function loadReferralInfo(username) {
  const snap = await getDoc(doc(db, "users", username));
  if (snap.exists()) {
    document.getElementById("userReferralCode").textContent = username;
    document.getElementById("userReferralCount").textContent = snap.data().referrals || 0;
  }
}

// 📬 صندوق الوارد
const inboxBtn = document.getElementById("inboxBtn");
if (inboxBtn) inboxBtn.onclick = () => document.getElementById("inboxModal").style.display = "flex";

window.sendUserReply = async function () {
  const username = usernameSpan.textContent.replace("مرحباً، ", "").trim();
  const msg = document.getElementById("userReply").value;
  if (!msg) return;
  await addDoc(collection(db, "messages"), {
    from: username,
    to: "admin",
    message: msg,
    timestamp: new Date().toISOString(),
    seen: false
  });
  document.getElementById("userReply").value = "";
  loadInbox(username);
};

async function loadInbox(username) {
  const q = query(collection(db, "messages"), where("from", "in", ["admin", username]), where("to", "in", ["admin", username]), orderBy("timestamp"));
  const snap = await getDocs(q);
  const box = document.getElementById("inboxMessages");
  box.innerHTML = "";
  snap.forEach(doc => {
    const m = doc.data();
    box.innerHTML += `<div><b>${m.from}:</b> ${m.message}</div>`;
  });
}

// 🔔 مراقبة الرسائل الجديدة
let messageCheckInterval;
function startMessageWatcher(username) {
  clearInterval(messageCheckInterval);
  messageCheckInterval = setInterval(async () => {
    const q = query(collection(db, "messages"), where("to", "==", username), where("seen", "!=", true), orderBy("timestamp"));
    const snap = await getDocs(q);
    snap.forEach(async (docSnap) => {
      const msg = docSnap.data();
      showNotification(`📩 رسالة جديدة: ${msg.message}`, "info");
      await updateDoc(doc(db, "messages", docSnap.id), { seen: true });
    });
  }, 30000);
}

// 🔔 إشعار داخلي
function showNotification(text, type = "info") {
  const n = document.createElement("div");
  n.textContent = text;
  n.style.position = "fixed";
  n.style.bottom = "20px";
  n.style.right = "20px";
  n.style.padding = "10px 20px";
  n.style.background = type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3";
  n.style.color = "white";
  n.style.borderRadius = "10px";
  n.style.zIndex = "9999";
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 4000);
}
