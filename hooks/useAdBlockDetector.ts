import { useState, useEffect, useCallback, useRef } from 'react';
import { UseAdBlockDetectorReturn } from '@/types';

interface UseAdBlockDetectorOptions {
  testElementId?: string;
  testElementClass?: string;
  detectionDelay?: number;
  retryAttempts?: number;
  retryDelay?: number;
  onDetected?: () => void;
  onNotDetected?: () => void;
  persistResult?: boolean;
  storageKey?: string;
}

export function useAdBlockDetector({
  testElementId = 'ads-test-element',
  testElementClass = 'adsbox',
  detectionDelay = 100,
  retryAttempts = 3,
  retryDelay = 1000,
  onDetected,
  onNotDetected,
  persistResult = true,
  storageKey = 'adblock-detection-result',
}: UseAdBlockDetectorOptions = {}): UseAdBlockDetectorReturn {
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);
  const [isTested, setIsTested] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load persisted result
  useEffect(() => {
    if (persistResult && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const { result, timestamp } = JSON.parse(stored);
          const isRecent = Date.now() - timestamp < 24 * 60 * 60 * 1000; // 24 hours

          if (isRecent) {
            setIsAdBlockActive(result);
            setIsTested(true);
            return;
          } else {
            // Remove expired result
            localStorage.removeItem(storageKey);
          }
        }
      } catch (err) {
        console.warn('Failed to load adblock detection result:', err);
      }
    }
  }, [persistResult, storageKey]);

  // Save result to localStorage
  const saveResult = useCallback(
    (result: boolean) => {
      if (persistResult && typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              result,
              timestamp: Date.now(),
            })
          );
        } catch (err) {
          console.warn('Failed to save adblock detection result:', err);
        }
      }
    },
    [persistResult, storageKey]
  );

  // Create test element
  const createTestElement = useCallback((): HTMLDivElement => {
    const element = document.createElement('div');
    element.id = testElementId;
    element.className = testElementClass;
    element.style.cssText = `
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      width: 1px !important;
      height: 1px !important;
      visibility: hidden !important;
      pointer-events: none !important;
    `;

    // Add content that ad blockers typically target
    element.innerHTML = '&nbsp;';
    element.setAttribute('data-ad', 'true');
    element.setAttribute('data-advertisement', 'true');
    element.setAttribute('data-adblock', 'true');

    return element;
  }, [testElementId, testElementClass]);

  // Perform detection
  const performDetection = useCallback((): boolean => {
    try {
      // Create and append test element
      const testElement = createTestElement();
      document.body.appendChild(testElement);

      // Check if element is hidden or removed
      const isHidden =
        testElement.offsetHeight === 0 ||
        testElement.offsetWidth === 0 ||
        testElement.style.display === 'none' ||
        testElement.style.visibility === 'hidden';

      // Check computed styles
      const computedStyle = window.getComputedStyle(testElement);
      const isBlocked =
        isHidden ||
        computedStyle.display === 'none' ||
        computedStyle.visibility === 'hidden' ||
        computedStyle.height === '0px' ||
        computedStyle.width === '0px';

      // Clean up test element
      document.body.removeChild(testElement);

      return isBlocked;
    } catch (err) {
      console.warn('Adblock detection failed:', err);
      setError(err instanceof Error ? err.message : 'Detection failed');
      return false;
    }
  }, [createTestElement]);

  // Main detection function
  const detectAdBlock = useCallback(async (): Promise<boolean> => {
    return new Promise(resolve => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const result = performDetection();
        resolve(result);
      }, detectionDelay);
    });
  }, [performDetection, detectionDelay]);

  // Retry detection with exponential backoff
  const retryDetection = useCallback(async () => {
    if (retryCount >= retryAttempts) {
      setError('Max retry attempts reached');
      return;
    }

    setRetryCount(prev => prev + 1);
    setError(null);

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    retryTimeoutRef.current = setTimeout(
      async () => {
        try {
          const result = await detectAdBlock();
          setIsAdBlockActive(result);
          setIsTested(true);
          saveResult(result);

          if (result) {
            onDetected?.();
          } else {
            onNotDetected?.();
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Detection failed');
          // Retry again if not at max attempts
          if (retryCount < retryAttempts - 1) {
            retryDetection();
          }
        }
      },
      retryDelay * Math.pow(2, retryCount)
    );
  }, [
    retryCount,
    retryAttempts,
    retryDelay,
    detectAdBlock,
    saveResult,
    onDetected,
    onNotDetected,
  ]);

  // Initial detection
  useEffect(() => {
    if (!isTested && typeof window !== 'undefined') {
      detectAdBlock()
        .then(result => {
          setIsAdBlockActive(result);
          setIsTested(true);
          saveResult(result);

          if (result) {
            onDetected?.();
          } else {
            onNotDetected?.();
          }
        })
        .catch(err => {
          setError(err instanceof Error ? err.message : 'Detection failed');
          // Start retry process
          retryDetection();
        });
    }
  }, [
    isTested,
    detectAdBlock,
    saveResult,
    onDetected,
    onNotDetected,
    retryDetection,
  ]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    isAdBlockActive,
    isTested,
    retryDetection,
  };
}

// Hook for ad-block modal state management
export function useAdBlockModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [dismissalTime, setDismissalTime] = useState<number | null>(null);

  const dismissModal = useCallback(() => {
    setIsVisible(false);
    setUserDismissed(true);
    setDismissalTime(Date.now());

    // Store dismissal in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'adblock-modal-dismissed',
          JSON.stringify({
            dismissed: true,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.warn('Failed to save modal dismissal:', err);
      }
    }
  }, []);

  const showModal = useCallback(() => {
    // Check if user previously dismissed and if enough time has passed
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('adblock-modal-dismissed');
        if (stored) {
          const { timestamp } = JSON.parse(stored);
          const hoursSinceDismissal =
            (Date.now() - timestamp) / (1000 * 60 * 60);

          // Show modal again after 24 hours
          if (hoursSinceDismissal < 24) {
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to check modal dismissal:', err);
      }
    }

    setIsVisible(true);
  }, []);

  const resetDismissal = useCallback(() => {
    setUserDismissed(false);
    setDismissalTime(null);
    setIsVisible(false);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('adblock-modal-dismissed');
      } catch (err) {
        console.warn('Failed to reset modal dismissal:', err);
      }
    }
  }, []);

  return {
    isVisible,
    userDismissed,
    dismissalTime,
    showModal,
    dismissModal,
    resetDismissal,
  };
}

// Hook for ad-block banner state
export function useAdBlockBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const showBanner = useCallback(() => {
    setIsVisible(true);
    setIsDismissed(false);
  }, []);

  const dismissBanner = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
  }, []);

  const resetBanner = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(false);
  }, []);

  return {
    isVisible,
    isDismissed,
    showBanner,
    dismissBanner,
    resetBanner,
  };
}
