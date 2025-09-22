import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonArticleCard: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'default',
  width,
  height,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          container: 'col-lg-8 col-md-6',
          imageHeight: '400px',
          titleLines: 3,
          excerptLines: 4,
        };
      case 'compact':
        return {
          container: 'col-lg-3 col-md-4 col-sm-6',
          imageHeight: '150px',
          titleLines: 2,
          excerptLines: 2,
        };
      default:
        return {
          container: 'col-lg-4 col-md-6',
          imageHeight: '250px',
          titleLines: 2,
          excerptLines: 3,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} mb-4 ${className}`}>
      <div className='skeleton-article-card'>
        {/* Image skeleton */}
        <div
          className='skeleton-image'
          style={{
            height: height || styles.imageHeight,
            width: width || '100%',
          }}
        />

        {/* Content skeleton */}
        <div className='skeleton-content p-3'>
          {/* Category skeleton */}
          <div className='skeleton-category mb-2' />

          {/* Title skeleton */}
          <div className='skeleton-title mb-2'>
            {Array.from({ length: styles.titleLines }).map((_, i) => (
              <div
                key={i}
                className='skeleton-line'
                style={{
                  width: i === styles.titleLines - 1 ? '60%' : '100%',
                  marginBottom: i < styles.titleLines - 1 ? '0.5rem' : '0',
                }}
              />
            ))}
          </div>

          {/* Excerpt skeleton */}
          <div className='skeleton-excerpt mb-3'>
            {Array.from({ length: styles.excerptLines }).map((_, i) => (
              <div
                key={i}
                className='skeleton-line'
                style={{
                  width: i === styles.excerptLines - 1 ? '80%' : '100%',
                  marginBottom: i < styles.excerptLines - 1 ? '0.5rem' : '0',
                }}
              />
            ))}
          </div>

          {/* Meta skeleton */}
          <div className='skeleton-meta d-flex justify-content-between align-items-center'>
            <div className='skeleton-author' />
            <div className='skeleton-date' />
          </div>
        </div>
      </div>

      <style jsx>{`
        .skeleton-article-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .skeleton-article-card:hover {
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
        }

        .skeleton-category {
          height: 20px;
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
          height: 20px;
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
          height: 16px;
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
          height: 16px;
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
          .skeleton-article-card {
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
      `}</style>
    </div>
  );
};

export default SkeletonArticleCard;
