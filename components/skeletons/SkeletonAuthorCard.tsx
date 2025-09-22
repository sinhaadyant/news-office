import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonAuthorCard: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
}) => {
  return (
    <div
      className={`skeleton-author-card ${className}`}
      style={{ width, height }}
    >
      <div className='skeleton-author-content'>
        {/* Avatar skeleton */}
        <div className='skeleton-author-avatar' />

        {/* Author info skeleton */}
        <div className='skeleton-author-info'>
          <div className='skeleton-author-name mb-2' />
          <div className='skeleton-author-title mb-3' />
          <div className='skeleton-author-bio'>
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line mb-2' />
            <div className='skeleton-line' style={{ width: '70%' }} />
          </div>
        </div>

        {/* Social links skeleton */}
        <div className='skeleton-social-links'>
          <div className='skeleton-social-item' />
          <div className='skeleton-social-item' />
          <div className='skeleton-social-item' />
        </div>
      </div>

      <style jsx>{`
        .skeleton-author-card {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .skeleton-author-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .skeleton-author-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          margin: 0 auto 1.5rem;
        }

        .skeleton-author-name {
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
          margin: 0 auto;
        }

        .skeleton-author-title {
          height: 18px;
          width: 40%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin: 0 auto;
        }

        .skeleton-author-bio .skeleton-line {
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

        .skeleton-social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .skeleton-social-item {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
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
          .skeleton-author-card {
            background: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .skeleton-author-avatar,
          .skeleton-author-name,
          .skeleton-author-title,
          .skeleton-author-bio .skeleton-line,
          .skeleton-social-item {
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
          .skeleton-author-card {
            padding: 1.5rem;
          }

          .skeleton-author-avatar {
            width: 100px;
            height: 100px;
          }

          .skeleton-social-links {
            gap: 0.75rem;
          }

          .skeleton-social-item {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonAuthorCard;
