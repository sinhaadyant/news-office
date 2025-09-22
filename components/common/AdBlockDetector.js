import React, { useState, useEffect, useCallback } from 'react';
import AdBlockWarningModal from './AdBlockWarningModal';

/**
 * Enhanced Ad Block Detector Component
 * Uses multiple detection methods for better reliability
 */
const AdBlockDetector = ({
  children,
  showWarning = true,
  warningMessage = "We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content.",
  warningTitle = 'Ad Blocker Detected',
  showSubscribeButton = true,
  onSubscribe,
  onAdBlockDetected,
  onAdBlockNotDetected,
  detectionDelay = 100,
}) => {
  const [isAdBlocked, setIsAdBlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);

  // Method 1: Create a fake ad element and check if it gets blocked
  const detectByElementBlocking = useCallback(() => {
    return new Promise(resolve => {
      try {
        // Create a test element that looks like an ad
        const testElement = document.createElement('div');
        testElement.id = 'adblock-test-element';
        testElement.className = 'adsbox';
        testElement.style.cssText = `
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          visibility: hidden !important;
          pointer-events: none !important;
        `;

        // Add content that ad blockers typically target
        testElement.innerHTML = '<div class="adsbygoogle"></div>';
        testElement.setAttribute('data-ad', 'true');
        testElement.setAttribute('data-advertisement', 'true');
        testElement.setAttribute('data-adblock', 'true');

        // Insert into DOM
        document.body.appendChild(testElement);

        // Check if element is still there after a short delay
        setTimeout(() => {
          const element = document.getElementById('adblock-test-element');
          const isBlocked =
            !element ||
            element.offsetHeight === 0 ||
            element.offsetWidth === 0 ||
            getComputedStyle(element).display === 'none' ||
            getComputedStyle(element).visibility === 'hidden';

          // Clean up
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }

          resolve(isBlocked);
        }, 50);
      } catch (error) {
        console.warn('Ad block detection method 1 failed:', error);
        resolve(false);
      }
    });
  }, []);

  // Method 2: Try to load a fake ad script
  const detectByScriptBlocking = useCallback(() => {
    return new Promise(resolve => {
      try {
        const script = document.createElement('script');
        script.src = 'data:text/javascript,void(0)';
        script.className = 'adsbygoogle';
        script.setAttribute('data-ad-client', 'ca-pub-test');

        let resolved = false;

        script.onload = () => {
          if (!resolved) {
            resolved = true;
            if (script.parentNode) {
              document.head.removeChild(script);
            }
            resolve(false); // Script loaded, no ad blocker
          }
        };

        script.onerror = () => {
          if (!resolved) {
            resolved = true;
            if (script.parentNode) {
              document.head.removeChild(script);
            }
            resolve(true); // Script blocked, ad blocker detected
          }
        };

        document.head.appendChild(script);

        // Fallback timeout
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            if (script.parentNode) {
              document.head.removeChild(script);
            }
            resolve(false);
          }
        }, 1000);
      } catch (error) {
        console.warn('Ad block detection method 2 failed:', error);
        resolve(false);
      }
    });
  }, []);

  // Method 3: Check for common ad blocker indicators
  const detectByIndicators = useCallback(() => {
    try {
      // Check for common ad blocker variables/functions
      const indicators = [
        // AdBlock Plus
        typeof window.adsbygoogle === 'undefined',
        typeof window.google_ad_client === 'undefined',
        // uBlock Origin
        typeof window.ublock === 'object',
        // AdBlock
        typeof window.adblock === 'object',
        // Check if adsbygoogle script is blocked
        !document.querySelector('script[src*="adsbygoogle"]'),
        // Check for blocked ad elements
        document.querySelectorAll('.adsbygoogle').length === 0,
      ];

      // Count how many indicators suggest ad blocking
      const blockedCount = indicators.filter(Boolean).length;
      const threshold = Math.ceil(indicators.length / 2);

      return blockedCount >= threshold;
    } catch (error) {
      console.warn('Ad block detection method 3 failed:', error);
      return false;
    }
  }, []);

  // Method 4: Try to access blocked resources
  const detectByResourceBlocking = useCallback(() => {
    return new Promise(resolve => {
      try {
        // Try to load a common ad resource
        const img = new Image();
        img.onload = () => resolve(false);
        img.onerror = () => resolve(true);
        img.src =
          'https://pagead2.googlesyndication.com/pagead/images/abg/icon.png';

        // Fallback timeout
        setTimeout(() => resolve(false), 2000);
      } catch (error) {
        console.warn('Ad block detection method 4 failed:', error);
        resolve(false);
      }
    });
  }, []);

  // Main detection function
  const detectAdBlock = useCallback(async () => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsDetecting(true);

    try {
      // Run all detection methods in parallel
      const [
        elementBlocked,
        scriptBlocked,
        indicatorsBlocked,
        resourceBlocked,
      ] = await Promise.all([
        detectByElementBlocking(),
        detectByScriptBlocking(),
        detectByIndicators(),
        detectByResourceBlocking(),
      ]);

      // Consider ad blocker detected if majority of methods agree
      const results = [
        elementBlocked,
        scriptBlocked,
        indicatorsBlocked,
        resourceBlocked,
      ];
      const blockedCount = results.filter(Boolean).length;
      const isAdBlocked = blockedCount >= 2;

      console.log('Ad block detection results:', {
        elementBlocked,
        scriptBlocked,
        indicatorsBlocked,
        resourceBlocked,
        blockedCount,
        isAdBlocked,
      });

      setIsAdBlocked(isAdBlocked);
      setHasDetected(true);
      setIsDetecting(false);

      // Trigger callbacks
      if (isAdBlocked) {
        onAdBlockDetected?.();
        // Show modal if conditions are met
        if (showWarning && !userDismissed) {
          setShowModal(true);
        }
      } else {
        onAdBlockNotDetected?.();
        setShowModal(false);
      }

      return isAdBlocked;
    } catch (error) {
      console.error('Ad block detection failed:', error);
      setIsDetecting(false);
      setHasDetected(true);
      return false;
    }
  }, [
    detectByElementBlocking,
    detectByScriptBlocking,
    detectByIndicators,
    detectByResourceBlocking,
    showWarning,
    userDismissed,
    onAdBlockDetected,
    onAdBlockNotDetected,
  ]);

  // Auto-detect on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const timer = setTimeout(() => {
      detectAdBlock();
    }, detectionDelay);

    return () => clearTimeout(timer);
  }, [detectAdBlock, detectionDelay]);

  // Handle modal dismissal
  const handleModalDismiss = useCallback(() => {
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

  // Retry detection
  const retryDetection = useCallback(() => {
    setHasDetected(false);
    setUserDismissed(false);
    detectAdBlock();
  }, [detectAdBlock]);

  return (
    <>
      {children}

      {/* AdBlock Warning Modal */}
      {showWarning && (
        <AdBlockWarningModal
          isVisible={showModal && isAdBlocked && hasDetected}
          onDismiss={handleModalDismiss}
          message={warningMessage}
          title={warningTitle}
          showSubscribeButton={showSubscribeButton}
          onSubscribe={handleSubscribe}
          isDetecting={isDetecting}
          onRetry={retryDetection}
        />
      )}
    </>
  );
};

export default AdBlockDetector;


