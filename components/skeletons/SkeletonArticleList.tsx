import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonArticleList: React.FC<SkeletonProps> = ({
  className = '',
  count = 6,
  variant = 'default',
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'grid':
        return {
          containerClass: 'row',
          itemClass: 'col-lg-4 col-md-6 mb-4',
        };
      case 'list':
        return {
          containerClass: '',
          itemClass: 'mb-4',
        };
      default:
        return {
          containerClass: 'row',
          itemClass: 'col-lg-6 col-md-6 mb-4',
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div
      className={`skeleton-article-list ${config.containerClass} ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={config.itemClass}>
          <div className='skeleton-list-item'>
            {variant === 'list' ? (
              <div className='d-flex'>
                {/* Image skeleton for list variant */}
                <div className='skeleton-image me-3' />
                {/* Content skeleton for list variant */}
                <div className='skeleton-content flex-grow-1'>
                  <div className='skeleton-category mb-2' />
                  <div className='skeleton-title mb-2'>
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line' style={{ width: '70%' }} />
                  </div>
                  <div className='skeleton-excerpt mb-3'>
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line' style={{ width: '85%' }} />
                  </div>
                  <div className='skeleton-meta d-flex justify-content-between'>
                    <div className='skeleton-author' />
                    <div className='skeleton-date' />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Image skeleton for grid variant */}
                <div className='skeleton-image' />
                {/* Content skeleton for grid variant */}
                <div className='skeleton-content p-3'>
                  <div className='skeleton-category mb-2' />
                  <div className='skeleton-title mb-2'>
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line' style={{ width: '60%' }} />
                  </div>
                  <div className='skeleton-excerpt mb-3'>
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line' style={{ width: '80%' }} />
                  </div>
                  <div className='skeleton-meta d-flex justify-content-between'>
                    <div className='skeleton-author' />
                    <div className='skeleton-date' />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .skeleton-list-item {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          height: ${variant === 'list' ? '120px' : 'auto'};
        }

        .skeleton-list-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .skeleton-image {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          height: ${variant === 'list' ? '100px' : '200px'};
          width: ${variant === 'list' ? '150px' : '100%'};
          flex-shrink: 0;
        }

        .skeleton-category {
          height: 16px;
          width: 80px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-title .skeleton-line {
          height: 18px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-excerpt .skeleton-line {
          height: 14px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-author {
          height: 14px;
          width: 100px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-date {
          height: 14px;
          width: 80px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .skeleton-list-item {
            background: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .skeleton-image,
          .skeleton-category,
          .skeleton-title .skeleton-line,
          .skeleton-excerpt .skeleton-line,
          .skeleton-author,
          .skeleton-date {
            background: linear-gradient(
              90deg,
              #4a5568 25%,
              #2d3748 50%,
              #4a5568 75%
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .skeleton-list-item {
            height: ${variant === 'list' ? 'auto' : 'auto'};
          }

          .skeleton-image {
            height: ${variant === 'list' ? '80px' : '200px'};
            width: ${variant === 'list' ? '120px' : '100%'};
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonArticleList;
