# Google Drive API Setup Guide

This guide will walk you through setting up Google Drive API integration to automatically pull all images and videos from your Google Drive folder into your Media Gallery.

## 📋 Overview

With the Google Drive API integration, your website will:
- ✅ Automatically fetch all images and videos from your specified Google Drive folder
- ✅ No need to manually add each file to the CMS
- ✅ True slideshow experience with all your media
- ✅ Automatically updates when you add new files to the folder

## 🔧 Step-by-Step Setup

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account (the same one where your Drive folder is)

2. **Create a New Project**
   - Click on the project dropdown at the top of the page
   - Click "New Project"
   - Enter a project name: `Resume Website` (or any name you prefer)
   - Leave the organization field blank (unless you have one)
   - Click "Create"
   - Wait for the project to be created (takes a few seconds)

3. **Select Your Project**
   - Click on the project dropdown again
   - Select your newly created project

### Step 2: Enable Google Drive API

1. **Open API Library**
   - In the left sidebar, click on "APIs & Services" → "Library"
   - Or visit directly: https://console.cloud.google.com/apis/library

2. **Search for Google Drive API**
   - In the search bar, type "Google Drive API"
   - Click on "Google Drive API" from the results

3. **Enable the API**
   - Click the blue "Enable" button
   - Wait for it to be enabled (takes a few seconds)

### Step 3: Create an API Key

1. **Go to Credentials**
   - In the left sidebar, click on "APIs & Services" → "Credentials"
   - Or visit: https://console.cloud.google.com/apis/credentials

2. **Create Credentials**
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "API key" from the dropdown

