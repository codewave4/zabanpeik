<div align="center">

# 🌐 Translify

### مترجم متن سریع، دقیق و حرفه‌ای — کاملاً در مرورگر

[![Version](https://img.shields.io/badge/version-2.0.0-2dd4bf?style=flat-square)](https://github.com/codewave4/zabanpeik)
[![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)](#-license)
[![Made with](https://img.shields.io/badge/made%20with-vanilla%20js-f7df1e?style=flat-square)](#)
[![Hosted on](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-000?style=flat-square&logo=github)](https://codewave4.github.io/zabanpeik/)
[![Live Demo](https://img.shields.io/badge/▶%20Live%20Demo-Open-00e676?style=flat-square)](https://codewave4.github.io/zabanpeik/)

[🌍 نسخهٔ زنده](https://codewave4.github.io/zabanpeik/) • [🐞 گزارش باگ](../../issues) • [💡 پیشنهاد قابلیت](../../issues)

---

یک ابزار ترجمهٔ مدرن، موبایل-فرست و کاملاً کلاینت‌ساید که بدون هیچ سروری اجرا می‌شود — فقط HTML، CSS و JavaScript خالص.

</div>

## ✨ چرا Translify؟

مترجم‌های آنلاین معمولاً پر از تبلیغ، ردیاب و ثبت‌نام هستند. Translify با این هدف ساخته شده:

> **ترجمهٔ سریع و تمیز، بدون ردیابی، بدون ثبت‌نام، مستقیماً در مرورگر شما.**

## 🚀 ویژگی‌ها

| دسته | قابلیت |
|:----|:--------|
| 🌍 **چندزبانه** | پشتیبانی از بیش از **۱۰۰ زبان زنده** + تشخیص خودکار زبان مبدأ |
| 🧠 **موتور ترکیبی** | فال‌بک هوشمند: ابتدا **Google Translate**، در صورت قطعی به‌صورت خودکار به **MyMemory** |
| 🎨 **۳ تم رنگی** | تیره، روشن، و مشکی‌سبز (terminal mode) با ذخیره در مرورگر |
| 🎤 **ورودی صوتی** | تایپ صوتی با Web Speech API برای هر زبان |
| 🔊 **پخش صوتی** | تلفظ متن مبدأ و ترجمه با SpeechSynthesis |
| 📖 **معانی جایگزین** | پیشنهاد واژه‌های مترادف و توضیح کلمات با کمک Wiktionary |
| 📝 **تاریخچهٔ کامل** | ذخیره خودکار، جست‌وجو، نشانه‌گذاری ⭐ و گروه‌بندی روزانه |
| 📤 **اشتراک‌گذاری** | کپی، Share API و حالت zen برای مطالعهٔ راحت متن |
| ♿ **دسترس‌پذیر** | ARIA labels، navigation کیبوردی، پشتیبانی کامل RTL |
| 🔒 **حریم خصوصی** | هیچ داده‌ای به سرور سازنده ارسال نمی‌شود — همه چیز در `localStorage` |

## 🛠 تکنولوژی‌ها

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Google%20Translate-4285F4?style=flat-square&logo=googletranslate&logoColor=white" />
  <img src="https://img.shields.io/badge/Wiktionary-FF8000?style=flat-square&logo=wikipedia&logoColor=white" />
</p>

## ⚡️ شروع سریع

### برای کاربر
کافی است به [این لینک](https://codewave4.github.io/zabanpeik/) بروید. هیچ نصبی لازم نیست.

### برای توسعه

```bash
# 1. کلون کنید
git clone https://github.com/codewave4/zabanpeik.git
cd zabanpeik

# 2. سرور محلی اجرا کنید (برای API ها لازم است، نه از file://)
# با Python:
python3 -m http.server 8000

# یا با Node:
npx serve .

# 3. مرورگر را باز کنید
open http://localhost:8000
```

## 📦 ساختار پروژه

zabanpeik/
├── index.html        ← کل برنامه (تک‌فایل SPA)
├── README.md


> طراحی single-file برای سادگی دیپلوی روی GitHub Pages انجام شده است.

## 🎯 نحوهٔ استفاده

| عمل | راه میان‌بر |
|:-----|:-----------|
| ترجمهٔ متن | `Ctrl` + `Enter` درون کادر ورودی |
| تغییر تم | کلیک روی آیکون خورشید/ماه در بالا |
| جابه‌جایی زبان‌ها | دکمهٔ ⇄ وسط ردیف زبان‌ها |
| حالت zen (بزرگ‌تر شدن متن) | آیکون «نمای ساده» بالای خروجی |

## 🤝 مشارکت

پیشنهادها، گزارش باگ‌ها و Pull Request‌ها با آغوش باز پذیرفته می‌شوند.

1. Fork بگیرید
2. Branch خودتان را بسازید: `git checkout -b feature/my-feature`
3. Commit کنید: `git commit -m "feat: اضافه کردن فلان قابلیت"`
4. Push کنید: `git push origin feature/my-feature`
5. یک Pull Request باز کنید

لطفاً قبل از کار روی تغییرات بزرگ، یک [Issue](../../issues/new) باز کنید تا هم‌فکری کنیم.

## 📜 License

این پروژه تحت مجوز **MIT** منتشر شده است — جزئیات را در [LICENSE](LICENSE) ببینید.

## 🔗 پیوندها

- 🌐 **سایت زنده:** [codewave4.github.io/zabanpeik](https://codewave4.github.io/zabanpeik/)
- 💬 **کانال تلگرام:** [دریافت لینک](https://t.me/)
- 👤 **توسعه‌دهنده:** [@codewave4](https://github.com/codewave4)

---

<p align="center">
  ساخته‌شده با ❤️ برای کاربران فارسی‌زبان
  <br/>
  <sub>اگر Translify به کارتان آمد، ⭐ دادن به ریپو انرژی زیادی به ما می‌دهد.</sub>
</p>

