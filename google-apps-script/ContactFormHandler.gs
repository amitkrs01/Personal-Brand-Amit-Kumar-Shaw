/**
 * Contact Form Handler with Email Notifications
 * This script handles form submissions from amitkumarshaw.com
 * Features:
 * 1. Saves form data to Google Sheets
 * 2. Sends email notification to you
 * 3. Sends auto-reply to the submitter
 */

// Configuration
const CONFIG = {
  // Your email address for notifications
  notificationEmail: "amitkumarshaw22@gmail.com",
  
  // Email subject line
  emailSubject: "New Contact Form Submission - amitkumarshaw.com",
  
  // Auto-reply settings
  sendAutoReply: true,
  autoReplySubject: "Thank you for contacting Amit Kumar Shaw",
  
  // Sheet name (leave as "Sheet1" or change to your sheet name)
  sheetName: "Sheet1"
};

/**
 * Main function - handles POST requests from the contact form
 */
function doPost(e) {
  try {
    // Get form data
    const formData = e.parameter;
    const name = formData.Name || "";
    const email = formData.Email || "";
    const phone = formData.Phone || "";
    const purpose = formData.Purpose || "";
    const timestamp = new Date();
    
    // Validate required fields
    if (!name || !email || !purpose) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "Missing required fields" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Save to Google Sheets
    saveToSheet(name, email, phone, purpose, timestamp);
    
    // Send email notification to you
    sendNotificationEmail(name, email, phone, purpose, timestamp);
    
    // Send auto-reply to submitter (optional)
    if (CONFIG.sendAutoReply) {
      sendAutoReply(name, email);
    }
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Form submitted successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save form data to Google Sheets
 */
function saveToSheet(name, email, phone, purpose, timestamp) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  
  // If sheet doesn't exist, create it
  if (!sheet) {
    const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(CONFIG.sheetName);
    // Add headers
    newSheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Purpose"]);
  }
  
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  
  // Append new row with form data
  activeSheet.appendRow([
    timestamp,
    name,
    email,
    phone,
    purpose
  ]);
  
  Logger.log("Data saved to sheet successfully");
}

/**
 * Send email notification to you
 */
function sendNotificationEmail(name, email, phone, purpose, timestamp) {
  const subject = CONFIG.emailSubject;
  
  // Create HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #000; }
        .value { color: #555; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">📅 Submitted:</div>
            <div class="value">${Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "MMMM dd, yyyy 'at' hh:mm:ss a z")}</div>
          </div>
          
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">📱 Phone:</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>
          
          <div class="field">
            <div class="label">💬 Purpose:</div>
            <div class="value">${purpose}</div>
          </div>
        </div>
        <div class="footer">
          <p>This notification was sent from your contact form at <a href="https://amitkumarshaw.com">amitkumarshaw.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Plain text version (fallback)
  const plainBody = `
New Contact Form Submission

Submitted: ${Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "MMMM dd, yyyy 'at' hh:mm:ss a z")}

Name: ${name}
Email: ${email}
Phone: ${phone}
Purpose: ${purpose}

---
This notification was sent from your contact form at https://amitkumarshaw.com
  `;
  
  // Send email
  MailApp.sendEmail({
    to: CONFIG.notificationEmail,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
  
  Logger.log("Notification email sent to: " + CONFIG.notificationEmail);
}

/**
 * Send auto-reply to the person who submitted the form
 */
function sendAutoReply(name, email) {
  const subject = CONFIG.autoReplySubject;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Reaching Out!</h2>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my website. I've received your message and will get back to you as soon as possible.</p>
          
          <p>In the meantime, feel free to connect with me on:</p>
          <ul>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/amit-kumar-shaw">linkedin.com/in/amit-kumar-shaw</a></li>
            <li><strong>Email:</strong> <a href="mailto:amitkumarshaw22@gmail.com">amitkumarshaw22@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+919883132444">+91-9883132444</a></li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Amit Kumar Shaw</strong><br>
          Product & Growth Leader</p>
        </div>
        <div class="footer">
          <p>This is an automated response from <a href="https://amitkumarshaw.com">amitkumarshaw.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
Hi ${name},

Thank you for contacting me through my website. I've received your message and will get back to you as soon as possible.

In the meantime, feel free to connect with me on:
- LinkedIn: https://www.linkedin.com/in/amit-kumar-shaw
- Email: amitkumarshaw22@gmail.com
- Phone: +91-9883132444

Best regards,
Amit Kumar Shaw
Product & Growth Leader

---
This is an automated response from https://amitkumarshaw.com
  `;
  
  // Send auto-reply
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
  
  Logger.log("Auto-reply sent to: " + email);
}

/**
 * Test function - use this to test the script
 */
function testScript() {
  // Simulate form submission
  const testEvent = {
    parameter: {
      Name: "Test User",
      Email: "amitkumarshaw22@gmail.com",  // Using your email for testing
      Phone: "+91 9999999999",
      Purpose: "Testing email notifications from Apps Script"
    }
  };

  Logger.log("Starting test...");
  const result = doPost(testEvent);
  Logger.log("Test completed!");
  Logger.log("Result: " + result.getContent());
  Logger.log("Check your email at: amitkumarshaw22@gmail.com");
}

