# Email System Setup Guide

This guide explains how to set up the **automated email system** for your website. It covers three features:
1.  **Automated "Thank You" Email:** Sent immediately when someone subscribes.
2.  **Newsletter Blast (Manual):** A tool to send new blog post notifications manually from Google Sheets.
3.  **Newsletter Blast (Automated):** Automatically sends emails when you publish a new blog post via GitHub/CMS.

## 📋 Overview

The system uses **Google Apps Script** inside your Google Sheet.

*   **Part 1**: Uses a **Trigger** to run automatically when a form is submitted.
*   **Part 2**: Adds a **Custom Menu** to your Google Sheet for manual blasts.
*   **Part 3**: Exposes a **Web App (Webhook)** that GitHub can call when you publish a new post.

## 🔧 Step-by-Step Instructions

### Step 1: Open Your Google Sheet

1.  Go to your Google Form.
2.  Click the **Responses** tab.
3.  Click the **green Spreadsheet icon** ("View in Sheets").

### Step 2: Open Apps Script

1.  In the Google Sheet, go to the top menu: **Extensions** > **Apps Script**.

### Step 3: The Complete Code

1.  Delete any existing code.
2.  **Copy and paste** the following code block. It contains all three parts.

```javascript
/*
 * PART 1: AUTOMATED SUBSCRIPTION HANDLER
 * Runs automatically when a user submits the Google Form.
 */

function sendSubscriptionEmail(e) {
  // 1. Setup variables
  var sheet = e.range.getSheet();
  var newRowIndex = e.range.getRow();

  // 2. Identify Columns
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var emailColIndex = headers.indexOf("Email");
  var nameColIndex = headers.indexOf("Name");

  if (emailColIndex === -1) {
    Logger.log("Error: 'Email' column not found.");
    return;
  }

  // 3. Get new subscriber data
  var newEmail = sheet.getRange(newRowIndex, emailColIndex + 1).getValue();
  var newName = nameColIndex > -1 ? sheet.getRange(newRowIndex, nameColIndex + 1).getValue() : "Subscriber";

  if (!newEmail || newEmail.toString().trim() === "") return;
  newEmail = newEmail.toString().trim();

  // 4. CHECK FOR DUPLICATES
  var duplicateFound = false;
  if (newRowIndex > 2) {
    var numPreviousRows = newRowIndex - 2;
    var previousEmails = sheet.getRange(2, emailColIndex + 1, numPreviousRows, 1).getValues();

    for (var i = 0; i < previousEmails.length; i++) {
      if (previousEmails[i][0] && previousEmails[i][0].toString().trim().toLowerCase() === newEmail.toLowerCase()) {
        duplicateFound = true;
        break;
      }
    }
  }

  // 5. Handle Duplicate
  if (duplicateFound) {
    Logger.log("Duplicate: " + newEmail + ". Deleting row.");
    try {
      sheet.deleteRow(newRowIndex);
    } catch (err) {
      Logger.log("Error deleting row: " + err);
    }
    return; // STOP
  }

  // 6. Send "Thank You" Email
  var subject = "Thank you for subscribing!";
  var messageBody = "Hi " + newName + ",\n\n" +
                    "Thank you for subscribing to my blog!\n\n" +
                    "You will get updates directly to your inbox whenever a new blog post is published.\n\n" +
                    "Best regards,\n" +
                    "Chandan Kumar Pandey";

  try {
    MailApp.sendEmail({to: newEmail, subject: subject, body: messageBody});
    Logger.log("Welcome email sent to " + newEmail);
  } catch (error) {
    Logger.log("Error sending email: " + error.toString());
  }
}

/*
 * PART 2: NEWSLETTER BLAST TOOL (MANUAL)
 * Adds a menu to the sheet to send new blog notifications manually.
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Newsletter')
      .addItem('Send New Post Notification', 'showNewsletterDialog')
      .addToUi();
}

function showNewsletterDialog() {
  var ui = SpreadsheetApp.getUi();

  // 1. Get Blog Details
  var titleResponse = ui.prompt('New Blog Post', 'Enter the Blog Title:', ui.ButtonSet.OK_CANCEL);
  if (titleResponse.getSelectedButton() != ui.Button.OK) return;
  var title = titleResponse.getResponseText();

  var summaryResponse = ui.prompt('New Blog Post', 'Enter a short summary:', ui.ButtonSet.OK_CANCEL);
  if (summaryResponse.getSelectedButton() != ui.Button.OK) return;
  var summary = summaryResponse.getResponseText();

  var linkResponse = ui.prompt('New Blog Post', 'Enter the full link (URL):', ui.ButtonSet.OK_CANCEL);
  if (linkResponse.getSelectedButton() != ui.Button.OK) return;
  var link = linkResponse.getResponseText();

  // 2. Confirm
  var confirm = ui.alert('Confirm Send',
      'Title: ' + title + '\n\n' +
      'Summary: ' + summary + '\n\n' +
      'Link: ' + link + '\n\n' +
      'Are you sure you want to send this to ALL unique subscribers?',
      ui.ButtonSet.YES_NO);

  if (confirm == ui.Button.YES) {
    var result = sendBulkEmails(title, summary, link);
    ui.alert(result);
  }
}

/*
 * PART 3: AUTOMATED NOTIFICATION HANDLER (WEBHOOK)
 * Listens for POST requests from GitHub Actions.
 */

function doPost(e) {
  try {
    var jsonString = e.postData.getDataAsString();
    var data = JSON.parse(jsonString);

    if (data.action === "new_post") {
      var result = sendBulkEmails(data.title, data.summary, data.link);
      return ContentService.createTextOutput(result);
    } else {
      return ContentService.createTextOutput("Invalid Action");
    }
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.toString());
  }
}

/*
 * SHARED: SEND EMAIL LOGIC
 */
function sendBulkEmails(title, summary, link) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var emailColIndex = headers.indexOf("Email");
  var nameColIndex = headers.indexOf("Name");

  if (emailColIndex === -1) {
    return "Error: Could not find 'Email' column.";
  }

  // Get all data
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return "No subscribers found.";
  }

  var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  var sentCount = 0;
  var processedEmails = {}; // To prevent duplicates in the blast

  // Loop through all rows
  for (var i = 0; i < data.length; i++) {
    var email = data[i][emailColIndex];
    var name = nameColIndex > -1 ? data[i][nameColIndex] : "Subscriber";

    if (email && email.toString().trim() !== "") {
      email = email.toString().trim().toLowerCase();

      // Only send if we haven't sent to this email yet
      if (!processedEmails[email]) {
        try {
          var subject = "New Blog Post: " + title;
          var body = "Hi " + name + ",\n\n" +
                     "I just published a new blog post: \"" + title + "\"\n\n" +
                     summary + "\n\n" +
                     "Read it here: " + link + "\n\n" +
                     "Best regards,\n" +
                     "Chandan Kumar Pandey";

          MailApp.sendEmail({to: email, subject: subject, body: body});
          processedEmails[email] = true;
          sentCount++;
        } catch (e) {
          Logger.log("Failed to send to " + email + ": " + e.toString());
        }
      }
    }
  }

  var resultMsg = "Success! Sent " + sentCount + " emails.";
  Logger.log(resultMsg);
  return resultMsg;
}
```

