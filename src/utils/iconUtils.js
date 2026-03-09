/**
 * Helper function to get an icon from a map by name, with a fallback.
 *
 * @param {string} iconName - The name of the icon to look up
 * @param {Object} iconMap - The mapping of names to icon components/values
 * @param {any} defaultIcon - The default icon to return if not found
 * @returns {any} - The icon from the map or the default icon
 */
export const getIconFromMap = (iconName, iconMap, defaultIcon) => {
  return (iconMap && iconMap[iconName]) || defaultIcon
}
