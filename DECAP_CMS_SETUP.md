# Decap CMS Setup Guide

This guide will walk you through setting up and using Decap CMS (formerly Netlify CMS) for your resume website.

## 📖 Table of Contents

1. [What is Decap CMS?](#what-is-decap-cms)
2. [Files Added](#files-added)
3. [Setup Instructions](#setup-instructions)
4. [Accessing the CMS](#accessing-the-cms)
5. [Using the CMS](#using-the-cms)
6. [Troubleshooting](#troubleshooting)
7. [Alternative: Local Development](#alternative-local-development)

---

## What is Decap CMS?

Decap CMS is a free, open-source content management system that provides a user-friendly interface to edit your website content. It:

- Works directly with your GitHub repository
- Provides a visual editor (no coding required!)
- Automatically commits changes to GitHub
- Triggers automatic website rebuilds
- Is completely free to use
- Doesn't require a separate database or server

**Key Benefits:**
- Edit content through a clean, modern interface
- No need to manually edit JSON files
- Preview changes before publishing
- Automatic formatting validation
- Mobile-friendly admin panel

---

## Files Added

The following files have been added to enable Decap CMS:

### 1. `public/admin/config.yml`
Configuration file that defines:
- Which JSON files can be edited
- What fields are available in each section
- Field types and validation rules
- Collection structure

### 2. `public/admin/index.html`
The admin interface that loads the CMS

### 3. `index.html` (Modified)
Added Netlify Identity widget for authentication

---

## Setup Instructions

### Step 1: Deploy to Netlify

Since you're using GitHub Pages with a custom domain, we'll use **Netlify Identity** for authentication (it's free and works with any hosting).

1. **Sign up for Netlify** (if you haven't already)
   - Go to https://www.netlify.com/
   - Click "Sign up" and connect with your GitHub account

2. **Create a New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" as your Git provider
   - Select your repository: `ckp1990/ckp-resume-react`
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Branch to deploy:** `main` (or your preferred branch)
   - Click "Deploy site"

3. **Enable Identity Service**
   - Go to your site dashboard
   - Click "Identity" in the top menu
   - Click "Enable Identity"

4. **Enable Git Gateway**
   - In the Identity tab, scroll down to "Services"
   - Click "Enable Git Gateway"
   - This allows the CMS to commit to your GitHub repo

5. **Configure Identity Settings**
   - Under "Identity" → "Settings and usage"
   - Set "Registration preferences" to "Invite only" (recommended for security)
   - Enable "Git Gateway"

6. **Invite Yourself as a User**
   - Go to "Identity" tab
   - Click "Invite users"
   - Enter your email address
   - Check your email and accept the invitation
   - Set your password

### Step 2: Update Your Site Configuration

**If using GitHub Pages as primary hosting:**

Since your site is hosted on GitHub Pages with custom domain `chandankp.com`, you have two options:

**Option A: Use Netlify only for CMS Authentication (Recommended)**

1. In Netlify, go to "Site settings" → "Domain management"
2. Add your custom domain as an additional domain (e.g., `cms.chandankp.com`)
3. Or use the Netlify subdomain for CMS access (e.g., `your-site-name.netlify.app/admin`)
4. Your main site stays on GitHub Pages at `chandankp.com`
5. Access CMS at `your-site-name.netlify.app/admin` or `cms.chandankp.com/admin`

**Option B: Switch entirely to Netlify**

1. Change your DNS to point to Netlify instead of GitHub Pages
2. Netlify will automatically deploy from your GitHub repo
3. Access both site and CMS from `chandankp.com`

**For most users, Option A is simpler** - you keep GitHub Pages for hosting and use Netlify just for CMS authentication.

### Step 3: Configure Backend in config.yml

The `public/admin/config.yml` is already configured with:

```yaml
backend:
  name: git-gateway
  branch: main
```

This tells Decap CMS to use Netlify's Git Gateway for authentication.

---

## Accessing the CMS

### First Time Access

1. **Navigate to the admin panel:**
   - If using Netlify: `https://your-site-name.netlify.app/admin`
   - If using GitHub Pages with Netlify Identity: Deploy to Netlify first, then access

2. **Log in with Netlify Identity:**
   - Click "Login with Netlify Identity"
   - Enter the email and password you set during invitation

3. **You're in!**
   - You should now see the Decap CMS dashboard

### Regular Access

Simply visit `/admin` on your site URL:
- `https://your-site-name.netlify.app/admin`
- Or `https://chandankp.com/admin` (if fully migrated to Netlify)

---

## Using the CMS

### Dashboard Overview

After logging in, you'll see several collections on the left sidebar:

- **Personal Information** - Your name, contact info, social links
- **About Section** - Your biography/summary
- **Experience** - Work history and responsibilities
- **Education** - Degrees and institutions
- **Skills & Certifications** - Your skills and certifications
- **Honors & Publications** - Awards and publications

### Editing Content

1. **Select a Collection**
   - Click on any collection from the sidebar

2. **Edit the Content**
   - Click on the item you want to edit
   - Fill in the form fields
   - Rich text editor is provided for longer content

3. **Preview Your Changes** (if available)
   - Some CMS versions support preview
   - Check how your changes will look

4. **Save Your Changes**
   - Click "Save" (saves as a draft)
   - Then click "Publish" to commit changes to GitHub

5. **Automatic Deployment**
   - Changes are committed to your GitHub repository
   - GitHub Actions automatically rebuilds your site
   - Changes appear live in a few minutes

### Adding New Items

**To add a new job (Experience):**
1. Click "Experience" in the sidebar
2. Click "Work Experience"
3. Scroll to "Jobs" section
4. Click "Add Jobs" button
5. Fill in all fields
6. Save and publish

**To add a new degree (Education):**
1. Click "Education"
2. Click "Education"
3. Scroll to "Degrees" section
4. Click "Add Degrees"
5. Fill in degree information
6. Save and publish

**To add a new publication:**
1. Click "Honors & Publications"
2. Click "Honors"
3. Scroll to "Publications → Items"
4. Click "Add Items"
5. Enter title and optional link
6. Save and publish

### Deleting Items

1. Open the item you want to delete
2. Scroll to the item in a list
3. Click the "X" or delete button next to the item
4. Save and publish

---

## Troubleshooting

### Problem: "Cannot access admin page"

**Solution:**
- Make sure you've deployed to Netlify and enabled Identity
- Check that you're accessing the correct URL (`/admin`)
- Clear browser cache and try again

### Problem: "Login not working"

**Solution:**
- Ensure you've enabled Netlify Identity in your Netlify dashboard
- Make sure you've accepted the invitation email
- Try password reset if needed
- Check that Git Gateway is enabled

### Problem: "Changes not appearing on the website"

**Solution:**
- Wait a few minutes for GitHub Actions to rebuild the site
- Check the Actions tab in your GitHub repository
- Make sure you clicked "Publish" not just "Save"
- Verify the branch in `config.yml` matches your deployment branch

### Problem: "Error: Failed to load entries"

**Solution:**
- Check that your JSON files are valid
- Ensure the file paths in `config.yml` match your actual files
- Make sure Git Gateway is properly configured in Netlify

### Problem: "JSON validation error when saving"

**Solution:**
- This usually means required fields are empty
- Check all required fields have values
- Some fields might need specific formatting

---

## Alternative: Local Development

You can test the CMS locally without deploying to Netlify first.

### Step 1: Enable Local Backend

Edit `public/admin/config.yml` and uncomment this line:

```yaml
local_backend: true
```

### Step 2: Install Decap CMS Proxy Server

```bash
npx decap-server
```

### Step 3: Access Local CMS

1. Run your dev server: `npm run dev`
2. In another terminal, run: `npx decap-server`
3. Visit: `http://localhost:5173/admin`
4. You can now edit content locally without authentication

**Note:** Local mode commits directly to your local Git repository. You still need to push changes to GitHub manually.

---

## Field Formatting Guide

### Special Text Formatting

You can use HTML-like tags in many text fields:

- `<strong>text</strong>` - Makes text **bold**
- `<em>text</em>` - Makes text *italic*
- `<code>text</code>` - Highlights technical terms (like `Python`, `SQL`, etc.)

**Example:**
```
I have expertise in <code>Python</code> and achieved <strong>90%</strong> improvement.
```

This will display: "I have expertise in **Python** and achieved **90%** improvement."

### Links in Publications

Publications support optional links:

- **Title**: Enter the full publication title
- **Link**: Enter the DOI or journal URL (leave empty if no link)

Publications with links will be clickable and appear in blue on your website.

---

## Security Best Practices

1. **Invite Only Registration**
   - Keep registration set to "Invite only" in Netlify Identity
   - Only invite trusted users who should edit your resume

2. **Strong Passwords**
   - Use a strong, unique password for your Netlify Identity account

3. **Regular Backups**
   - Your content is safely stored in GitHub
   - All changes are version-controlled
   - You can always revert to previous versions

4. **Review Changes**
   - Check the GitHub commit history periodically
   - Ensure only authorized changes are made

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────┐
│  1. Edit content in CMS at /admin                   │
│     (User-friendly interface)                       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  2. Click "Publish"                                 │
│     (CMS commits changes to GitHub)                 │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  3. GitHub Actions automatically builds site        │
│     (Deploys to GitHub Pages)                       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  4. Changes appear live on chandankp.com            │
│     (Usually within 2-5 minutes)                    │
└─────────────────────────────────────────────────────┘
```

---

## Frequently Asked Questions

### Q: Do I need to pay for Netlify?
**A:** No! Netlify's free tier is more than enough for CMS authentication. You can keep using GitHub Pages for hosting.

### Q: Will this break my existing website?
**A:** No! The CMS is completely non-invasive. Your website works exactly as before. The CMS just provides a UI to edit the JSON files.

### Q: Can multiple people edit the content?
**A:** Yes! You can invite multiple users through Netlify Identity. Each person gets their own login.

### Q: What happens if I edit JSON files directly?
**A:** That's fine! You can still edit JSON files manually in GitHub or locally. The CMS is just an alternative, easier way to edit.

### Q: Can I undo changes?
**A:** Yes! Since everything is in Git, you can always revert to previous versions through GitHub's commit history.

### Q: Do I need to keep Netlify if I'm using GitHub Pages?
**A:** You only need Netlify for the Identity service (authentication). Your site can remain on GitHub Pages. Alternatively, you can migrate entirely to Netlify (also free).

---

## Additional Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review your browser console for errors (F12 → Console tab)
3. Check GitHub Actions for build errors
4. Verify Netlify Identity is properly configured
5. Review the Decap CMS documentation

---

**Last Updated:** January 2025

**Your current setup:**
- Website: `chandankp.com` (GitHub Pages)
- Repository: `ckp1990/ckp-resume-react`
- CMS: Decap CMS with Netlify Identity
- Deployment: GitHub Actions

Happy editing! 🎉
