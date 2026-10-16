import { useState } from 'react';

const AffiliationLogo = ({ institution }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="text-center text-gray-400 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors text-sm font-serif">
        {institution.name}
      </div>
    );
  }

  return (
    <img
      src={institution.logo}
      alt={institution.name}
      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 dark:group-hover:grayscale-0 dark:grayscale transition-all duration-300 group-hover:scale-105"
      onError={() => setImageError(true)}
    />
  );
};

export default AffiliationLogo;
