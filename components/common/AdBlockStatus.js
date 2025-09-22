import React from "react";
import { useAdBlock } from "./AdBlockProvider";

/**
 * AdBlock Status Component
 * Can be used to conditionally render content based on ad block detection
 */
const AdBlockStatus = ({
  children,
  fallback = null,
  showWhenBlocked = false,
  className = "",
  ...props
}) => {
  const { isAdBlocked, isDetecting, hasDetected } = useAdBlock();

  // Don't render anything while detecting
  if (isDetecting) {
    return null;
  }

  // Don't render if detection hasn't completed
  if (!hasDetected) {
    return null;
  }

  // Show content based on ad block status
  const shouldShow = showWhenBlocked ? isAdBlocked : !isAdBlocked;

  if (shouldShow) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return fallback;
};

/**
 * AdBlock Banner Component
 * Shows a subtle banner when ad blocker is detected
 */
export const AdBlockBanner = ({
  message = "Please consider supporting us by disabling your ad blocker.",
  className = "",
  onDismiss,
  showDismiss = true,
  ...props
}) => {
  const { isAdBlocked, forceShowModal } = useAdBlock();

  if (!isAdBlocked) {
    return null;
  }

  const handleDismiss = () => {
    onDismiss?.();
  };

  const handleSubscribe = () => {
    forceShowModal();
  };

  return (
    <div className={`adblock-banner ${className}`} {...props}>
      <div className="adblock-banner-content">
        <div className="adblock-banner-message">
          <i className="fas fa-info-circle me-2"></i>
          {message}
        </div>
        <div className="adblock-banner-actions">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={handleSubscribe}
          >
            Learn More
          </button>
          {showDismiss && (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * AdBlock Debug Component
 * Shows ad block detection status (for development/testing)
 */
export const AdBlockDebug = ({ className = "" }) => {
  const {
    isAdBlocked,
    isDetecting,
    hasDetected,
    error,
    detectAdBlock,
    retryDetection,
  } = useAdBlock();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className={`adblock-debug ${className}`}>
      <h4>AdBlock Detection Debug</h4>
      <div className="debug-info">
        <p>
          <strong>Status:</strong>{" "}
          {isDetecting
            ? "Detecting..."
            : hasDetected
            ? isAdBlocked
              ? "Blocked"
              : "Not Blocked"
            : "Not Started"}
        </p>
        {error && (
          <p>
            <strong>Error:</strong> {error}
          </p>
        )}
        <div className="debug-actions">
          <button
            onClick={detectAdBlock}
            className="btn btn-sm btn-primary me-2"
          >
            Detect Now
          </button>
          <button onClick={retryDetection} className="btn btn-sm btn-secondary">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBlockStatus;
export { AdBlockStatus };
