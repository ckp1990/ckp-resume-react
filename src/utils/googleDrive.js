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

/**
 * Gets the display URL for a Google Drive file
 * @param {string} fileId - Google Drive file ID
 * @param {string} type - Media type ('image' or 'video')
 * @returns {string|null} URL to display the media
 */
export function getGoogleDriveUrl(fileId, type) {
  if (!fileId) return null

  if (type === 'image') {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
  } else if (type === 'video') {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  return null
}
