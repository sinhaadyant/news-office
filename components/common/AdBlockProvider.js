import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useAdBlockDetector } from '@/hooks/useAdBlockDetector';
import AdBlockWarningModal from './AdBlockWarningModal';

// Create context
const AdBlockContext = createContext(null);

/**
 * Custom hook to use AdBlock context
 */
export const useAdBlock = () => {
  const context = useContext(AdBlockContext);
  if (!context) {
    throw new Error('useAdBlock must be used within an AdBlockProvider');
  }
  return context;
};

/**
 * AdBlock Provider Component
 * Manages global ad block detection state and provides context to child components
 */
export const AdBlockProvider = ({
  children,
  options = {},
  showWarning = true,
  warningMessage = "We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content.",
  warningTitle = 'Ad Blocker Detected',
  showSubscribeButton = true,
  onSubscribe,
  onAdBlockDetected,
  onAdBlockNotDetected,
}) => {
  // Local state for modal visibility
  const [showModal, setShowModal] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [lastDetectionTime, setLastDetectionTime] = useState(null);

  // Enhanced detection options
  const detectionOptions = {
    ...options,
    onAdBlockDetected: useCallback(() => {
      setLastDetectionTime(Date.now());
      onAdBlockDetected?.();

      // Show modal if conditions are met
      if (showWarning && !userDismissed) {
        // Check if enough time has passed since last modal (avoid spam)
        const timeSinceLastModal = lastDetectionTime
          ? Date.now() - lastDetectionTime
          : Infinity;
        if (timeSinceLastModal > 60000) {
          // 1 minute cooldown
          setShowModal(true);
        }
      }
    }, [showWarning, userDismissed, lastDetectionTime, onAdBlockDetected]),

    onAdBlockNotDetected: useCallback(() => {
      setShowModal(false);
      onAdBlockNotDetected?.();
    }, [onAdBlockNotDetected]),
  };

  // Use the ad block detector hook
  const adBlockState = useAdBlockDetector(detectionOptions);

  // Handle modal dismissal
  const handleModalDismiss = useCallback(() => {
    setShowModal(false);
    setUserDismissed(true);

    // Store dismissal in localStorage to persist across sessions
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
  }, []);

  // Handle subscribe button click
  const handleSubscribe = useCallback(() => {
    onSubscribe?.();
    handleModalDismiss();
  }, [onSubscribe, handleModalDismiss]);

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

  // Force show modal (for testing or manual triggers)
  const forceShowModal = useCallback(() => {
    setShowModal(true);
    setUserDismissed(false);
  }, []);

  // Reset dismissal state
  const resetDismissal = useCallback(() => {
    setUserDismissed(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('adblock-warning-dismissed');
        localStorage.removeItem('adblock-warning-dismissed-time');
      } catch (error) {
        console.warn(
          'Failed to reset adblock dismissal from localStorage:',
          error
        );
      }
    }
  }, []);

  // Context value
  const contextValue = {
    // Detection state
    isAdBlocked: adBlockState.isAdBlocked,
    isDetecting: adBlockState.isDetecting,
    hasDetected: adBlockState.hasDetected,
    error: adBlockState.error,

    // Modal state
    showModal,
    userDismissed,

    // Actions
    detectAdBlock: adBlockState.detectAdBlock,
    retryDetection: adBlockState.retryDetection,
    dismissModal: handleModalDismiss,
    forceShowModal,
    resetDismissal,

    // Configuration
    showWarning,
    warningMessage,
    warningTitle,
    showSubscribeButton,
  };

  return (
    <AdBlockContext.Provider value={contextValue}>
      {children}

      {/* AdBlock Warning Modal */}
      {showWarning && (
        <AdBlockWarningModal
          isVisible={showModal && adBlockState.isAdBlocked}
          onDismiss={handleModalDismiss}
          message={warningMessage}
          title={warningTitle}
          showSubscribeButton={showSubscribeButton}
          onSubscribe={handleSubscribe}
        />
      )}
    </AdBlockContext.Provider>
  );
};

export default AdBlockProvider;
