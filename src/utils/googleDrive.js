import { getGoogleDriveUrl } from './googleDriveUrl'

/**
 * Google Drive API Utilities
 *
 * This module provides functions to interact with Google Drive API
 * to fetch images and videos from a specific folder.
 */

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID

/**
 * Fetches all image and video files from a Google Drive folder
 * @returns {Promise<Array>} Array of media items with id, title, type, and googleDriveId
 */
export async function fetchGoogleDriveMedia() {
  // Check if API key and folder ID are configured
  if (!API_KEY || !FOLDER_ID) {
    console.warn('Google Drive API key or folder ID not configured. Using fallback data.')
    return null
  }

  try {
    // Supported image MIME types
    const imageMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/svg+xml'
    ]

    // Supported video MIME types
    const videoMimeTypes = [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    ]

    // Build query to get all images and videos from the folder
    const allMediaTypes = [...imageMimeTypes, ...videoMimeTypes]
    const mimeQuery = allMediaTypes.map(type => `mimeType='${type}'`).join(' or ')
    const query = `'${FOLDER_ID}' in parents and (${mimeQuery}) and trashed=false`

    // Build the API URL
    const apiUrl = new URL('https://www.googleapis.com/drive/v3/files')
    apiUrl.searchParams.append('q', query)
    apiUrl.searchParams.append('key', API_KEY)
    apiUrl.searchParams.append('fields', 'files(id,name,mimeType,createdTime,description)')
    apiUrl.searchParams.append('orderBy', 'createdTime desc')
    apiUrl.searchParams.append('pageSize', '100') // Get up to 100 files

    // Fetch data from Google Drive API
    const response = await fetch(apiUrl.toString())

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Google Drive API error:', response.status, errorData)
      throw new Error(`Google Drive API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.files || data.files.length === 0) {
      console.warn('No media files found in the Google Drive folder.')
      return []
    }

    // Transform Google Drive files into our media format
    const mediaItems = data.files.map((file, index) => {
      // Determine media type
      const isVideo = videoMimeTypes.includes(file.mimeType)
      const type = isVideo ? 'video' : 'image'

      // Use file name as title (remove extension)
      const title = file.name.replace(/\.[^/.]+$/, '')

      return {
        id: index + 1,
        title: title,
        description: file.description || '',
        type: type,
        googleDriveId: file.id,
        category: 'Photos' // You can modify this logic if you want to categorize by folder structure
      }
    })

    console.log(`Successfully fetched ${mediaItems.length} media items from Google Drive`)
    return mediaItems

  } catch (error) {
    console.error('Error fetching Google Drive media:', error)
    return null
  }
}

export { getGoogleDriveUrl }
