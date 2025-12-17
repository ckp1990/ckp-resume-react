# How to Write a Blog Post on GitHub

This guide explains how to publish a new blog post directly from the GitHub website, without needing to install any software or write code.

## 🚀 Quick Summary
1. **Upload your image** to the `public/images/` folder.
2. **Add your post** to the `src/data/blog.json` file.

---

## 📸 Step 1: Upload Your Image

If your blog post has an image, upload it first so you can link to it.

1.  Go to the repository homepage on GitHub.
2.  Click on the **`public`** folder, then the **`images`** folder.
3.  Click the **Add file** button (top right) and select **Upload files**.
4.  Drag and drop your image file (e.g., `my-vacation.jpg`).
5.  Wait for it to upload, then click the green **Commit changes** button.

> **Tip:** Remember the exact file name (e.g., `my-vacation.jpg`). You will need it in the next step.

---

## ✍️ Step 2: Add the Blog Post

1.  Go back to the repository homepage.
2.  Navigate to **`src`** > **`data`** > **`blog.json`**.
3.  Click the **Pencil icon** (✏️) in the top right to edit the file.
4.  Scroll to the very bottom of the file.
5.  Find the list of posts (it starts with `"posts": [`).
6.  Look for the last post's closing curly brace `}`.
7.  **Crucial:** Add a **comma** `,` after that closing brace.
8.  Paste your new post template below it (before the final `]` and `}`).

### Copy-Paste Template

```json
    {
      "id": 100,
      "title": "My New Post Title",
      "slug": "my-new-post-title",
      "date": "2025-05-20",
      "category": "Personal",
      "tags": ["Life", "Update"],
      "excerpt": "A short summary that appears on the home page.",
      "published": true,
      "content": "# My New Post Title\n\nWrite your content here.\n\n## Adding an Image\n\n![](/images/YOUR-IMAGE-NAME.jpg)\n\nYou can use **bold text** or *italics* too."
    }
```

### ⚠️ Important Checklist
*   **Unique ID:** Change `"id": 100` to a number that hasn't been used yet (e.g., if the last one was 5, use 6).
*   **Slug:** Change `"slug"` to a URL-friendly version of your title (lowercase, no spaces, use dashes).
*   **Date:** Update the `"date"` to today (YYYY-MM-DD).
*   **Image Path:** Ensure `/images/YOUR-IMAGE-NAME.jpg` matches the file you uploaded in Step 1 exactly.

---

## 💾 Step 3: Save and Publish

1.  Scroll to the bottom of the page.
2.  In the "Commit changes" box, type a message like `Add new blog post: My New Title`.
3.  Click the green **Commit changes** button.

**That's it!** GitHub Actions will automatically rebuild your site. Your new post should appear in a few minutes.

---

## 📝 Markdown Cheatsheet (For the "content" field)

The `"content"` field supports Markdown. Here are some basics:

*   **Headings:** Use `#` for main title, `##` for subtitles.
    *   `# My Title`
    *   `## Section 1`
*   **Bold:** `**text**` → **text**
*   **Italic:** `*text*` → *text*
*   **Links:** `[Link Text](https://google.com)`
*   **Images:** `![](/images/filename.jpg)`
*   **Lists:**
    *   `- Item 1`
    *   `- Item 2`

> **Note:** Since you are writing inside a JSON file, you must use `\n` to make a new line.
> *   **Bad:**
>     `"content": "# Title`
>     `This is a new line"`
> *   **Good:** `"content": "# Title\n\nThis is a new line"`
