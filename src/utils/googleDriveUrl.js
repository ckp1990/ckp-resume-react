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
