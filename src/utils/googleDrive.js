import { getGoogleDriveUrl } from './googleDriveUrl.js'
import driveMedia from '../data/googleDriveMedia.json' with { type: 'json' }

/**
 * Google Drive API Utilities
 *
 * This module provides functions to interact with Google Drive API
 * to fetch images and videos from a specific folder.
 */

/**
 * Internal function to handle the logic of fetching Google Drive media.
 * This allows for easier testing by passing in mock data.
 * @param {Array} data - The media data to process
 * @returns {Array|null} Processed media items or null
 */
export function fetchGoogleDriveMediaInternal(data) {
  if (data && data.length > 0) {
    console.log(`Using ${data.length} media items from pre-fetched Google Drive data`)
    return data
  }
  return null
}

/**
 * Returns the pre-fetched Google Drive media data.
 * The data is fetched at build time to avoid exposing the API key on the client side.
 * @returns {Promise<Array|null>} Array of media items with id, title, type, and googleDriveId
 */
export async function fetchGoogleDriveMedia() {
  // Returns the data imported from the JSON file generated at build time
  return fetchGoogleDriveMediaInternal(driveMedia)
}

export { getGoogleDriveUrl }
