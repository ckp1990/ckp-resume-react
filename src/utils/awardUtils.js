export const getAwardItemProps = (award, defaultIcon) => {
  // Support both string format and object format
  const isString = typeof award === 'string';
  const text = isString ? award : award.text;
  const iconName = isString ? defaultIcon : (award.icon || defaultIcon);
  const url = isString ? null : award.url;

  return {
    text,
    iconName,
    url
  };
};
