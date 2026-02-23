# Codebase Documentation

This document provides a technical overview of the **ckp-resume-react** project. It complements the existing user guides by focusing on the software architecture, code organization, and development workflows.

## 1. Project Overview

**ckp-resume-react** is a modern, responsive resume and portfolio website built with **React**. It is designed to be easily maintainable by separating content (data) from presentation (code).

**Key Technologies:**
- **Core Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Icons:** React Icons (FontAwesome, Simple Icons, etc.)
- **Markdown:** React Markdown (for rich text rendering)

## 2. Directory Structure

The project follows a standard Vite + React project structure:

```
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── data/               # JSON files containing all website content
│   ├── utils/              # Utility functions (e.g., Google Drive API)
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── .env.example            # Template for environment variables
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## 3. Key Components

### `src/App.jsx`
This is the monolithic main component that orchestrates the entire single-page application. It handles:
- **State Management:** Manages state for the mobile menu, media lightbox, blog post selection, and media carousel.
- **Navigation:** Implements a sticky navigation bar with smooth scrolling to sections.
- **Section Rendering:** Renders various sections (Hero, About, Experience, Education, etc.) by mapping over data imported from `src/data/`.
- **Interactivity:** Handles user interactions like opening the lightbox, filtering blog posts, and toggling the mobile menu.

### `src/utils/googleDrive.js`
This module provides integration with the Google Drive API to dynamically fetch media (photos and videos) for the portfolio/media section.
- **`fetchGoogleDriveMedia()`**: Fetches a list of files from a specified Google Drive folder. It handles filtering by MIME type (images/videos) and transforms the API response into the application's internal data format.
- **`getGoogleDriveUrl()`**: Generates the appropriate display URL for a file (thumbnail for images, preview link for videos).

## 4. Data Management

The application uses a "JSON as Database" approach. Content is stored in the `src/data/` directory, allowing non-developers to update the site without touching React code.

| File | Purpose |
|------|---------|
| `personal.json` | Core profile info (Name, Title, Social Links, Contact) |
| `about.json` | "About Me" summary |
| `experience.json` | Work history |
| `education.json` | Academic background |
| `skills.json` | Technical skills and certifications |
| `honors.json` | Awards and publications list |
| `blog.json` | Blog posts with Markdown content |
| `media.json` | Fallback media items (used if Google Drive API is not active) |

## 5. Styling and Theming

Styling is handled almost exclusively via **Tailwind CSS**.
- **Global Styles:** Defined in `src/index.css`.
- **Theme:** The design uses a professional color palette (Navy Blue `#1e3a8a` and Off-White/Stone) defined via Tailwind utility classes.
- **Animations:** Custom animations (fade-in, slide-up) are likely defined in the Tailwind config or CSS, adding visual polish to page loads.

## 6. External Integrations

### Google Drive API
The project can optionally connect to Google Drive to populate the Media gallery.
- **Configuration:** Requires `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID` in a `.env` file.
- **Fallback:** If these variables are missing or the API fails, the app gracefully falls back to `src/data/media.json`.

## 7. Development and Build Scripts

The `package.json` includes standard Vite scripts:

- **`npm run dev`**: Starts the local development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles the application for production into the `dist/` folder.
- **`npm run preview`**: Locally previews the production build to ensure everything works as expected.

## 8. Deployment

The project is configured for deployment on GitHub Pages. The build process generates static assets that can be hosted on any static site provider.