3.  **Save** the script (`Ctrl + S`).

### Step 4: Set Up the Subscription Trigger (For Form Submissions)

1.  Click **Triggers** (alarm clock icon).
2.  If you already have a trigger, **Edit** it. If not, **Add Trigger**.
3.  Function: `sendSubscriptionEmail`.
4.  Event source: `From spreadsheet`.
5.  Event type: `On form submit`.
6.  Click **Save**.

### Step 5: Deploy as Web App (For Automated Blog Notifications)

To allow GitHub to trigger the emails automatically:

1.  In Apps Script, click **Deploy** (blue button top right) > **New deployment**.
2.  Click the **Select type** gear icon > **Web app**.
3.  **Description**: `Blog Notification Webhook`
4.  **Execute as**: `Me` (your email)
5.  **Who has access**: `Anyone` (This is required so GitHub can call it without complex OAuth. The script only responds to valid JSON payloads).
6.  Click **Deploy**.
7.  **Authorize access** if asked.
8.  **COPY** the **Web app URL**. It will look like `https://script.google.com/macros/s/.../exec`.

### Step 6: Connect to GitHub

1.  Go to your GitHub Repository: `ckp1990/ckp-resume-react`
2.  Click **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  **Name**: `GAS_WEBHOOK_URL`
5.  **Value**: Paste the Web app URL you copied in Step 5.
6.  Click **Add secret**.

**Done!** Now, whenever you publish a new blog post (by pushing to `main` via Decap CMS or manually), GitHub Actions will detect the new post and trigger your Google Sheet to send emails.

## ⚠️ Important Notes

*   **Daily Quota:** Gmail accounts (free) can send about **100 emails per day**. Google Workspace accounts can send up to **1,500**.
*   **Security:** The Web App URL is a secret. Do not share it publicly.
