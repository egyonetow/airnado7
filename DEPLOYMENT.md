# 🚀 دليل النشر - لعبة الطيارة

# 📋 المتطلبات

- حساب GitHub
- حساب Vercel (مجاني)
- Git مثبت على الجهاز

## 🔧 خطوات النشر على GitHub

## 1. إنشاء مستودع GitHub جديد

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit: Aviator Game"
```

### 2. ربط المستودع بـ GitHub

```bash
# استبدل YOUR_USERNAME باسم المستخدم الخاص بك
git remote add origin https://github.com/YOUR_USERNAME/aviator-game.git
git branch -M main
git push -u origin main
```

## 🌐 النشر على Vercel

### الطريقة الأولى: عبر موقع Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط على "New Project"
4. اختر مستودع `aviator-game`
5. اضغط على "Deploy"

### الطريقة الثانية: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# للنشر في الإنتاج
vercel --prod
```

## 🔗 الروابط بعد النشر

بعد النشر الناجح ستحصل على:

- **الرابط الرئيسي**: `https://your-project.vercel.app`
- **الأداة السرية**: `https://your-project.vercel.app/admin-tool`

## ⚙️ إعدادات إضافية

### تخصيص النطاق

1. في لوحة تحكم Vercel
2. اذهب إلى "Domains"
3. أضف النطاق المخصص

### متغيرات البيئة

إذا كنت تريد إضافة متغيرات بيئة:

1. في لوحة تحكم Vercel
2. اذهب إلى "Settings" > "Environment Variables"
3. أضف المتغيرات المطلوبة

## 🔄 التحديثات

لتحديث الموقع:

```bash
# إضافة التغييرات
git add .
git commit -m "Update: description of changes"
git push

# Vercel سيقوم بالنشر تلقائياً
```

## 📱 النشر على GitHub Pages (بديل)

### تفعيل GitHub Pages

1. اذهب إلى إعدادات المستودع
2. انتقل إلى "Pages"
3. اختر "Deploy from a branch"
4. اختر "main" branch
5. اختر "/ (root)"
6. احفظ الإعدادات

الرابط سيكون: `https://YOUR_USERNAME.github.io/aviator-game/`

## 🛡️ الأمان

### حماية الأداة السرية

لحماية إضافية للأداة السرية:

1. **تغيير اسم الملف**:
   ```bash
   mv admin-tool.html secret-admin-panel-2024.html
   ```

2. **إضافة كلمة مرور JavaScript**:
   ```javascript
   const adminPassword = prompt("أدخل كلمة المرور:");
   if (adminPassword !== "YOUR_SECRET_PASSWORD") {
       window.location.href = "/";
   }
   ```

3. **استخدام رابط معقد**:
   ```
   https://your-site.com/admin-xyz-secret-2024
   ```

## 🔍 مراقبة الأداء

### Vercel Analytics

1. في لوحة تحكم Vercel
2. اذهب إلى "Analytics"
3. فعّل المراقبة

### Google Analytics (اختياري)

أضف هذا الكود في `<head>` في index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

1. **الموقع لا يعمل**:
   - تأكد من وجود index.html في الجذر
   - تحقق من console في المتصفح

2. **الأداة السرية لا تعمل**:
   - تأكد من الراب�� الصحيح
   - تحقق من localStorage

3. **البيانات لا تُحفظ**:
   - تأكد من تفعيل localStorage في المتصفح
   - تحقق من إعدادات الخصوصية

## 📞 الدعم

للمساعدة في النشر:
- **تليجرام**: [@PrinceOfDeals](https://t.me/PrinceOfDeals)
- **GitHub Issues**: في مستودع المشروع

## ✅ قائمة التحقق

- [ ] رفع الملفات إلى GitHub
- [ ] ربط المستودع بـ Vercel
- [ ] اختبار الموقع الرئيسي
- [ ] اختبار الأداة السرية
- [ ] تخصيص النطاق (اختياري)
- [ ] إعداد المراقبة (اختياري)
- [ ] اختبار على أجهزة مختلفة

---

**نصيحة**: احتفظ بنسخة احتياطية من جميع الملفات قبل النشر!