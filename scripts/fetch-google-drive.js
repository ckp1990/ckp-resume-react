import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Script to fetch Google Drive media data at build time.
 * This prevents exposing the API key on the client side.
 */
async function fetchGoogleDriveMedia() {
  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID

  const outputPath = path.resolve(__dirname, '../src/data/googleDriveMedia.json')

  // If no credentials, create an empty file if it doesn't exist and exit
  if (!API_KEY || !FOLDER_ID) {
    console.warn('⚠️ Google Drive API key or folder ID not found in environment. Ensure GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_FOLDER_ID are set.')
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
      console.log('Created empty googleDriveMedia.json placeholder.')
    }
    return
  }

  console.log(`🚀 Fetching media from Google Drive folder: ${FOLDER_ID}...`)

  try {
    // Supported MIME types
    const imageMimeTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
      'image/heic', 'image/heif'
    ]
    const videoMimeTypes = [
      'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ]

    let allFiles = []
    let nextPageToken = null
    let pageCount = 0

    // Pagination loop
    do {
      const apiUrl = new URL('https://www.googleapis.com/drive/v3/files')
      // Fetch all non-trashed files in the folder (we filter by MIME type later for better logging)
      const query = `'${FOLDER_ID}' in parents and trashed=false`

      apiUrl.searchParams.append('q', query)
      apiUrl.searchParams.append('key', API_KEY)
      apiUrl.searchParams.append('fields', 'nextPageToken, files(id,name,mimeType,createdTime,description)')
      apiUrl.searchParams.append('orderBy', 'createdTime desc')
      apiUrl.searchParams.append('pageSize', '100') // Max per page

      if (nextPageToken) {
        apiUrl.searchParams.append('pageToken', nextPageToken)
      }

      const response = await fetch(apiUrl.toString())

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Google Drive API error:', response.status, errorData)

        // If we fail on the first page, we can't do much.
        // If we fail on subsequent pages, we might want to keep what we have, but for now we'll just log and continue if possible or break.
        if (allFiles.length > 0) {
            console.warn('⚠️ Partial fetch due to error on page ' + (pageCount + 1))
            break
        }

        if (!fs.existsSync(outputPath)) {
          fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
        }
        return
      }

      const data = await response.json()
      const files = data.files || []
      allFiles = allFiles.concat(files)
      nextPageToken = data.nextPageToken
      pageCount++
      console.log(`  Fetched page ${pageCount}: ${files.length} files found.`)

    } while (nextPageToken)

    console.log(`✅ Total files found in folder: ${allFiles.length}`)

    if (allFiles.length === 0) {
      console.warn('⚠️ No files found in the Google Drive folder.')
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
      return
    }

    // Filter and transform data
    const mediaItems = []
    let skippedCount = 0
    const skippedTypes = {}

    allFiles.forEach((file) => {
      const isImage = imageMimeTypes.includes(file.mimeType)
      const isVideo = videoMimeTypes.includes(file.mimeType)

      if (isImage || isVideo) {
        const type = isVideo ? 'video' : 'image'
        // Remove file extension for title display
        const title = file.name.replace(/\.[^/.]+$/, '')

        mediaItems.push({
          id: mediaItems.length + 1, // strict sequential ID for the filtered list
          title: title,
          description: file.description || '',
          type: type,
          googleDriveId: file.id,
          category: 'Photos'
        })
      } else {
        skippedCount++
        skippedTypes[file.mimeType] = (skippedTypes[file.mimeType] || 0) + 1
      }
    })

    if (skippedCount > 0) {
      console.log(`ℹ️ Skipped ${skippedCount} files not matching allowed MIME types:`)
      Object.entries(skippedTypes).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count}`)
      })
    }

    fs.writeFileSync(outputPath, JSON.stringify(mediaItems, null, 2))
    console.log(`✅ Successfully processed ${mediaItems.length} valid media items and saved to googleDriveMedia.json`)

  } catch (error) {
    console.error('❌ Error fetching Google Drive media:', error)
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
    }
  }
}

fetchGoogleDriveMedia()
