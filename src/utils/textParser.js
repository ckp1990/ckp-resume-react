import React from 'react';

/**
 * Helper function to parse HTML tags (<strong>, <em>, <code>) in text
 * and return React elements.
 *
 * @param {string} text - The text to parse
 * @returns {Array|null} - Array of React elements and strings
 */
export const parseText = (text) => {
  return parseTextWithReact(text, React);
};

/**
 * Internal version of parseText that allows providing a React-like instance for testing.
 *
 * @param {string} text - The text to parse
 * @param {object} ReactInstance - Object with createElement method
 * @returns {Array|null} - Array of elements and strings
 */
export const parseTextWithReact = (text, ReactInstance) => {
  if (!text) return null;

  let nodes = [text];

  const tagConfigs = [
    { tag: 'strong', className: 'font-semibold dark:text-red-500' },
    { tag: 'em', className: 'text-gray-700 italic dark:text-red-400' },
    { tag: 'code', className: 'font-mono font-semibold dark:text-red-500' }
  ];

  tagConfigs.forEach(({ tag, className }) => {
    const regex = new RegExp(`(<${tag}>.*?<\\/${tag}>)`, 'g');
    const openTag = `<${tag}>`;
    const closeTag = `</${tag}>`;
    const replaceRegex = new RegExp(`(<\\/?${tag}>)`, 'g');

    nodes = nodes.flatMap((node, index) => {
      if (typeof node !== 'string') return node;
      const parts = node.split(regex);
      return parts.map((part, i) => {
        if (part.startsWith(openTag) && part.endsWith(closeTag)) {
          const content = part.replace(replaceRegex, '');
          return ReactInstance.createElement('span', {
            key: `${tag}-${index}-${i}`,
            className: className
          }, content);
        }
        return part;
      });
    });
  });

  return nodes.filter(node => node !== '');
};
