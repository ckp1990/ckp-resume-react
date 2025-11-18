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