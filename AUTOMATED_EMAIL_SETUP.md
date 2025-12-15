# Automated "Thank You" Email Setup Guide

Since your website uses **Google Forms** to collect subscriptions, you can use **Google Apps Script** (which is free and built into Google Sheets) to automatically send a "Thank You" email whenever someone subscribes.

**Feature**: This script automatically **detects and removes duplicate subscriptions**. If a user subscribes with an email address that is already in the list, the script will:
1.  **Delete the new row** from the spreadsheet (keeping your list clean).
2.  **Skip sending the email** (preventing spam).
**New Feature**: The script below also checks for **duplicate emails**. If someone subscribes with an email address that is already in the list, it will log the duplicate and **skip sending the email** to prevent spamming them.

## 📋 Overview

This setup involves:
1.  Opening the Google Sheet connected to your Form.
2.  Adding a small script.
3.  Setting up a "Trigger" to run the script automatically on every new form submission.

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
  // 1. Get the data from the form submission
  var name = e.namedValues['Name'] ? e.namedValues['Name'][0] : "Subscriber";
  var email = e.namedValues['Email'] ? e.namedValues['Email'][0] : "";

  // 2. Validation: If no email, stop.
  if (!email) {
    Logger.log("No email address found.");
    return;
  }

  // 3. CHECK FOR DUPLICATES
  // Get the active sheet
  var sheet = e.range.getSheet();
  // Get the column index of the "Email" header (assumes row 1 is headers)
  // Or simpler: Get all values in Column C (or wherever Email is)

  // We will search the entire sheet data for the email
  var data = sheet.getDataRange().getValues();
  var emailColumnIndex = -1;

  // Find the 'Email' column index in the first row
  for (var i = 0; i < data[0].length; i++) {
    if (data[0][i] === "Email") {
      emailColumnIndex = i;
      break;
    }
  }

  if (emailColumnIndex === -1) {
    Logger.log("Could not find 'Email' column.");
    return;
  }

  // Count how many times this email appears
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][emailColumnIndex] == email) {
      count++;
    }
  }

  // If count > 1, it means the email was already there (count includes the new one just added)
  if (count > 1) {
    Logger.log("Duplicate subscription detected for: " + email + ". Email skipped.");
    return;
  }

  // 4. Customize your email content here
  var subject = "Thank you for subscribing!";

  var messageBody = "Hi " + name + ",\n\n" +
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
  // 5. Send the email
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: messageBody
    });
    Logger.log("Email sent to " + email);
  } catch (error) {
    Logger.log("Error sending email: " + error.toString());
  }
}
```

3.  Click the **Save** icon (floppy disk) or press `Ctrl + S`.
4.  Name the project "Subscription Emailer".
4.  Name the project "Subscription Emailer" (or anything you like).

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
2.  **Authorization Required:** Google will ask for permission to send emails as you.
    *   Click **Review permissions**.
    *   Select your Google Account.
    *   You might see a screen saying "Google hasn't verified this app" (because you just wrote it). Click **Advanced** > **Go to Subscription Emailer (unsafe)**.
    *   Click **Allow**.
3.  **Note:** This first run will likely fail with `TypeError: Cannot read properties of undefined` because there is no form submission data (`e`) when running manually. **This is expected.** The goal was just to grant permissions.

### Step 5: Set Up the Trigger

Now we tell Google to run this script *automatically* when a form is submitted.

1.  In the Apps Script sidebar (left side), click the **Triggers** icon (looks like an alarm clock).
2.  Click the blue **+ Add Trigger** button at the bottom right.
3.  Configure the settings as follows:
    *   **Choose which function to run**: `sendSubscriptionEmail`
    *   **Choose which deployment should run**: `Head`
    *   **Select event source**: `From spreadsheet`
    *   **Select event type**: `On form submit`
4.  Click **Save**.

## ✅ Done!

**How to test:**
1.  Go to your website's Subscribe page.
2.  Enter a Name and a *real* Email address (one you can check).
3.  Click Subscribe.
4.  Check that email's inbox. You should receive the "Thank you" message.
5.  **Test Duplicate:** Go back and subscribe with the **same email** again. You will see the "Success" message on the website, but you should **NOT** receive a second email.

## 📝 Customization

To change the email text:
1.  Go back to **Extensions** > **Apps Script** in your Sheet.
2.  Edit the `subject` and `messageBody` variables in the code.
3.  Save the script. Future emails will use the new text.
