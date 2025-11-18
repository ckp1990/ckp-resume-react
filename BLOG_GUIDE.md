# Blog Feature Guide

This guide explains how to use and manage the blog feature on your resume website.

## 📖 Overview

Your website now includes a fully integrated blog section where you can share:
- Research insights and findings
- Data science tutorials
- Career advice
- Opinion pieces
- Any other content you'd like to publish

## ✨ Features

- **Markdown Support**: Write rich content with formatting, links, code blocks, lists, and more
- **Categories & Tags**: Organize posts by category and tag them for better organization
- **Draft/Publish Control**: Mark posts as published or unpublished
- **Automatic Sorting**: Posts are automatically displayed newest first
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **CMS Integration**: Easily add and edit blog posts through the Decap CMS interface

## 🎨 Blog Structure

### Blog Listing Page
- Shows all published posts sorted by date (newest first)
- Displays post title, date, category, tags, and excerpt
- Click any post to read the full content

### Blog Post Detail Page
- Full markdown content rendered beautifully
- Date and category badges
- Tags displayed
- "Back to Blog" button to return to list

## 📝 Adding a New Blog Post

### Option 1: Through Decap CMS (Recommended)

1. **Log into the CMS:**
   - Visit `your-site.netlify.app/admin`
   - Log in with your Netlify Identity credentials

2. **Navigate to Blog:**
   - Click "Blog" in the left sidebar
   - Click "Blog Settings & Posts"

3. **Add a New Post:**
   - Scroll to the "Posts" section
   - Click the "Add Posts" button

4. **Fill in the Fields:**
   - **ID**: Enter a unique number (e.g., 3, 4, 5...)
   - **Title**: Your blog post title
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Date**: Select the publication date
   - **Excerpt**: Short summary (1-2 sentences)
   - **Category**: e.g., "Research", "Tutorial", "Opinion"
   - **Tags**: Add keywords (optional)
   - **Published**: Check to make it visible, uncheck to hide
   - **Content**: Write your full post using Markdown

5. **Save and Publish:**
   - Click "Save"
   - Click "Publish" to commit changes

6. **Wait for Deployment:**
   - Your site will automatically rebuild
   - Changes appear live in 2-5 minutes

### Option 2: Manually Edit JSON

If you prefer to edit the JSON file directly:

1. **Open the file:**
   ```
   src/data/blog.json
   ```

2. **Add a new post object:**
   ```json
   {
     "id": 3,
     "title": "Your Post Title",
     "slug": "your-post-title",
     "date": "2025-01-20",
     "excerpt": "Short summary of your post.",
     "category": "Research",
     "tags": ["ecology", "data-science"],
     "published": true,
     "content": "# Your Post Title\n\nYour content here with **Markdown** formatting."
   }
   ```

3. **Commit and push:**
   ```bash
   git add src/data/blog.json
   git commit -m "Add new blog post: Your Post Title"
   git push
   ```

## ✍️ Writing Content with Markdown

Markdown is a simple way to format text. Here's what you can use:

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item
```

### Code
```markdown
Inline code: `code here`

