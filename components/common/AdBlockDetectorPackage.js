import React, { useState, useEffect } from 'react';
import { useDetectAdBlock } from 'adblock-detect-react';
import AdBlockWarningModal from './AdBlockWarningModal';

/**
 * AdBlock Detector using the adblock-detect-react package
 * This is an alternative implementation using the npm package
 */
const AdBlockDetectorPackage = ({
  children,
  showWarning = true,
  warningMessage = "We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content.",
  warningTitle = 'Ad Blocker Detected',
  showSubscribeButton = true,
  onSubscribe,
  onAdBlockDetected,
  onAdBlockNotDetected,
  detectionDelay = 200,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [lastDetectionTime, setLastDetectionTime] = useState(null);

  // Use the package's hook
  const isAdBlocked = useDetectAdBlock();

  // Handle detection callbacks
  useEffect(() => {
    if (isAdBlocked) {
      setLastDetectionTime(Date.now());
      onAdBlockDetected?.();

      // Show modal if conditions are met
      if (showWarning && !userDismissed) {
        const timeSinceLastModal = lastDetectionTime
          ? Date.now() - lastDetectionTime
          : Infinity;
        if (timeSinceLastModal > 60000) {
          // 1 minute cooldown
          setShowModal(true);
        }
      }
    } else {
      setShowModal(false);
      onAdBlockNotDetected?.();
    }
  }, [
    isAdBlocked,
    showWarning,
    userDismissed,
    lastDetectionTime,
    onAdBlockDetected,
    onAdBlockNotDetected,
  ]);

  // Handle modal dismissal
  const handleModalDismiss = () => {
    setShowModal(false);
    setUserDismissed(true);

    // Store dismissal in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('adblock-warning-dismissed', 'true');
        localStorage.setItem(
          'adblock-warning-dismissed-time',
          Date.now().toString()
        );
      } catch (error) {
        console.warn(
          'Failed to save adblock dismissal to localStorage:',
          error
        );
      }
    }
  };

  // Handle subscribe button click
  const handleSubscribe = () => {
    onSubscribe?.();
    handleModalDismiss();
  };

  // Check if user previously dismissed the warning
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const dismissed = localStorage.getItem('adblock-warning-dismissed');
      const dismissedTime = localStorage.getItem(
        'adblock-warning-dismissed-time'
      );

      if (dismissed === 'true' && dismissedTime) {
        const timeSinceDismissal = Date.now() - parseInt(dismissedTime);
        // Reset dismissal after 24 hours
        if (timeSinceDismissal > 24 * 60 * 60 * 1000) {
          localStorage.removeItem('adblock-warning-dismissed');
          localStorage.removeItem('adblock-warning-dismissed-time');
          setUserDismissed(false);
        } else {
          setUserDismissed(true);
        }
      }
    } catch (error) {
      console.warn(
        'Failed to check adblock dismissal from localStorage:',
        error
      );
    }
  }, []);

  return (
    <>
      {children}

      {/* AdBlock Warning Modal */}
      {showWarning && (
        <AdBlockWarningModal
          isVisible={showModal && isAdBlocked}
          onDismiss={handleModalDismiss}
          message={warningMessage}
          title={warningTitle}
          showSubscribeButton={showSubscribeButton}
          onSubscribe={handleSubscribe}
        />
      )}
    </>
  );
};

export default AdBlockDetectorPackage;
