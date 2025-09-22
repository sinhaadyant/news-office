import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonSidebar: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'default',
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'trending':
        return {
          title: 'Trending Now',
          items: 5,
          showImages: true,
        };
      case 'categories':
        return {
          title: 'Categories',
          items: 8,
          showImages: false,
        };
      case 'newsletter':
        return {
          title: 'Newsletter',
          items: 0,
          showForm: true,
        };
      default:
        return {
          title: 'Popular Posts',
          items: 4,
          showImages: true,
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`skeleton-sidebar ${className}`}>
      <div className='skeleton-sidebar-widget'>
        <div className='skeleton-widget-header'>
          <div className='skeleton-widget-title' />
        </div>

        <div className='skeleton-widget-content'>
          {config.showForm ? (
            <div className='skeleton-newsletter-form'>
              <div className='skeleton-form-text mb-3'>
                <div className='skeleton-line mb-2' />
                <div className='skeleton-line' style={{ width: '80%' }} />
              </div>
              <div className='skeleton-form-input mb-3' />
              <div className='skeleton-form-button' />
            </div>
          ) : (
            Array.from({ length: config.items }).map((_, index) => (
              <div key={index} className='skeleton-sidebar-item'>
                {config.showImages && (
                  <div className='skeleton-sidebar-image' />
                )}
                <div className='skeleton-sidebar-content'>
                  <div className='skeleton-sidebar-title mb-2'>
                    <div className='skeleton-line mb-1' />
                    <div className='skeleton-line' style={{ width: '70%' }} />
                  </div>
                  <div className='skeleton-sidebar-meta'>
                    <div className='skeleton-sidebar-author' />
                    <div className='skeleton-sidebar-date' />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .skeleton-sidebar-widget {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .skeleton-widget-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .skeleton-widget-title {
          height: 24px;
          width: 60%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
        }

        .skeleton-sidebar-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .skeleton-sidebar-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .skeleton-sidebar-image {
          width: 80px;
          height: 60px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .skeleton-sidebar-content {
          flex: 1;
        }

        .skeleton-sidebar-title .skeleton-line {
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

        .skeleton-sidebar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .skeleton-sidebar-author {
          height: 12px;
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

        .skeleton-sidebar-date {
          height: 12px;
          width: 60px;
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

        /* Newsletter form skeleton */
        .skeleton-newsletter-form {
          text-align: center;
        }

        .skeleton-form-text .skeleton-line {
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

        .skeleton-form-input {
          height: 40px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        }

        .skeleton-form-button {
          height: 40px;
          width: 100%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
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
          .skeleton-sidebar-widget {
            background: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .skeleton-widget-header {
            border-bottom-color: #4a5568;
          }

          .skeleton-sidebar-item {
            border-bottom-color: #4a5568;
          }

          .skeleton-widget-title,
          .skeleton-sidebar-image,
          .skeleton-sidebar-title .skeleton-line,
          .skeleton-sidebar-author,
          .skeleton-sidebar-date,
          .skeleton-form-text .skeleton-line,
          .skeleton-form-input,
          .skeleton-form-button {
            background: linear-gradient(
              90deg,
              #4a5568 25%,
              #2d3748 50%,
              #4a5568 75%
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .skeleton-form-input {
            border-color: #4a5568;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .skeleton-sidebar-widget {
            padding: 1rem;
          }

          .skeleton-sidebar-image {
            width: 60px;
            height: 45px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonSidebar;
