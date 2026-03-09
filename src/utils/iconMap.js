import { FaTrophy, FaAward, FaMedal, FaStar, FaCertificate } from 'react-icons/fa'
import { getIconFromMap } from './iconUtils.js'

// Icon mapping for awards
const iconMap = {
  'FaTrophy': FaTrophy,
  'FaAward': FaAward,
  'FaMedal': FaMedal,
  'FaStar': FaStar,
  'FaCertificate': FaCertificate
}

// Helper function to get icon component by name
export const getIcon = (iconName) => {
  return getIconFromMap(iconName, iconMap, FaTrophy)
}
