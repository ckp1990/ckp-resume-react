# Resume Website Maintenance Guide

This guide will help you update your resume website without any coding knowledge. All your information is stored in easy-to-edit JSON files.

## 📁 Where to Find Your Information

All content is in the `src/data/` folder. Each file contains different parts of your resume:

- `personal.json` - Your name, contact info, and footer text
- `about.json` - Your summary/about section
- `experience.json` - Your work history
- `education.json` - Your degrees and education
- `skills.json` - Your skills and certifications
- `honors.json` - Your awards and publications

## 🔧 How to Edit

### Step 1: Open the File
1. Navigate to the `src/data/` folder
2. Click on the file you want to edit
3. Click the "Edit" button (pencil icon)

### Step 2: Make Your Changes
- Be careful not to delete any quotation marks `" "`
- Don't remove any commas `,`
- Don't delete curly braces `{ }` or square brackets `[ ]`

### Step 3: Save
- Click "Commit changes" when you're done
- The website will automatically rebuild and update!

---

## 📝 Editing Guide for Each File

### 1. Personal Information (`personal.json`)

**What you can change:**
- Your name
- Your job titles
- Your profile image
- Your email
- Your LinkedIn URL
- Your location
- Footer text

**Example:**
```json
{
  "name": "Your Name Here",
  "title": "Your Job Title",
  "subtitle": "Your Second Title",
  "profileImage": "/path/to/your/image.jpg",
  "email": "your.email@example.com",
  "linkedin": "https://www.linkedin.com/in/yourprofile",
  "location": "Your City, Country"
}
```

**Adding Your Profile Image:**
1. Upload your image to the `public` folder in the repository
2. Use the path like this: `"/your-image.jpg"` (if image is in public folder)
3. Or use a full URL: `"https://example.com/your-image.jpg"`
4. Leave it empty `""` to show a default placeholder icon

**Tips:**
- Best image size: 500x500 pixels or larger (square)
- Supported formats: JPG, PNG, WebP
- The image will display as a circle

---

### 2. About Section (`about.json`)

**How to edit paragraphs:**
- Each paragraph is in quotes
- Separate paragraphs with commas
- Use `<strong>Text</strong>` to make text **bold**
- Use `<em>Text</em>` to make text *italic*

**Example:**
```json
{
  "heading": "About",
  "paragraphs": [
    "This is the first paragraph about you.",
    "This is the second paragraph with <strong>bold text</strong>.",
    "<em>This entire paragraph is in italics.</em>"
  ]
}
```

---

### 3. Experience (`experience.json`)

**To add a new job:**
1. Copy an existing job entry (from `{` to `}`)
2. Paste it above or below
3. Add a comma between jobs
4. Update the `id` to a new number
5. Fill in your information

**To remove a job:**
- Delete the entire job entry from `{` to `}`
- Make sure jobs are still separated by commas

**Example of one job:**
```json
{
  "id": 1,
  "organization": "Company Name",
  "position": "Your Job Title",
  "startDate": "Jan 2020",
  "endDate": "Present",
  "location": "City, State, Country",
  "description": "Brief description if no bullet points",
  "responsibilities": [
    "First responsibility or achievement",
    "Second responsibility with <code>technical terms</code>",
    "Third responsibility with <strong>emphasis</strong>"
  ]
}
```

**Tips:**
- Use `<code>Text</code>` to highlight technical terms like `SQL`, `Python`, `R`
- Use `<strong>Text</strong>` to emphasize important numbers or achievements
- If you have bullet points, use `responsibilities` array
- If you have a single description, use `description` field
- Leave empty arrays as `[]` if not used

---

### 4. Education (`education.json`)

**To add a degree:**
1. Copy an existing degree entry
2. Paste it and add a comma
3. Update the `id` to a new number
4. Fill in your degree information

**Example:**
```json
{
  "id": 1,
  "degree": "Master of Science",
  "institution": "University Name",
  "field": "Your Major or Field",
  "year": "2020 - 2022"
}
```

---

### 5. Skills & Certifications (`skills.json`)

**To add a skill:**
- Add it to the `items` array
- Put it in quotes
- Separate with commas

**Example:**
```json
{
  "heading": "Skills & Certifications",
  "skills": {
    "heading": "Top Skills",
    "items": [
      "Skill 1",
      "Skill 2",
      "Skill 3"
    ]
  },
  "certifications": {
    "heading": "Certifications",
    "items": [
      "Certification Name 1",
      "Certification Name 2"
    ]
  }
}
```

---

### 6. Honors & Publications (`honors.json`)

**Awards** - Simple list of award names

**Publications** - Can be added with or without links:

**Without Link (simple text):**
```json
{
  "title": "Your publication title",
  "link": ""
}
```

**With Link (clickable):**
```json
{
  "title": "Your publication title",
  "link": "https://example.com/your-publication"
}
```

**Full Example:**
```json
{
  "heading": "Honors & Publications",
  "awards": {
    "heading": "Awards",
    "items": [
      "Award Name 1",
      "Award Name 2"
    ]
  },
  "publications": {
    "heading": "Publications",
    "items": [
      {
        "title": "Publication without a link",
        "link": ""
      },
      {
        "title": "Publication with a link to journal",
        "link": "https://doi.org/10.1234/example"
      }
    ]
  }
}
```

**Tips for Publications:**
- If you have a link (DOI, journal URL, etc.), add it to the `link` field
- If no link, leave it as empty quotes: `"link": ""`
- Publications with links will appear in blue and be clickable
- Publications without links will appear as regular text

---

## 🚨 Common Mistakes to Avoid

1. **Missing Commas**: Always put commas between items in a list
   ```json
   ❌ WRONG: ["Item 1" "Item 2"]
   ✅ RIGHT: ["Item 1", "Item 2"]
   ```

2. **Missing Quotes**: All text must be in quotes
   ```json
   ❌ WRONG: "name": Your Name
   ✅ RIGHT: "name": "Your Name"
   ```

3. **Extra Comma at End**: Don't put a comma after the last item
   ```json
   ❌ WRONG: ["Item 1", "Item 2",]
   ✅ RIGHT: ["Item 1", "Item 2"]
   ```

4. **Breaking Brackets**: Make sure all `{` have matching `}` and all `[` have matching `]`

---

## 🔍 How to Check if Your Changes Work

After editing:
1. Save your changes
2. Wait a few minutes for the website to rebuild
3. Visit your website to see the updates
4. If something looks wrong, check for the common mistakes above

---

## 💡 Special Formatting

You can use these special tags in your text:

- `<strong>Text</strong>` - Makes text **bold**
- `<em>Text</em>` - Makes text *italic*
- `<code>Text</code>` - Highlights technical terms (like SQL, Python, etc.)

**Example:**
```
"I am proficient in <code>Python</code> and achieved <strong>90%</strong> efficiency improvement."
```

This will display as: "I am proficient in **Python** and achieved **90%** efficiency improvement."

---

## 🆘 Need Help?

If you accidentally break something:
1. Look at the error message (if any)
2. Check for missing commas, quotes, or brackets
3. Compare your changes to the examples in this guide
4. You can always undo your changes on GitHub by clicking "History" and reverting to a previous version

---

## 🎯 Quick Reference

| Task | File to Edit |
|------|--------------|
| Change name or email | `personal.json` |
| Update about/summary | `about.json` |
| Add/remove jobs | `experience.json` |
| Add/remove education | `education.json` |
| Update skills | `skills.json` |
| Add awards/publications | `honors.json` |

---

**Remember:** Take it slow, make one change at a time, and always check your work!
