import { getGoogleDriveUrl } from './googleDriveUrl'

/**
 * Google Drive API Utilities
 *
 * This module provides functions to interact with Google Drive API
 * to fetch images and videos from a specific folder.
 */

import driveMedia from '../data/googleDriveMedia.json'

/**
 * Returns the pre-fetched Google Drive media data.
 * The data is fetched at build time to avoid exposing the API key on the client side.
 * @returns {Promise<Array>} Array of media items with id, title, type, and googleDriveId
 */
export async function fetchGoogleDriveMedia() {
  // Returns the data imported from the JSON file generated at build time
  if (driveMedia && driveMedia.length > 0) {
    console.log(`Using ${driveMedia.length} media items from pre-fetched Google Drive data`)
    return driveMedia
  }

  return null
}

export { getGoogleDriveUrl }
