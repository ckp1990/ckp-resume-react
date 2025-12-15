# Email System Setup Guide

This guide explains how to set up the **automated email system** for your website. It covers two features:
1.  **Automated "Thank You" Email:** Sent immediately when someone subscribes.
2.  **Newsletter Blast:** A tool to send new blog post notifications to all subscribers.

## 📋 Overview

Both features use **Google Apps Script** inside your Google Sheet.

*   **Part 1**: Uses a **Trigger** to run automatically when a form is submitted.
*   **Part 2**: Adds a **Custom Menu** to your Google Sheet so you can manually trigger a blast when you publish a new blog post.

## 🔧 Step-by-Step Instructions

### Step 1: Open Your Google Sheet

1.  Go to your Google Form.
2.  Click the **Responses** tab.
3.  Click the **green Spreadsheet icon** ("View in Sheets").

### Step 2: Open Apps Script

1.  In the Google Sheet, go to the top menu: **Extensions** > **Apps Script**.

### Step 3: The Complete Code

1.  Delete any existing code.
2.  **Copy and paste** the following code block. It contains **both** the subscription handler and the newsletter tool.

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
 * PART 2: NEWSLETTER BLAST TOOL
 * Adds a menu to the sheet to send new blog notifications.
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
    sendBulkEmails(title, summary, link);
  }
}

function sendBulkEmails(title, summary, link) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var emailColIndex = headers.indexOf("Email");
  var nameColIndex = headers.indexOf("Name");

  if (emailColIndex === -1) {
    SpreadsheetApp.getUi().alert("Error: Could not find 'Email' column.");
    return;
  }

  // Get all data
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("No subscribers found.");
    return;
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

  SpreadsheetApp.getUi().alert("Success! Sent " + sentCount + " emails.");
}
```

3.  **Save** the script (`Ctrl + S`).

### Step 4: Set Up the Subscription Trigger (If not done already)

1.  Click **Triggers** (alarm clock icon).
2.  If you already have a trigger, **Edit** it. If not, **Add Trigger**.
3.  Function: `sendSubscriptionEmail`.
4.  Event source: `From spreadsheet`.
5.  Event type: `On form submit`.
6.  Click **Save**.

### Step 5: Test the Newsletter Tool

1.  **Refresh** your Google Sheet page (F5).
2.  Wait a few seconds. You should see a new menu item called **Newsletter** appear next to "Help".
3.  Click **Newsletter** > **Send New Post Notification**.
4.  Follow the prompts.
5.  It will send emails to everyone in the list!

## ⚠️ Important Notes

*   **Daily Quota:** Gmail accounts (free) can send about **100 emails per day**. Google Workspace accounts can send up to **1,500**. If your list grows larger than this, you should switch to a service like Mailchimp or ConvertKit.
*   **Permissions:** The first time you use the menu, it will ask for permission.
