# Automated "Thank You" Email Setup Guide

Since your website uses **Google Forms** to collect subscriptions, you can use **Google Apps Script** (which is free and built into Google Sheets) to automatically send a "Thank You" email whenever someone subscribes.

**Feature**: This script automatically **detects and removes duplicate subscriptions**. If a user subscribes with an email address that is already in the list, the script will:
1.  **Delete the new row** from the spreadsheet (keeping your list clean).
2.  **Skip sending the email** (preventing spam).

## 🔧 Step-by-Step Instructions

### Step 1: Open Your Google Sheet

1.  Go to your Google Form.
2.  Click the **Responses** tab.
3.  Click the **green Spreadsheet icon** ("View in Sheets").
4.  This opens the Google Sheet where your subscribers are listed.

### Step 2: Open Apps Script

1.  In the Google Sheet, go to the top menu: **Extensions** > **Apps Script**.
2.  A new tab will open with a code editor.

### Step 3: Add the Email Script

1.  Delete any code currently in the editor (usually `function myFunction() {...}`).
2.  **Copy and paste** the following code:

```javascript
function sendSubscriptionEmail(e) {
  // 1. Setup variables
  var sheet = e.range.getSheet();
  var newRowIndex = e.range.getRow(); // The row number of the new submission

  // 2. Identify Columns (Dynamically find "Name" and "Email")
  // We read the first row (headers) to find where the data is
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var emailColIndex = headers.indexOf("Email"); // 0-based index
  var nameColIndex = headers.indexOf("Name");   // 0-based index

  if (emailColIndex === -1) {
    Logger.log("Error: 'Email' column not found in the spreadsheet.");
    return;
  }

  // 3. Get the new subscriber's data
  // Arrays in Apps Script are 0-based, but getRange is 1-based.
  // We add 1 to the column index.
  var newEmail = sheet.getRange(newRowIndex, emailColIndex + 1).getValue();
  var newName = nameColIndex > -1 ? sheet.getRange(newRowIndex, nameColIndex + 1).getValue() : "Subscriber";

  // Basic validation
  if (!newEmail || newEmail.toString().trim() === "") {
    Logger.log("No email address found in row " + newRowIndex);
    return;
  }
  newEmail = newEmail.toString().trim();

  // 4. CHECK FOR DUPLICATES
  // We check all rows BEFORE the new one.
  var duplicateFound = false;

  if (newRowIndex > 2) {
    // If there are previous data rows (Row 1 is header, Row 2 is data...)
    // Get all emails from Row 2 up to the row before the new one
    var numPreviousRows = newRowIndex - 2;
    var previousEmails = sheet.getRange(2, emailColIndex + 1, numPreviousRows, 1).getValues();

    // Loop through previous emails to find a match
    for (var i = 0; i < previousEmails.length; i++) {
      var existingEmail = previousEmails[i][0];
      if (existingEmail && existingEmail.toString().trim().toLowerCase() === newEmail.toLowerCase()) {
        duplicateFound = true;
        break;
      }
    }
  }

  // 5. Handle Duplicate
  if (duplicateFound) {
    Logger.log("Duplicate email detected: " + newEmail + ". Deleting row " + newRowIndex);
    try {
      // Delete the newly added row
      sheet.deleteRow(newRowIndex);
    } catch (err) {
      Logger.log("Error deleting row: " + err);
    }
    // STOP HERE: Do not send the email
    return;
  }

  // 6. Send "Thank You" Email (Only if not a duplicate)
  var subject = "Thank you for subscribing!";

  var messageBody = "Hi " + newName + ",\n\n" +
                    "Thank you for subscribing to my blog!\n\n" +
                    "You will get updates directly to your inbox whenever a new blog post is published.\n\n" +
                    "Best regards,\n" +
                    "Chandan Kumar Pandey";

  try {
    MailApp.sendEmail({
      to: newEmail,
      subject: subject,
      body: messageBody
    });
    Logger.log("Email sent to " + newEmail);
  } catch (error) {
    Logger.log("Error sending email: " + error.toString());
  }
}
```

3.  Click the **Save** icon (floppy disk) or press `Ctrl + S`.
4.  Name the project "Subscription Emailer".

### Step 4: Test the Script (Authorization)

1.  Click the **Run** button (Play icon) at the top.
2.  **Authorization Required:** Google will ask for permission to send emails and manage your spreadsheets.
    *   Click **Review permissions**.
    *   Select your Google Account.
    *   Click **Advanced** > **Go to Subscription Emailer (unsafe)**.
    *   Click **Allow**.
3.  **Note:** This first run will error because there's no form data. This is normal. You just needed to grant permissions.

### Step 5: Set Up the Trigger

1.  Click the **Triggers** icon (alarm clock) on the left.
2.  Click **+ Add Trigger** (bottom right).
3.  Settings:
    *   Function: `sendSubscriptionEmail`
    *   Event source: `From spreadsheet`
    *   Event type: `On form submit`
4.  Click **Save**.

## ✅ Verification

To verify it works:
1.  Go to your website and subscribe with `test@example.com`.
    *   Check Sheet: Row appears.
    *   Check Inbox: Email received.
2.  Go to your website and subscribe with `test@example.com` **again**.
    *   Check Sheet: The new row might appear for a split second, then **disappear** (deleted by script).
    *   Check Inbox: **No** second email received.