3. **Copy Your API Key**
   - A dialog will appear with your API key
   - **IMPORTANT**: Copy this key immediately and save it somewhere safe
   - Click "Close" (don't worry, you can view it again later)

4. **Restrict Your API Key (IMPORTANT for Security)**
   - Find your newly created API key in the credentials list
   - Click on the key name to edit it

   **Application Restrictions:**
   - Select "HTTP referrers (web sites)"
   - Click "+ ADD AN ITEM"
   - Add these referrers (replace with your actual domains):
     ```
     http://localhost:5173/*
     http://localhost:4173/*
     https://chandankp.com/*
     https://*.github.io/*
     ```
   - This prevents others from using your API key

   **API Restrictions:**
   - Select "Restrict key"
   - Click "Select APIs" dropdown
   - Check only "Google Drive API"
   - This ensures the key can only be used for Drive API

   - Click "Save" at the bottom

### Step 4: Make Your Google Drive Folder Public

Your Google Drive folder **must be publicly accessible** for the API to work.

1. **Open Google Drive**
   - Go to: https://drive.google.com/
   - Navigate to your media folder

2. **Share the Folder**
   - Right-click on the folder (or click the three dots)
   - Click "Share"
   - Click "Change to anyone with the link"
   - Set permission to "Viewer"
   - Click "Done"

3. **Important**: All files inside the folder will automatically be accessible. You don't need to share each file individually.

### Step 5: Configure Your Website

1. **Create Environment File**

   Create a file named `.env` in the root of your project (same directory as `package.json`):

   ```bash
   # In your project root directory
   touch .env
   ```

2. **Add Your Credentials**

   Open `.env` and add the following (replace with your actual values):

   ```env
   # Google Drive API Key (from Step 3)
   VITE_GOOGLE_DRIVE_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # Google Drive Folder ID (from your folder URL)
   VITE_GOOGLE_DRIVE_FOLDER_ID=1CEo9edtNeIX003OtmDoHDxFb3h0yPpUI
   ```

   **To get your Folder ID:**
   - Open your Google Drive folder in a browser
   - Look at the URL: `https://drive.google.com/drive/folders/1CEo9edtNeIX003OtmDoHDxFb3h0yPpUI`
   - The Folder ID is the part after `/folders/`: `1CEo9edtNeIX003OtmDoHDxFb3h0yPpUI`

3. **Save the file** (`.env` should not be committed to Git - it's already in `.gitignore`)

### Step 6: Test Locally

1. **Install Dependencies** (if you haven't already)
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   - Go to: http://localhost:5173
   - Navigate to the Media section
   - You should see "Loading media from Google Drive..."
   - After a moment, all your images and videos should appear!

4. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Go to the Console tab
   - You should see: "Media loaded from Google Drive API"
   - If you see "Using fallback media from media.json", check your configuration

### Step 7: Deploy to GitHub Pages

For GitHub Pages deployment, you need to add your environment variables to GitHub Secrets.

1. **Go to Your GitHub Repository**
   - Navigate to: https://github.com/ckp1990/ckp-resume-react

2. **Open Repository Settings**
   - Click "Settings" tab
   - In the left sidebar, click "Secrets and variables" → "Actions"

3. **Add Repository Secrets**
   - Click "New repository secret"
   - Add each secret:

   **Secret 1:**
   - Name: `VITE_GOOGLE_DRIVE_API_KEY`
   - Value: Your API key (e.g., `AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - Click "Add secret"

   **Secret 2:**
   - Click "New repository secret" again
   - Name: `VITE_GOOGLE_DRIVE_FOLDER_ID`
   - Value: Your folder ID (e.g., `1CEo9edtNeIX003OtmDoHDxFb3h0yPpUI`)
   - Click "Add secret"

4. **Update GitHub Actions Workflow**

   Open `.github/workflows/deploy.yml` and ensure environment variables are injected during build:

   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_GOOGLE_DRIVE_API_KEY: ${{ secrets.VITE_GOOGLE_DRIVE_API_KEY }}
       VITE_GOOGLE_DRIVE_FOLDER_ID: ${{ secrets.VITE_GOOGLE_DRIVE_FOLDER_ID }}
   ```

5. **Commit and Push**
   - GitHub Actions will automatically deploy your changes
   - Your media gallery will now fetch from Google Drive!

## 🔍 How It Works

1. **On Page Load**: The website calls `fetchGoogleDriveMedia()` from `src/utils/googleDrive.js`
2. **API Request**: Makes a request to Google Drive API to list all files in your folder
3. **Filter Media**: Filters for images (JPG, PNG, GIF, WebP, etc.) and videos (MP4, MOV, etc.)
4. **Display**: Automatically populates the media gallery with all found files
5. **Fallback**: If API fails or is not configured, falls back to `src/data/media.json`

## 📁 File Structure

```
src/
├── utils/
│   └── googleDrive.js          # Google Drive API utilities
├── data/
│   └── media.json              # Fallback media data
└── App.jsx                     # Uses Google Drive API
.env                            # Your API credentials (DO NOT COMMIT)
.env.example                    # Template for .env file
```

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Keep your API key in `.env` (never in source code)
- ✅ Restrict your API key to specific domains
- ✅ Restrict your API key to only Google Drive API
- ✅ Use GitHub Secrets for deployment
- ✅ Regularly rotate your API keys

### ❌ DON'T:
- ❌ Commit `.env` to Git (it's in `.gitignore`)
- ❌ Share your API key publicly
- ❌ Use an unrestricted API key
- ❌ Hardcode credentials in your source files

## ⚠️ API Quotas and Limits

**Google Drive API Free Tier:**
- 1,000 requests per 100 seconds per user
- 10,000 requests per day (can be increased)

**What This Means for You:**
- Each page load = 1 API request
- With typical website traffic, you'll stay well within limits
- If you exceed limits, users will see fallback media from `media.json`

**To Monitor Usage:**
- Go to: https://console.cloud.google.com/apis/dashboard
- Select your project
- View "Google Drive API" usage metrics

## 🐛 Troubleshooting

### Issue 1: "Using fallback media from media.json"

**Possible Causes:**
- API key not configured
- API key is incorrect
- Folder ID is incorrect
- API key restrictions are too strict

**Solutions:**
1. Check that `.env` file exists and has correct values
2. Verify API key in Google Cloud Console
3. Double-check folder ID from Drive URL
4. Check browser console (F12) for detailed error messages
5. Try with an unrestricted key first, then add restrictions

### Issue 2: "403 Forbidden" Error

**Cause:** Folder is not publicly shared OR API key restrictions

**Solutions:**
1. Make sure folder is shared as "Anyone with the link can view"
2. Check API key restrictions in Google Cloud Console
3. Add your website domain to HTTP referrers
4. Ensure Google Drive API is enabled for the key

### Issue 3: "API key not valid"

**Cause:** API key restrictions or key was deleted

**Solutions:**
1. Check that API key exists in Google Cloud Console
2. Verify HTTP referrer restrictions allow your domain
3. Ensure API restrictions include Google Drive API
4. Try creating a new API key

### Issue 4: Empty Media Gallery

**Possible Causes:**
- No media files in the folder
- Files are not in supported formats
- Folder has subfolders (API only checks root level)

**Solutions:**
1. Verify your folder contains image or video files
2. Check supported formats:
   - Images: JPG, PNG, GIF, WebP, BMP, SVG
   - Videos: MP4, MOV, AVI, WebM
3. Move files from subfolders to the root folder level
4. Check browser console for API response details

### Issue 5: Works Locally but Not on GitHub Pages

**Cause:** Environment variables not configured in GitHub Secrets

**Solutions:**
1. Add secrets to GitHub repository settings (see Step 7)
2. Update `.github/workflows/deploy.yml` to inject secrets
3. Check that secret names match exactly (case-sensitive)
4. Re-run GitHub Actions workflow

## 🔄 Updating Your Media

**The Beauty of This Setup:**
1. Add new images or videos to your Google Drive folder
2. Make sure they are in a supported format
3. Refresh your website - new media appears automatically!
4. No code changes or CMS updates needed

**Note:** Changes may take a few seconds to appear due to browser caching. Use Ctrl+Shift+R (or Cmd+Shift+R on Mac) to force refresh.

## 🎨 Customization Options

### Change Default Category

In `src/utils/googleDrive.js`, line 76:

```javascript
category: 'Photos' // Change this to any category you want
```

### Modify Sort Order

In `src/utils/googleDrive.js`, line 51:

```javascript
apiUrl.searchParams.append('orderBy', 'createdTime desc')
// Options: 'createdTime', 'modifiedTime', 'name'
// Add 'desc' for descending, omit for ascending
```

### Filter by File Name Pattern

You can modify the query to only include files matching a pattern:

```javascript
const query = `'${FOLDER_ID}' in parents and name contains 'vacation' and (${mimeQuery}) and trashed=false`
```

## 💡 Pro Tips

1. **Organize Your Folder**
   - Keep your Drive folder organized with descriptive file names
   - The file name (without extension) becomes the media title

2. **Use Descriptive Names**
   - Instead of: `IMG_1234.jpg`
   - Use: `Amazon Rainforest Research 2023.jpg`

3. **Optimize File Sizes**
   - Compress images before uploading to Drive
   - Smaller files = faster loading times
   - Use tools like TinyPNG or Squoosh

4. **Monitor Your API Usage**
   - Check Google Cloud Console monthly
   - Set up billing alerts (free tier should be plenty)

5. **Keep media.json as Backup**
   - The `src/data/media.json` file serves as fallback
   - Useful if API is down or quota exceeded

## 🆘 Need More Help?

1. **Check Browser Console** (F12 → Console) for detailed error messages
2. **Google Cloud Console**: https://console.cloud.google.com/
3. **Google Drive API Documentation**: https://developers.google.com/drive/api/v3/about-sdk
4. **Test API Key**: Use the test command from `GOOGLE_DRIVE_MEDIA_GUIDE.md`

## 📝 Summary

Once configured:
- ✅ Add files to Google Drive folder
- ✅ Website automatically shows them
- ✅ Slideshow works with all media
- ✅ No manual CMS updates needed
- ✅ Fallback to media.json if needed

**Your folder**: https://drive.google.com/drive/folders/1CEo9edtNeIX003OtmDoHDxFb3h0yPpUI

---

**Remember**: Keep your API key secret, restrict it properly, and enjoy automatic media updates! 🎉
