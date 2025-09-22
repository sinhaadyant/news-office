import React from 'react';

// Article Card Skeleton
export const ArticleCardSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='col-lg-4 col-sm-6 mb-4'>
          <div className='article-card-skeleton'>
            <div className='skeleton-image'></div>
            <div className='skeleton-content'>
              <div className='skeleton-category'></div>
              <div className='skeleton-title'></div>
              <div className='skeleton-title short'></div>
              <div className='skeleton-meta'>
                <div className='skeleton-author'></div>
                <div className='skeleton-date'></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Sidebar Widget Skeleton
export const SidebarSkeleton = () => {
  return (
    <div className='sidebar-skeleton'>
      <div className='skeleton-widget-title'></div>
      <div className='skeleton-widget-content'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='skeleton-list-item'>
            <div className='skeleton-thumb'></div>
            <div className='skeleton-text'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Article Detail Skeleton
export const ArticleDetailSkeleton = () => {
  return (
    <div className='article-detail-skeleton'>
      <div className='skeleton-article-image'></div>
      <div className='skeleton-article-meta'>
        <div className='skeleton-category'></div>
        <div className='skeleton-author'></div>
        <div className='skeleton-date'></div>
      </div>
      <div className='skeleton-article-title'></div>
      <div className='skeleton-article-content'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='skeleton-paragraph'></div>
        ))}
      </div>
    </div>
  );
};

// Author Info Skeleton
export const AuthorSkeleton = () => {
  return (
    <div className='author-skeleton'>
      <div className='skeleton-avatar'></div>
      <div className='skeleton-author-name'></div>
      <div className='skeleton-author-title'></div>
      <div className='skeleton-author-bio'>
        <div className='skeleton-paragraph'></div>
        <div className='skeleton-paragraph'></div>
      </div>
      <div className='skeleton-author-stats'>
        <div className='skeleton-stat'></div>
        <div className='skeleton-stat'></div>
      </div>
    </div>
  );
};

// Block Section Skeleton
export const BlockSkeleton = ({ type = 'default' }) => {
  const getSkeletonContent = () => {
    switch (type) {
      case 'hero':
        return (
          <div className='hero-skeleton'>
            <div className='skeleton-hero-image'></div>
            <div className='skeleton-hero-content'>
              <div className='skeleton-title large'></div>
              <div className='skeleton-paragraph'></div>
            </div>
          </div>
        );
      case 'slider':
        return (
          <div className='slider-skeleton'>
            <div className='skeleton-slider-nav'></div>
            <div className='skeleton-slider-items'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='skeleton-slider-item'>
                  <div className='skeleton-image'></div>
                  <div className='skeleton-text'></div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className='block-skeleton'>
            <div className='skeleton-block-title'></div>
            <div className='skeleton-block-content'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='skeleton-block-item'>
                  <div className='skeleton-image'></div>
                  <div className='skeleton-text'></div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return <div className='block-skeleton-container'>{getSkeletonContent()}</div>;
};

// Generic Skeleton Components
export const SkeletonText = ({ lines = 1, width = '100%' }) => (
  <div className='skeleton-text-container'>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className='skeleton-text'
        style={{ width: index === lines - 1 ? width : '100%' }}
      ></div>
    ))}
  </div>
);

export const SkeletonImage = ({ width = '100%', height = '200px' }) => (
  <div className='skeleton-image' style={{ width, height }}></div>
);
