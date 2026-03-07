import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getIcon } from '../utils/iconMap';
import { getAwardItemProps } from '../utils/awardUtils';

const AwardItem = ({ award, defaultIcon }) => {
  const { text, iconName, url } = getAwardItemProps(award, defaultIcon);
  const IconComponent = getIcon(iconName);

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-colors duration-300">
      <div className="flex items-start gap-3">
        <IconComponent className="text-blue-900 dark:text-blue-400 text-2xl flex-shrink-0" />
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-900 dark:text-blue-400 hover:underline text-lg flex items-center gap-2 flex-1"
          >
            <span>{text}</span>
            <FaExternalLinkAlt className="text-sm flex-shrink-0" />
          </a>
        ) : (
          <span className="text-black dark:text-red-500 text-lg">{text}</span>
        )}
      </div>
    </div>
  );
};

export default AwardItem;
