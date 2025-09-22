import React, { useEffect, useCallback } from 'react';
import { useAdBlockModal } from '@/hooks/useAdBlockDetector';

interface AdBlockModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  title?: string;
  message?: string;
  showSubscribeButton?: boolean;
  showDismissButton?: boolean;
  onSubscribe?: () => void;
  className?: string;
}

const AdBlockModal: React.FC<AdBlockModalProps> = ({
  isVisible,
  onDismiss,
  title = 'Ad Blocker Detected',
  message = "We noticed you're using an ad blocker. Please consider supporting us by disabling it or subscribing to continue enjoying our content without ads.",
  showSubscribeButton = true,
  showDismissButton = true,
  onSubscribe,
  className = '',
}) => {
  const { dismissModal } = useAdBlockModal();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    dismissModal();
    onDismiss();
  }, [dismissModal, onDismiss]);

  const handleSubscribe = useCallback(() => {
    onSubscribe?.();
    handleDismiss();
  }, [onSubscribe, handleDismiss]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        handleDismiss();
      }
    },
    [handleDismiss]
  );

  if (!isVisible) return null;

  return (
    <div
      className={`adblock-modal-overlay ${className}`}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby='adblock-modal-title'
      aria-describedby='adblock-modal-description'
    >
      <div className='adblock-modal-container'>
        <div className='adblock-modal-header'>
          <div className='adblock-modal-icon'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                fill='currentColor'
              />
            </svg>
          </div>
          <h3 id='adblock-modal-title' className='adblock-modal-title'>
            {title}
          </h3>
          <button
            className='adblock-modal-close'
            onClick={handleDismiss}
            aria-label='Close modal'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 5L5 15M5 5l10 10'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        <div className='adblock-modal-body'>
          <p id='adblock-modal-description' className='adblock-modal-message'>
            {message}
          </p>

          <div className='adblock-modal-features'>
            <h4>Why support us?</h4>
            <ul>
              <li>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 12l2 2 4-4'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                Support free content and journalism
              </li>
              <li>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 12l2 2 4-4'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                Access all features without interruption
              </li>
              <li>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 12l2 2 4-4'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                Help us keep the lights on!
              </li>
            </ul>
          </div>
        </div>

        <div className='adblock-modal-footer'>
          {showDismissButton && (
            <button
              className='adblock-modal-button adblock-modal-button-secondary'
              onClick={handleDismiss}
            >
              Continue Anyway
            </button>
          )}
          {showSubscribeButton && (
            <button
              className='adblock-modal-button adblock-modal-button-primary'
              onClick={handleSubscribe}
            >
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
                  fill='currentColor'
                />
              </svg>
              Subscribe Now
            </button>
          )}
        </div>

        <div className='adblock-modal-help'>
          <small>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <line
                x1='12'
                y1='17'
                x2='12.01'
                y2='17'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Need help?{' '}
            <a href='/contact' target='_blank' rel='noopener noreferrer'>
              Contact us
            </a>
          </small>
        </div>
      </div>

      <style jsx>{`
        .adblock-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease-in-out;
          padding: 20px;
        }

        .adblock-modal-overlay.adblock-modal-show {
          opacity: 1;
          visibility: visible;
        }

        .adblock-modal-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          transform: scale(0.9) translateY(20px);
          transition: all 0.3s ease-in-out;
          position: relative;
        }

        .adblock-modal-overlay.adblock-modal-show .adblock-modal-container {
          transform: scale(1) translateY(0);
        }

        .adblock-modal-header {
          display: flex;
          align-items: center;
          padding: 24px 24px 16px;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
        }

        .adblock-modal-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: white;
        }

        .adblock-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          flex: 1;
        }

        .adblock-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .adblock-modal-close:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .adblock-modal-body {
          padding: 24px;
        }

        .adblock-modal-message {
          font-size: 1rem;
          line-height: 1.6;
          color: #4b5563;
          margin: 0 0 24px 0;
        }

        .adblock-modal-features h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 16px 0;
        }

        .adblock-modal-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .adblock-modal-features li {
          display: flex;
          align-items: center;
          padding: 8px 0;
          color: #4b5563;
          font-size: 0.875rem;
        }

        .adblock-modal-features li svg {
          margin-right: 12px;
          color: #10b981;
          flex-shrink: 0;
        }

        .adblock-modal-footer {
          display: flex;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          justify-content: flex-end;
        }

        .adblock-modal-button {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
        }

        .adblock-modal-button-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .adblock-modal-button-primary:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-1px);
        }

        .adblock-modal-button-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .adblock-modal-button-secondary:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }

        .adblock-modal-help {
          padding: 16px 24px 24px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }

        .adblock-modal-help small {
          color: #6b7280;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .adblock-modal-help a {
          color: #3b82f6;
          text-decoration: none;
        }

        .adblock-modal-help a:hover {
          text-decoration: underline;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .adblock-modal-container {
            background: #1f2937;
            color: white;
          }

          .adblock-modal-title {
            color: white;
          }

          .adblock-modal-message {
            color: #d1d5db;
          }

          .adblock-modal-features h4 {
            color: white;
          }

          .adblock-modal-features li {
            color: #d1d5db;
          }

          .adblock-modal-close {
            color: #9ca3af;
          }

          .adblock-modal-close:hover {
            background: #374151;
            color: #d1d5db;
          }

          .adblock-modal-button-secondary {
            background: #374151;
            color: #d1d5db;
          }

          .adblock-modal-button-secondary:hover {
            background: #4b5563;
          }

          .adblock-modal-help {
            border-top-color: #374151;
          }

          .adblock-modal-help small {
            color: #9ca3af;
          }
        }

        /* Responsive design */
        @media (max-width: 640px) {
          .adblock-modal-container {
            margin: 16px;
            max-height: calc(100vh - 32px);
          }

          .adblock-modal-header {
            padding: 20px 20px 16px;
          }

          .adblock-modal-body {
            padding: 20px;
          }

          .adblock-modal-footer {
            padding: 16px 20px;
            flex-direction: column;
          }

          .adblock-modal-button {
            justify-content: center;
          }

          .adblock-modal-help {
            padding: 16px 20px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdBlockModal;
