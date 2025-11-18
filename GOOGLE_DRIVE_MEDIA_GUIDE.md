# Google Drive Media Guide

This guide explains how to use Google Drive files in your Media Gallery and troubleshoot common issues.

## 🔑 Making Files Public (REQUIRED)

For Google Drive images and videos to display on your website, they **must be publicly accessible**.

### Step-by-Step: Share a File Publicly

1. **Open Google Drive** and locate your file
2. **Right-click** on the file
3. Select **"Share"** or click the share icon
4. Click **"Change to anyone with the link"**
5. Ensure it's set to **"Viewer"** access
6. Click **"Done"**

**Important**: Files must have "Anyone with the link can view" permission, not restricted to specific people.

## 📋 Getting the File ID

### From Share Link

When you share a file, Google Drive gives you a link like:
```
https://drive.google.com/file/d/1ABC123XYZ456DEF789/view?usp=sharing
```

The **File ID** is the part between `/d/` and `/view`:
```
1ABC123XYZ456DEF789
```

### From Browser URL

If you open the file in Google Drive, the URL looks like:
```
https://drive.google.com/file/d/1ABC123XYZ456DEF789/view
```

Again, extract the ID between `/d/` and `/view`.

## 🖼️ Adding Images

### Supported Image Formats
- JPG/JPEG
- PNG
- GIF
- WebP
- BMP

### Best Practices for Images

1. **Optimize file size** before uploading to Google Drive
   - Recommended: Under 2MB per image
   - Use tools like TinyPNG, Squoosh, or Photoshop

2. **Use appropriate dimensions**
   - Website displays in cards with aspect ratio 16:9
   - Recommended: 1920x1080 or similar HD resolution

3. **File naming**
   - Use descriptive names (e.g., `fieldwork-amazon-2023.jpg`)
   - Avoid special characters

### Adding Image via CMS

1. Upload image to Google Drive
2. Share publicly (see above)
3. Copy the File ID
4. In CMS, go to **Media Gallery**
5. Click **"Add Media Items"**
6. Fill in:
   - **ID**: Unique number (1, 2, 3...)
   - **Title**: "Amazon Rainforest Fieldwork"
   - **Description**: Optional description
   - **Type**: Select "image"
   - **Google Drive File ID**: Paste `1ABC123XYZ456DEF789`
   - **Category**: "Fieldwork"

## 🎥 Adding Videos

### Supported Video Formats
- MP4 (recommended)
- MOV
- AVI
- WebM

### Best Practices for Videos

1. **Compress videos** before uploading
   - Google Drive allows up to 5TB, but smaller is better for playback
   - Recommended: Under 100MB for smooth streaming

2. **Use web-friendly formats**
   - MP4 with H.264 codec works best
   - Avoid exotic formats

3. **Consider length**
   - Shorter videos load faster
   - If you have long videos, consider uploading to YouTube instead

### Adding Video via CMS

Same process as images, but select **"video"** for the Type field.

## ❌ Common Issues & Solutions

### Issue 1: Image Shows "No media" or Doesn't Load

**Possible Causes:**
- File is not publicly shared
- Incorrect File ID
- File was deleted from Google Drive
- Google Drive API limits reached

**Solutions:**
1. **Check sharing settings** - Make sure it's "Anyone with the link can view"
2. **Verify File ID** - Copy it again from the share link
3. **Test the file** - Try opening it in an incognito browser window
4. **Wait a moment** - Sometimes takes a few seconds to update

### Issue 2: 403 Forbidden Error

**Cause:** File is not publicly accessible

**Solution:**
1. Go to Google Drive
2. Right-click the file → Share
3. Change to "Anyone with the link can view"
4. Clear your browser cache and reload

### Issue 3: Video Won't Play

**Possible Causes:**
- File not publicly shared
- Unsupported video format
- File too large
- Google Drive processing video

**Solutions:**
1. Ensure file is publicly shared
2. Convert to MP4 format
3. Compress the video if over 100MB
4. Wait 5-10 minutes after uploading (Google Drive processes videos)

### Issue 4: Image Quality is Poor

**Cause:** Our URL uses `sz=w2000` which limits to 2000px width

**Solution:**
If you need higher quality, you have two options:
1. Accept 2000px width (sufficient for most displays)
2. Host images elsewhere (see alternatives below)

