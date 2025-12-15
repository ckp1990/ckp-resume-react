# Google Forms Integration Guide for Subscription

This guide explains how to connect your Subscription form to a Google Form so you can collect emails.

## 📋 Overview

The website uses a clever trick to send data directly from your custom form to Google Forms. This requires:
1.  Creating a Google Form
2.  Getting the "Action URL"
3.  Getting the "Entry IDs" for your Name and Email fields
4.  Adding these to `src/data/subscription.json`

## 🔧 Step-by-Step Setup

### Step 1: Create the Google Form

1.  Go to [Google Forms](https://forms.google.com/).
2.  Create a **Blank Form**.
3.  Name it "Website Newsletter" (or similar).
4.  **Add a Question for Name:**
    *   Type: Short Answer
    *   Question Title: `Name`
    *   Required: Yes
5.  **Add a Question for Email:**
    *   Type: Short Answer
    *   Question Title: `Email`
    *   Required: Yes
6.  **Go to Responses Tab:**
    *   Click the **three dots** (⋮) next to the Google Sheets icon.
    *   Select "Get email notifications for new responses" (Optional, but recommended).
    *   Click "Select destination for responses" -> "Create a new spreadsheet" (This is where your emails will be saved).

### Step 2: Get the Entry IDs (The Tricky Part)

1.  In your Google Form editing view, click the **three dots** (⋮) at the top right (next to your profile picture).
2.  Select **"Get pre-filled link"**.
3.  A new tab will open with your form.
4.  Type `testName` in the Name field.
5.  Type `testEmail` in the Email field.
6.  Click **"Get Link"** at the bottom.
7.  Click **"Copy Link"**.
8.  Paste this link into Notepad or a text editor. It will look something like this:

    ```
    https://docs.google.com/forms/d/e/1FAIpQLSdc.../viewform?usp=pp_url&entry.123456=testName&entry.789012=testEmail
    ```

9.  **Extract the IDs:**
    *   Look for `entry.XXXXXX=testName`. The number `XXXXXX` is your **Name Entry ID**. (e.g., `123456`)
    *   Look for `entry.YYYYYY=testEmail`. The number `YYYYYY` is your **Email Entry ID**. (e.g., `789012`)

### Step 3: Get the Action URL

1.  Take the URL from Step 2 (the pre-filled link).
2.  Remove everything after `/viewform`.
3.  Change `/viewform` to `/formResponse`.
    *   Original: `https://docs.google.com/forms/d/e/LONG_ID_HERE/viewform?...`
    *   **Action URL**: `https://docs.google.com/forms/d/e/LONG_ID_HERE/formResponse`

### Step 4: Configure Your Website

1.  Open the file `src/data/subscription.json` in your project.
2.  Paste your values inside the quotes:

    ```json
    {
      "googleFormActionUrl": "https://docs.google.com/forms/d/e/YOUR_LONG_ID_HERE/formResponse",
      "entryName": "entry.123456",
      "entryEmail": "entry.789012",
      "heading": "Subscribe to my Newsletter",
      "description": "...",
      "successMessage": "..."
    }
    ```

    *Note: Make sure to include the `entry.` prefix in the JSON fields as shown above.*

### Step 5: Test It

1.  Run your website locally (`npm run dev`).
2.  Go to the Subscribe page.
3.  Enter a name and email.
4.  Click Subscribe.
5.  Check your **Google Sheet** (connected in Step 1) to see if the new row appeared!

## ⚠️ Troubleshooting

*   **CORS Warning in Console:** You might see a warning in the browser console about CORS or "opaque response". **This is normal.** Google Forms doesn't officially support external POST requests, but we use `mode: 'no-cors'` to make it work. As long as the data appears in your Google Sheet, it is working.
*   **Nothing in Google Sheet:** Double-check your Entry IDs. They must be exact. Also ensure the Action URL ends in `/formResponse`, not `/viewform`.
