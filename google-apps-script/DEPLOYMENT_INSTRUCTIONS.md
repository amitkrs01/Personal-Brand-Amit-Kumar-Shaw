# Email Notification Setup Instructions

## 📧 Add Email Notifications to Your Contact Form

Follow these steps to update your Google Apps Script to send email notifications when someone submits your contact form.

---

## 🎯 What This Will Do

When someone fills out your contact form, you will:
1. ✅ Get the data saved to Google Sheets (as it does now)
2. ✅ **NEW:** Receive an email notification with all the details
3. ✅ **BONUS:** The submitter gets an auto-reply thanking them

---

## 📋 Step-by-Step Instructions

### Step 1: Open Your Google Apps Script

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1NMnUpFh9_M8trdXvmOFpTfQqxloCNPM9Q_T3mM_tZCI/edit
2. Click **Extensions** → **Apps Script**
3. This will open the Apps Script editor

---

### Step 2: Replace the Existing Code

1. In the Apps Script editor, you should see your existing code
2. **Select ALL the existing code** (Cmd+A or Ctrl+A)
3. **Delete it**
4. **Copy the new code** from the file: `google-apps-script/ContactFormHandler.gs`
5. **Paste it** into the Apps Script editor

---

### Step 3: Configure Your Email Settings (Optional)

At the top of the script, you'll see a `CONFIG` section:

```javascript
const CONFIG = {
  // Your email address for notifications
  notificationEmail: "amitkumarshaw22@gmail.com",
  
  // Email subject line
  emailSubject: "New Contact Form Submission - amitkumarshaw.com",
  
  // Auto-reply settings
  sendAutoReply: true,
  autoReplySubject: "Thank you for contacting Amit Kumar Shaw",
  
  // Sheet name
  sheetName: "Sheet1"
};
```

**You can customize:**
- `notificationEmail` - Change if you want notifications sent to a different email
- `emailSubject` - Customize the subject line
- `sendAutoReply` - Set to `false` if you don't want to send auto-replies
- `sheetName` - Change if your sheet has a different name

---

### Step 4: Save the Script

1. Click the **💾 Save** icon (or press Cmd+S / Ctrl+S)
2. Give your project a name (e.g., "Contact Form Handler")

---

### Step 5: Test the Script (Optional but Recommended)

1. In the Apps Script editor, find the function dropdown (top toolbar)
2. Select **`testScript`** from the dropdown
3. Click the **▶️ Run** button
4. **First time only:** You'll see an authorization prompt:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
5. Check your email - you should receive a test notification!

---

### Step 6: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description:** "Contact Form with Email Notifications"
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...`)

---

### Step 7: Update Your Website (If URL Changed)

**Only do this if the Web App URL is different from your current one.**

Current URL in your code:
```
https://script.google.com/macros/s/AKfycbwatTic4bV3bd2LA94z40KtD1Q1fX7HXQdDEjqXy9nN-6QYoZJJycfNHGO98tA-cv14/exec
```

If the new URL is different:
1. Open `constants.ts` in your project
2. Find line 11: `googleScriptWebAppUrl`
3. Replace with the new URL
4. Run `npm run build`
5. Run `git add . && git commit -m "Update Google Apps Script URL" && git push`

---

### Step 8: Test the Live Form

1. Go to https://www.amitkumarshaw.com
2. Click **"Get In Touch"**
3. Fill out the form with test data
4. Submit
5. Check:
   - ✅ Google Sheet has new entry
   - ✅ You received an email notification
   - ✅ The test email address received an auto-reply

---

## 📧 What the Email Notification Looks Like

You'll receive a beautifully formatted HTML email with:
- 📅 Submission timestamp
- 👤 Name
- 📧 Email (clickable mailto link)
- 📱 Phone (clickable tel link)
- 💬 Purpose/Message

---

## 🎁 Bonus: Auto-Reply Feature

The submitter will automatically receive a thank-you email with:
- Personalized greeting with their name
- Confirmation that you received their message
- Your contact information (LinkedIn, Email, Phone)
- Professional signature

**To disable auto-replies:** Set `sendAutoReply: false` in the CONFIG section.

---

## 🔧 Troubleshooting

### Issue: "Authorization required"
**Solution:** Run the `testScript` function first to authorize the script.

### Issue: "Not receiving emails"
**Solution:** 
1. Check your spam/junk folder
2. Verify the email address in CONFIG is correct
3. Check Apps Script execution logs: **View** → **Executions**

### Issue: "Script timeout"
**Solution:** The script should run quickly. If it times out, check the execution logs for errors.

### Issue: "Form submission fails"
**Solution:**
1. Check that the deployment is set to "Anyone" can access
2. Verify the Web App URL is correct in `constants.ts`
3. Check Apps Script execution logs for errors

---

## 📊 Monitoring

To see all script executions and any errors:
1. In Apps Script editor, click **View** → **Executions**
2. You'll see a log of all form submissions
3. Click any execution to see details and logs

---

## 🎯 Summary

After completing these steps, your contact form will:
1. ✅ Save data to Google Sheets
2. ✅ Send you an email notification
3. ✅ Send an auto-reply to the submitter
4. ✅ Work seamlessly with your existing website

---

## 📞 Need Help?

If you encounter any issues:
1. Check the Apps Script execution logs
2. Verify all permissions are granted
3. Test with the `testScript` function
4. Let me know and I can help troubleshoot!

---

**Estimated Time:** 5-10 minutes  
**Difficulty:** Easy  
**Result:** Professional email notifications for every contact form submission! 🎉

