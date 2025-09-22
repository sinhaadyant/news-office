import React from 'react';
import { SkeletonProps } from '@/types';

const SkeletonComments: React.FC<SkeletonProps> = ({
  className = '',
  count = 5,
}) => {
  return (
    <div className={`skeleton-comments ${className}`}>
      <div className='skeleton-comments-header'>
        <div className='skeleton-comments-title' />
      </div>

      <div className='skeleton-comments-list'>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className='skeleton-comment-item'>
            <div className='skeleton-comment-header'>
              <div className='skeleton-comment-avatar' />
              <div className='skeleton-comment-author-info'>
                <div className='skeleton-comment-author-name' />
                <div className='skeleton-comment-date' />
              </div>
            </div>

            <div className='skeleton-comment-content'>
              <div className='skeleton-line mb-2' />
              <div className='skeleton-line mb-2' />
              <div className='skeleton-line' style={{ width: '80%' }} />
            </div>

            {index % 3 === 0 && (
              <div className='skeleton-comment-replies'>
                {Array.from({ length: 2 }).map((_, replyIndex) => (
                  <div key={replyIndex} className='skeleton-comment-reply'>
                    <div className='skeleton-comment-header'>
                      <div
                        className='skeleton-comment-avatar'
                        style={{ width: '32px', height: '32px' }}
                      />
                      <div className='skeleton-comment-author-info'>
                        <div
                          className='skeleton-comment-author-name'
                          style={{ width: '80px' }}
                        />
                        <div
                          className='skeleton-comment-date'
                          style={{ width: '60px' }}
                        />
                      </div>
                    </div>

                    <div className='skeleton-comment-content'>
                      <div className='skeleton-line mb-2' />
                      <div className='skeleton-line' style={{ width: '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .skeleton-comments {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .skeleton-comments-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .skeleton-comments-title {
          height: 28px;
          width: 40%;
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

        .skeleton-comment-item {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .skeleton-comment-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .skeleton-comment-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .skeleton-comment-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .skeleton-comment-author-info {
          flex: 1;
        }

        .skeleton-comment-author-name {
          height: 16px;
          width: 120px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .skeleton-comment-date {
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

        .skeleton-comment-content .skeleton-line {
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

        .skeleton-comment-replies {
          margin-left: 4rem;
          margin-top: 1.5rem;
          padding-left: 1rem;
          border-left: 2px solid #f0f0f0;
        }

        .skeleton-comment-reply {
          margin-bottom: 1.5rem;
        }

        .skeleton-comment-reply:last-child {
          margin-bottom: 0;
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
          .skeleton-comments {
            background: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .skeleton-comments-header {
            border-bottom-color: #4a5568;
          }

          .skeleton-comment-item {
            border-bottom-color: #4a5568;
          }

          .skeleton-comment-replies {
            border-left-color: #4a5568;
          }

          .skeleton-comments-title,
          .skeleton-comment-avatar,
          .skeleton-comment-author-name,
          .skeleton-comment-date,
          .skeleton-comment-content .skeleton-line {
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
          .skeleton-comments {
            padding: 1.5rem;
          }

          .skeleton-comment-replies {
            margin-left: 2rem;
          }

          .skeleton-comment-avatar {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonComments;
