import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonHero: React.FC<SkeletonProps> = ({
  className = '',
  height = 500,
  width = '100%',
}) => {
  return (
    <div className={`skeleton-hero ${className}`} style={{ width }}>
      <div className='skeleton-hero-container'>
        {/* Main hero image skeleton */}
        <div className='skeleton-hero-image' style={{ height }} />

        {/* Overlay content skeleton */}
        <div className='skeleton-hero-content'>
          <div className='skeleton-hero-category mb-3' />

          <div className='skeleton-hero-title mb-4'>
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line' style={{ width: '70%' }} />
          </div>

          <div className='skeleton-hero-excerpt mb-4'>
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line' style={{ width: '60%' }} />
          </div>

          <div className='skeleton-hero-meta d-flex align-items-center'>
            <div className='skeleton-author-avatar me-3' />
            <div className='skeleton-meta-text'>
              <div className='skeleton-author-name mb-1' />
              <div className='skeleton-publish-date' />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skeleton-hero {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #f8f9fa;
        }

        .skeleton-hero-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .skeleton-hero-image {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          width: 100%;
        }

        .skeleton-hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 2rem;
          color: white;
        }

        .skeleton-hero-category {
          height: 24px;
          width: 120px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.3) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
        }

        .skeleton-hero-title .skeleton-line {
          height: 32px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.4) 25%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.4) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
        }

        .skeleton-hero-excerpt .skeleton-line {
          height: 18px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.3) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.3) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .skeleton-author-name {
          height: 16px;
          width: 120px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.3) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-publish-date {
          height: 14px;
          width: 100px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.3) 75%
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
          .skeleton-hero {
            background: #1a202c;
          }

          .skeleton-hero-image {
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
          .skeleton-hero-content {
            padding: 1.5rem;
          }

          .skeleton-hero-title .skeleton-line {
            height: 28px;
          }

          .skeleton-hero-excerpt .skeleton-line {
            height: 16px;
          }
        }

        @media (max-width: 480px) {
          .skeleton-hero-content {
            padding: 1rem;
          }

          .skeleton-hero-title .skeleton-line {
            height: 24px;
          }

          .skeleton-hero-excerpt .skeleton-line {
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonHero;
