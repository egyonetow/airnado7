// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTO6hAkTAcgPQ5cf0zsgK9Gx-HNsTavIo",
  authDomain: "airnado-2030.firebaseapp.com",
  projectId: "airnado-2030",
  storageBucket: "airnado-2030.firebasestorage.app",
  messagingSenderId: "442868286084",
  appId: "1:442868286084:web:b3989e63d92ba65126f8d1",
  measurementId: "G-CM0HX3B9MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);
