# Quick Start - Email Notifications Setup

## ⚡ 5-Minute Setup

### 1️⃣ Open Apps Script
Go to: https://docs.google.com/spreadsheets/d/1NMnUpFh9_M8trdXvmOFpTfQqxloCNPM9Q_T3mM_tZCI/edit

Click: **Extensions** → **Apps Script**

---

### 2️⃣ Replace Code
1. Select all existing code (Cmd+A / Ctrl+A)
2. Delete it
3. Copy code from: `google-apps-script/ContactFormHandler.gs`
4. Paste into Apps Script editor
5. Click **Save** 💾

---

### 3️⃣ Test (First Time Only)
1. Select `testScript` from function dropdown
2. Click **▶️ Run**
3. Click **Review Permissions** → **Allow**
4. Check your email for test notification ✅

---

### 4️⃣ Deploy
1. Click **Deploy** → **New deployment**
2. Click ⚙️ → **Web app**
3. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the URL (if different from current)

---

### 5️⃣ Update Website (Only if URL changed)
If the new URL is different:
```bash
# Edit constants.ts line 11 with new URL
npm run build
git add . && git commit -m "Update Apps Script URL" && git push
```

---

### 6️⃣ Test Live
1. Go to https://www.amitkumarshaw.com
2. Click "Get In Touch"
3. Submit test form
4. Check email ✅

---

## ✨ What You Get

### Email to You:
- 📧 Instant notification
- 👤 Name, Email, Phone, Purpose
- 🔗 Clickable links (email, phone)
- 📅 Timestamp

### Email to Submitter:
- 🙏 Thank you message
- ✅ Confirmation received
- 📞 Your contact info
- 💼 Professional signature

---

## 🎛️ Customize (Optional)

Edit the `CONFIG` section in the script:

```javascript
const CONFIG = {
  notificationEmail: "amitkumarshaw22@gmail.com",  // Your email
  emailSubject: "New Contact Form Submission",      // Subject line
  sendAutoReply: true,                              // true/false
  sheetName: "Sheet1"                               // Sheet name
};
```

---

## 🔍 Monitor

View all submissions and logs:
**Apps Script** → **View** → **Executions**

---

## 📞 Current Setup

- **Google Sheet:** https://docs.google.com/spreadsheets/d/1NMnUpFh9_M8trdXvmOFpTfQqxloCNPM9Q_T3mM_tZCI/edit
- **Current URL:** `https://script.google.com/macros/s/AKfycbwatTic4bV3bd2LA94z40KtD1Q1fX7HXQdDEjqXy9nN-6QYoZJJycfNHGO98tA-cv14/exec`
- **Notification Email:** amitkumarshaw22@gmail.com

---

**That's it! You're done!** 🎉

