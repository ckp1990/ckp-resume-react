# Chandan Kumar Pandey - Resume Website

A distinctive, modern resume website for Chandan Kumar Pandey, Ecologist and Data Scientist.

## Design Features

- **Sticky Navigation Bar**: Easy access to all sections with smooth scroll
- **Profile Image**: Customizable profile photo with elegant placeholder
- **Unique Typography**: Crimson Pro, Newsreader, and JetBrains Mono fonts
- **Minimalistic Light Theme**: Clean off-white background with black text
- **Navy Blue Accents**: Professional navy blue for headings and minimal highlights
- **Smooth Animations**: Staggered page load animations for visual interest
- **Clean & Professional**: Design emphasizes readability and professionalism

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- GitHub Pages deployment

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Google Drive Integration (Photos Gallery)

The "Photos" section of the website fetches images directly from a Google Drive folder. To enable this feature, you must configure the following credentials:

### 1. Required Credentials
- **Google Drive API Key**: An API key from Google Cloud Console with access to the Google Drive API.
- **Folder ID**: The ID of the public Google Drive folder containing your images. (The ID is the long string at the end of the folder URL).

### 2. GitHub Configuration (Production)
To make images appear on your live website:
1. Go to your GitHub Repository > **Settings** > **Secrets and variables** > **Actions**.
2. Click **New repository secret**.
3. Add `GOOGLE_DRIVE_API_KEY` with your API key value.
4. Add `GOOGLE_DRIVE_FOLDER_ID` with your folder ID value.
5. The next time the site builds (or when you manually run the workflow), the images will be fetched.

### 3. Local Development (Optional)
To see images while developing locally:
1. Create a file named `.env` in the root directory of the project.
2. Add the following lines:
   ```env
   GOOGLE_DRIVE_API_KEY=your_api_key_here
   GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
   ```
3. Restart the development server (`npm run dev`).

> **Note:** If these credentials are missing or incorrect, the "Photos" section will display "No images available".

## Content Management

**Easy to Update - No Coding Required!**

All resume content is stored in JSON files in the `src/data/` folder. Non-technical users can easily update:

- **Personal Info**: `src/data/personal.json` - Name, email, social links (LinkedIn, GitHub, ORCID, ResearchGate), location, profile image
- **About Section**: `src/data/about.json` - Your summary/bio
- **Experience**: `src/data/experience.json` - Work history and achievements
- **Education**: `src/data/education.json` - Degrees and institutions
- **Skills**: `src/data/skills.json` - Skills and certifications
- **Honors**: `src/data/honors.json` - Awards and publications

### 📖 For Non-Technical Users

See the [MAINTENANCE_GUIDE.md](./MAINTENANCE_GUIDE.md) for step-by-step instructions on:
- How to edit each section
- How to add/remove items
- Common mistakes to avoid
- Special formatting options

Simply edit the JSON files, commit changes, and the website automatically rebuilds!

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main or claude/* branches.