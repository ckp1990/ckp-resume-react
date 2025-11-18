# How to Add Your Profile Photo

## Quick Steps

1. **Upload your photo to the `public` folder**
   - Name it something simple like `profile.jpg` or `headshot.jpg`
   - Your image dimensions (2892 x 3619 px) are fine - it will auto-crop

2. **Edit `src/data/personal.json`**
   ```json
   {
     "profileImage": "/profile.jpg"
   }
   ```

3. **Commit and push the changes**
   - The website will rebuild automatically

## Important Notes

- **Image will display as a circle** - Make sure your face is centered in the photo
- **Recommended:** Crop your image to square (e.g., 2892 x 2892 px) before uploading for best results
- **File formats:** JPG, PNG, or WebP
- **File size:** Try to keep under 500KB for faster loading
- Leave the path as `""` to keep the placeholder icon

## Example

If you name your file `chandan-profile.jpg` and place it in the `public` folder:

```json
{
  "profileImage": "/chandan-profile.jpg"
}
```

That's it! Your photo will appear in the home section.
