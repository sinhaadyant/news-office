import React from 'react';

const RichContentRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div 
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichContentRenderer;