Code block:
```
function example() {
  return "Hello world";
}
```
```

### Blockquotes
```markdown
> This is a quote
```

### Images
```markdown
![Alt text](/path/to/image.jpg)
```

## 🏷️ Best Practices

### Choosing a Slug
- Use lowercase letters
- Replace spaces with hyphens
- No special characters
- Example: "Understanding Wood Density" → "understanding-wood-density"

### Writing Excerpts
- Keep it short (1-2 sentences)
- Summarize the main point
- Make it engaging to encourage clicks

### Categories
Suggested categories:
- **Research**: Academic research and findings
- **Tutorial**: How-to guides and walkthroughs
- **Opinion**: Personal thoughts and perspectives
- **News**: Updates and announcements
- **General**: Miscellaneous posts

### Tags
- Use 2-5 tags per post
- Be consistent with tag names
- Use lowercase
- Examples: "ecology", "data-science", "python", "r", "conservation"

### Content Length
- Aim for 500-2000 words for most posts
- Longer for in-depth tutorials or research
- Shorter for quick updates or announcements

## 📅 Managing Posts

### Publishing a Post
Set `"published": true` in the JSON or check the "Published" box in CMS

### Unpublishing a Post
Set `"published": false` or uncheck "Published" in CMS
- Post won't appear on the website
- Data is preserved and can be re-published later

### Editing a Post
1. Via CMS: Click the post in CMS, make changes, save and publish
2. Via JSON: Edit the post object in `blog.json`, commit and push

### Deleting a Post
1. Via CMS: Open the post, scroll to the item in the list, click delete icon
2. Via JSON: Remove the post object from the `posts` array in `blog.json`

## 🎯 SEO Tips

1. **Use Descriptive Titles**: Make titles clear and keyword-rich
2. **Write Compelling Excerpts**: This is what appears in previews
3. **Choose Relevant Tags**: Helps with categorization
4. **Use Headings**: Structure content with H2 and H3 headings
5. **Add Links**: Link to your publications or external resources

## 🚀 Advanced Features

### Embedding External Content

You can embed links in your markdown:
```markdown
Read my full publication [here](https://doi.org/example).
```

### Adding Images

1. **Upload image to `public/images/` folder**
2. **Reference in markdown:**
   ```markdown
   ![Description](/images/your-image.jpg)
   ```

### Code Syntax Highlighting

Use triple backticks with language identifier:
````markdown
```python
import pandas as pd
data = pd.read_csv('data.csv')
```
````

### Internal Links

Link to other sections of your site:
```markdown
Read more in my [About section](#about)
```

## 🔍 Examples

### Sample Research Post

```markdown
# Understanding Forest Dynamics in the Western Ghats

## Introduction

The Western Ghats represent one of the world's biodiversity hotspots...

## Methodology

We collected data from **25 forest plots** across the region using:
- Quadrat sampling methods
- Species identification
- Biomass calculations

## Key Findings

Our analysis revealed three major patterns:

1. **Species Diversity**: Higher at mid-elevations
2. **Carbon Storage**: Directly correlated with tree density
3. **Regeneration**: Dependent on disturbance regimes

## Implications

This research has important implications for:
- Conservation planning
- Climate change mitigation
- Forest management policies

*Read the full paper [here](https://doi.org/example).*

## References

- Author et al. (2024). Journal Name.
```

### Sample Tutorial Post

```markdown
# Getting Started with R for Ecological Data Analysis

## Prerequisites

Before starting, you'll need:
- R (version 4.0+)
- RStudio
- Basic programming knowledge

## Installation

Install required packages:

```r
install.packages(c("tidyverse", "vegan", "ggplot2"))
```

## Loading Data

```r
library(tidyverse)
data <- read_csv("ecological_data.csv")
```

## Basic Analysis

Calculate species diversity:

```r
library(vegan)
diversity_index <- diversity(data, index = "shannon")
```

## Visualization

```r
ggplot(data, aes(x = species, y = abundance)) +
  geom_bar(stat = "identity") +
  theme_minimal()
```

## Next Steps

- Explore multivariate analysis
- Learn about ordination methods
- Practice with your own data

Happy analyzing!
```

## 📊 Blog Analytics

Currently, the blog doesn't have built-in analytics. To track blog performance, you can:

1. **Google Analytics**: Add tracking code to measure views
2. **Netlify Analytics**: Enable in your Netlify dashboard
3. **Social Media Tracking**: Monitor shares and engagement

## ❓ FAQ

**Q: How many blog posts can I have?**
A: No limit! Add as many as you'd like.

**Q: Can I schedule posts for future dates?**
A: Not automatically, but you can set a future date and unpublish until that date arrives.

**Q: Can I have multiple authors?**
A: Currently no, but you can add an "author" field to the JSON structure if needed.

**Q: Can I add comments?**
A: Not built-in, but you can integrate third-party services like Disqus or Utterances.

**Q: What if I make a mistake?**
A: All changes are version-controlled in Git. You can revert to any previous version through GitHub.

**Q: Can I customize the blog design?**
A: Yes! Edit the blog section in `src/App.jsx` to modify styling and layout.

## 🛠️ Troubleshooting

### Post Not Appearing

1. **Check if published:** Ensure `published: true`
2. **Check the date:** Future dates won't hide posts, but verify it's correct
3. **Rebuild the site:** Push changes to trigger rebuild
4. **Clear cache:** Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Markdown Not Rendering

1. **Check syntax:** Ensure proper markdown formatting
2. **Escape special characters:** Use backslash if needed
3. **Preview in CMS:** Use the rich text editor to preview

### Slug Conflicts

Each slug should be unique. If you use the same slug for two posts, navigation might break.

## 📚 Additional Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [React Markdown Documentation](https://github.com/remarkjs/react-markdown)

---

**Happy Blogging! 🎉**

For questions or issues, refer to the main documentation or check your browser console for errors.
