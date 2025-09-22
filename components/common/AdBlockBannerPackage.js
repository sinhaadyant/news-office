import React from "react";
import { useDetectAdBlock } from "adblock-detect-react";

/**
 * AdBlock Banner Component using adblock-detect-react package
 * Shows a subtle banner when ad blocker is detected
 */
export const AdBlockBannerPackage = ({
  message = "Please consider supporting us by disabling your ad blocker.",
  className = "",
  onDismiss,
  showDismiss = true,
  ...props
}) => {
  const isAdBlocked = useDetectAdBlock();

  if (!isAdBlocked) {
    return null;
  }

  const handleDismiss = () => {
    onDismiss?.();
  };

  const handleSubscribe = () => {
    // Trigger the main modal (this will be handled by the global provider)
    // For now, we'll just log or redirect
    window.open("/subscribe", "_blank");
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
 * AdBlock Debug Component using package
 * Shows ad block detection status (for development/testing)
 */
export const AdBlockDebugPackage = ({ className = "" }) => {
  const isAdBlocked = useDetectAdBlock();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className={`adblock-debug ${className}`}>
      <h4>AdBlock Detection Debug (Package)</h4>
      <div className="debug-info">
        <p>
          <strong>Status:</strong> {isAdBlocked ? "Blocked" : "Not Blocked"}
        </p>
        <p>
          <strong>Package:</strong> adblock-detect-react
        </p>
      </div>
    </div>
  );
};

export default AdBlockBannerPackage;
