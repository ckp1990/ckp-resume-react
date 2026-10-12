import { FaTrophy, FaAward, FaMedal, FaStar, FaCertificate } from 'react-icons/fa'

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
  const IconComponent = iconMap[iconName] || FaTrophy
  return IconComponent
}