## 🔄 Alternative Hosting Options

If Google Drive isn't working well for your use case, consider:

### For Images:
1. **Upload directly to your website**
   - Place images in `public/images/` folder
   - Reference as `/images/your-image.jpg`
   - Best for small number of images

2. **Cloudinary** (Free tier: 25GB storage)
   - Better image optimization
   - Automatic format conversion
   - https://cloudinary.com

3. **Imgur** (Free, unlimited)
   - Simple upload interface
   - Direct image links
   - https://imgur.com

### For Videos:
1. **YouTube** (Free, unlimited)
   - Better streaming performance
   - Built-in player controls
   - Good for longer videos
   - Can embed easily

2. **Vimeo** (Free tier: 500MB/week)
   - Professional appearance
   - Better quality than YouTube
   - https://vimeo.com

## 📊 Google Drive Limits

### Free Google Account (15GB total):
- Includes Gmail, Drive, Photos
- Shared across all services
- Sufficient for hundreds of images

### Google One (Paid):
- 100GB: $1.99/month
- 200GB: $2.99/month
- 2TB: $9.99/month

### API Limits:
- 1,000 requests per 100 seconds per user
- Plenty for a personal website

## 🛠️ Testing Your Setup

After adding media to the CMS:

1. **Save and publish** the changes
2. **Wait 2-3 minutes** for site to rebuild
3. **Visit your website** and navigate to Media section
4. **Check browser console** (F12) for any errors
5. **Try different browsers** to rule out caching issues

### Quick Test Command

Open browser console (F12) and paste:
```javascript
fetch('https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w2000')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Error:', e))
```

Replace `YOUR_FILE_ID` with your actual file ID.
- Status 200 = Working ✅
- Status 403 = Not publicly shared ❌
- Status 404 = File ID incorrect ❌

## 💡 Pro Tips

1. **Organize in folders**
   - Create folders in Google Drive for different categories
   - Makes management easier

2. **Use consistent naming**
   - Example: `fieldwork-2023-01.jpg`, `fieldwork-2023-02.jpg`
   - Helps track which files are used where

3. **Keep a backup**
   - Google Drive is reliable, but keep local backups
   - Especially for irreplaceable photos

4. **Test before adding many files**
   - Add one test image first
   - Make sure it displays correctly
   - Then add the rest

5. **Monitor storage usage**
   - Check Google Drive storage regularly
   - Clean up unused files

## 📝 Example Media Items

### Example 1: Research Photo
```json
{
  "id": 1,
  "title": "Forest Canopy Study - Amazon Basin",
  "description": "Data collection in the Amazon rainforest, 2023",
  "type": "image",
  "googleDriveId": "1ABC123XYZ456DEF789",
  "category": "Fieldwork"
}
```

### Example 2: Presentation Video
```json
{
  "id": 2,
  "title": "Conference Presentation - Wood Density Research",
  "description": "Annual Ecology Conference 2023",
  "type": "video",
  "googleDriveId": "1XYZ789ABC456DEF123",
  "category": "Presentations"
}
```

## ❓ FAQ

**Q: How many images can I add?**
A: No limit in the code, but Google Drive free tier has 15GB total storage.

**Q: Will this slow down my website?**
A: No, images are lazy-loaded and only downloaded when visible.

**Q: Can I mix Google Drive and local images?**
A: Currently, the media gallery only supports Google Drive. For local images, place them in `public/images/` and reference in other sections.

**Q: What if Google Drive is down?**
A: Your website will still work, but media items won't load. Consider using multiple hosting sources for important images.

**Q: Can I password-protect certain media?**
A: Not with this setup. All media must be publicly accessible to display.

**Q: How do I remove media?**
A: Just delete the item from the CMS. The file stays in Google Drive (you can delete it there separately if needed).

## 🆘 Still Having Issues?

If you've followed this guide and still experiencing problems:

1. **Check browser console** (F12 → Console tab) for specific error messages
2. **Try incognito mode** to rule out caching
3. **Test with a different file** to isolate the issue
4. **Verify Google Drive is not down** - check status.google.com
5. **Consider alternative hosting** if Google Drive consistently has issues

---

**Remember**: The most common issue is forgetting to make files publicly shared!

**Pro Tip**: Bookmark your Google Drive media folder for quick access when adding new content.
