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

  // Pass 1: Handle <strong> tags
  nodes = nodes.flatMap((node, index) => {
    if (typeof node !== 'string') return node;
    const parts = node.split(/(<strong>.*?<\/strong>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const content = part.replace(/<\/?strong>/g, '');
        return ReactInstance.createElement('span', {
          key: `strong-${index}-${i}`,
          className: 'font-semibold dark:text-red-500'
        }, content);
      }
      return part;
    });
  });

  // Pass 2: Handle <em> tags
  nodes = nodes.flatMap((node, index) => {
    if (typeof node !== 'string') return node;
    const parts = node.split(/(<em>.*?<\/em>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<em>') && part.endsWith('</em>')) {
        const content = part.replace(/<\/?em>/g, '');
        return ReactInstance.createElement('span', {
          key: `em-${index}-${i}`,
          className: 'text-gray-700 italic dark:text-red-400'
        }, content);
      }
      return part;
    });
  });

  // Pass 3: Handle <code> tags
  nodes = nodes.flatMap((node, index) => {
    if (typeof node !== 'string') return node;
    const parts = node.split(/(<code>.*?<\/code>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<code>') && part.endsWith('</code>')) {
        const content = part.replace(/<\/?code>/g, '');
        return ReactInstance.createElement('span', {
          key: `code-${index}-${i}`,
          className: 'font-mono font-semibold dark:text-red-500'
        }, content);
      }
      return part;
    });
  });

  return nodes.filter(node => node !== '');
};
