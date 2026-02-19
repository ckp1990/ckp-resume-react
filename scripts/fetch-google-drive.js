import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Script to fetch Google Drive media data at build time.
 * This prevents exposing the API key on the client side.
 */
async function fetchGoogleDriveMedia() {
  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY || process.env.VITE_GOOGLE_DRIVE_API_KEY
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.VITE_GOOGLE_DRIVE_FOLDER_ID

  const outputPath = path.resolve(__dirname, '../src/data/googleDriveMedia.json')

  // If no credentials, create an empty file if it doesn't exist and exit
  if (!API_KEY || !FOLDER_ID) {
    console.warn('⚠️ Google Drive API key or folder ID not found in environment.')
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
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'
    ]
    const videoMimeTypes = [
      'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ]

    const allMediaTypes = [...imageMimeTypes, ...videoMimeTypes]
    const mimeQuery = allMediaTypes.map(type => `mimeType='${type}'`).join(' or ')
    const query = `'${FOLDER_ID}' in parents and (${mimeQuery}) and trashed=false`

    const apiUrl = new URL('https://www.googleapis.com/drive/v3/files')
    apiUrl.searchParams.append('q', query)
    apiUrl.searchParams.append('key', API_KEY)
    apiUrl.searchParams.append('fields', 'files(id,name,mimeType,createdTime,description)')
    apiUrl.searchParams.append('orderBy', 'createdTime desc')
    apiUrl.searchParams.append('pageSize', '100')

    const response = await fetch(apiUrl.toString())

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Google Drive API error:', response.status, errorData)
      // Don't fail the build, just use what's there or empty
      if (!fs.existsSync(outputPath)) {
        fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
      }
      return
    }

    const data = await response.json()

    if (!data.files || data.files.length === 0) {
      console.warn('⚠️ No media files found in the Google Drive folder.')
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
      return
    }

    // Transform data
    const mediaItems = data.files.map((file, index) => {
      const isVideo = videoMimeTypes.includes(file.mimeType)
      const type = isVideo ? 'video' : 'image'
      const title = file.name.replace(/\.[^/.]+$/, '')

      return {
        id: index + 1,
        title: title,
        description: file.description || '',
        type: type,
        googleDriveId: file.id,
        category: 'Photos'
      }
    })

    fs.writeFileSync(outputPath, JSON.stringify(mediaItems, null, 2))
    console.log(`✅ Successfully fetched ${mediaItems.length} media items and saved to googleDriveMedia.json`)

  } catch (error) {
    console.error('❌ Error fetching Google Drive media:', error)
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
    }
  }
}

fetchGoogleDriveMedia()
