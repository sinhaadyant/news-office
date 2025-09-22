import React, { useState, useEffect } from 'react';

/**
 * AdBlock Warning Modal Component
 * Displays a dismissible modal when ad blocker is detected
 */
const AdBlockWarningModal = ({
  isVisible = false,
  onDismiss,
  message = "We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content.",
  title = 'Ad Blocker Detected',
  showSubscribeButton = true,
  onSubscribe,
  isDetecting = false,
  onRetry,
  className = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure smooth animation
      setTimeout(() => setIsAnimating(true), 10);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Restore body scroll
      document.body.style.overflow = 'unset';
      // Remove from DOM after animation
      setTimeout(() => setShouldRender(false), 300);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isVisible) {
        onDismiss();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, onDismiss]);

  if (!shouldRender) {
    return null;
  }

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  };

  const handleSubscribe = () => {
    onSubscribe?.();
    onDismiss();
  };

  return (
    <div
      className={`adblock-modal-overlay ${
        isAnimating ? 'adblock-modal-show' : ''
      } ${className}`}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby='adblock-modal-title'
      aria-describedby='adblock-modal-description'
    >
      <div className='adblock-modal-container'>
        <div className='adblock-modal-header'>
          <div className='adblock-modal-icon'>
            <i className='fas fa-shield-alt text-warning'></i>
          </div>
          <h3 id='adblock-modal-title' className='adblock-modal-title'>
            {title}
          </h3>
          <button
            className='adblock-modal-close'
            onClick={onDismiss}
            aria-label='Close modal'
            type='button'
          >
            <i className='fas fa-times'></i>
          </button>
        </div>

        <div className='adblock-modal-body'>
          <p id='adblock-modal-description' className='adblock-modal-message'>
            {message}
          </p>

          <div className='adblock-modal-features'>
            <h4>Why we need ad revenue:</h4>
            <ul>
              <li>
                <i className='fas fa-check text-success me-2'></i>
                Keep our content free for everyone
              </li>
              <li>
                <i className='fas fa-check text-success me-2'></i>
                Support our journalists and writers
              </li>
              <li>
                <i className='fas fa-check text-success me-2'></i>
                Maintain our servers and technology
              </li>
              <li>
                <i className='fas fa-check text-success me-2'></i>
                Bring you the latest news and updates
              </li>
            </ul>
          </div>
        </div>

        <div className='adblock-modal-footer'>
          {onRetry && (
            <button
              className='btn btn-outline-info me-2'
              onClick={onRetry}
              disabled={isDetecting}
              type='button'
            >
              <i
                className={`fas ${isDetecting ? 'fa-spinner fa-spin' : 'fa-redo'} me-2`}
              ></i>
              {isDetecting ? 'Testing...' : 'Test Again'}
            </button>
          )}

          <button
            className='btn btn-outline-secondary me-2'
            onClick={onDismiss}
            type='button'
          >
            <i className='fas fa-times me-2'></i>
            Continue Anyway
          </button>

          {showSubscribeButton && (
            <button
              className='btn btn-primary'
              onClick={handleSubscribe}
              type='button'
            >
              <i className='fas fa-star me-2'></i>
              Subscribe Now
            </button>
          )}
        </div>

        <div className='adblock-modal-help'>
          <small className='text-muted'>
            <i className='fas fa-info-circle me-1'></i>
            Need help?{' '}
            <a href='/contact' target='_blank' rel='noopener noreferrer'>
              Contact us
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdBlockWarningModal;
