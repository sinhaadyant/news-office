import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for detecting ad blockers
 * Uses multiple detection methods for reliability
 * @param {Object} options - Configuration options
 * @returns {Object} Detection state and methods
 */
export const useAdBlockDetector = (options = {}) => {
  const {
    testElementClass = "adsbox",
    testElementId = "adblock-test",
    detectionDelay = 100,
    clientSideOnly = true,
    onAdBlockDetected,
    onAdBlockNotDetected,
  } = options;

  const [state, setState] = useState({
    isAdBlocked: false,
    isDetecting: false,
    hasDetected: false,
    error: null,
  });

  // Method 1: Create a fake ad element and check if it gets blocked
  const detectByElementBlocking = useCallback(() => {
    return new Promise((resolve) => {
      try {
        // Create a test element that looks like an ad
        const testElement = document.createElement("div");
        testElement.id = testElementId;
        testElement.className = testElementClass;
        testElement.style.cssText = `
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          visibility: hidden;
          pointer-events: none;
        `;

        // Add content that ad blockers typically target
        testElement.innerHTML = '<div class="adsbygoogle"></div>';

        // Insert into DOM
        document.body.appendChild(testElement);

        // Check if element is still there after a short delay
        setTimeout(() => {
          const element = document.getElementById(testElementId);
          const isBlocked =
            !element ||
            element.offsetHeight === 0 ||
            element.offsetWidth === 0 ||
            getComputedStyle(element).display === "none" ||
            getComputedStyle(element).visibility === "hidden";

          // Clean up
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }

          resolve(isBlocked);
        }, 50);
      } catch (error) {
        console.warn("Ad block detection method 1 failed:", error);
        resolve(false);
      }
    });
  }, [testElementClass, testElementId]);

  // Method 2: Try to load a fake ad script
  const detectByScriptBlocking = useCallback(() => {
    return new Promise((resolve) => {
      try {
        const script = document.createElement("script");
        script.src = "data:text/javascript,void(0)"; // Fake ad script
        script.className = "adsbygoogle";
        script.onload = () => {
          document.head.removeChild(script);
          resolve(false); // Script loaded, no ad blocker
        };
        script.onerror = () => {
          document.head.removeChild(script);
          resolve(true); // Script blocked, ad blocker detected
        };

        document.head.appendChild(script);

        // Fallback timeout
        setTimeout(() => {
          if (script.parentNode) {
            document.head.removeChild(script);
            resolve(false);
          }
        }, 1000);
      } catch (error) {
        console.warn("Ad block detection method 2 failed:", error);
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
        typeof window.adsbygoogle === "undefined",
        typeof window.google_ad_client === "undefined",
        // uBlock Origin
        typeof window.ublock === "object",
        // AdBlock
        typeof window.adblock === "object",
        // Check if adsbygoogle script is blocked
        !document.querySelector('script[src*="adsbygoogle"]'),
      ];

      // Count how many indicators suggest ad blocking
      const blockedCount = indicators.filter(Boolean).length;
      const threshold = Math.ceil(indicators.length / 2);

      return blockedCount >= threshold;
    } catch (error) {
      console.warn("Ad block detection method 3 failed:", error);
      return false;
    }
  }, []);

  // Main detection function
  const detectAdBlock = useCallback(async () => {
    if (clientSideOnly && typeof window === "undefined") {
      return;
    }

    setState((prev) => ({ ...prev, isDetecting: true, error: null }));

    try {
      // Run all detection methods in parallel
      const [elementBlocked, scriptBlocked, indicatorsBlocked] =
        await Promise.all([
          detectByElementBlocking(),
          detectByScriptBlocking(),
          detectByIndicators(),
        ]);

      // Consider ad blocker detected if majority of methods agree
      const results = [elementBlocked, scriptBlocked, indicatorsBlocked];
      const blockedCount = results.filter(Boolean).length;
      const isAdBlocked = blockedCount >= 2;

      setState((prev) => ({
        ...prev,
        isAdBlocked,
        isDetecting: false,
        hasDetected: true,
      }));

      // Trigger callbacks
      if (isAdBlocked) {
        onAdBlockDetected?.();
      } else {
        onAdBlockNotDetected?.();
      }

      return isAdBlocked;
    } catch (error) {
      console.error("Ad block detection failed:", error);
      setState((prev) => ({
        ...prev,
        isDetecting: false,
        hasDetected: true,
        error: error.message,
      }));
      return false;
    }
  }, [
    clientSideOnly,
    detectByElementBlocking,
    detectByScriptBlocking,
    detectByIndicators,
    onAdBlockDetected,
    onAdBlockNotDetected,
  ]);

  // Auto-detect on mount
  useEffect(() => {
    if (clientSideOnly && typeof window === "undefined") {
      return;
    }

    const timer = setTimeout(() => {
      detectAdBlock();
    }, detectionDelay);

    return () => clearTimeout(timer);
  }, [detectAdBlock, detectionDelay, clientSideOnly]);

  // Retry detection
  const retryDetection = useCallback(() => {
    setState((prev) => ({ ...prev, hasDetected: false }));
    detectAdBlock();
  }, [detectAdBlock]);

  return {
    ...state,
    detectAdBlock,
    retryDetection,
  };
};
