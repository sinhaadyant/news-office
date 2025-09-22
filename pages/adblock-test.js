import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';

export default function AdBlockTest() {
  const [detectionResults, setDetectionResults] = useState({});
  const [isDetecting, setIsDetecting] = useState(false);

  // Method 1: Create a fake ad element and check if it gets blocked
  const detectByElementBlocking = () => {
    return new Promise(resolve => {
      try {
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

        testElement.innerHTML = '<div class="adsbygoogle"></div>';
        testElement.setAttribute('data-ad', 'true');
        testElement.setAttribute('data-advertisement', 'true');
        testElement.setAttribute('data-adblock', 'true');

        document.body.appendChild(testElement);

        setTimeout(() => {
          const element = document.getElementById('adblock-test-element');
          const isBlocked =
            !element ||
            element.offsetHeight === 0 ||
            element.offsetWidth === 0 ||
            getComputedStyle(element).display === 'none' ||
            getComputedStyle(element).visibility === 'hidden';

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
  };

  // Method 2: Try to load a fake ad script
  const detectByScriptBlocking = () => {
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
            resolve(false);
          }
        };

        script.onerror = () => {
          if (!resolved) {
            resolved = true;
            if (script.parentNode) {
              document.head.removeChild(script);
            }
            resolve(true);
          }
        };

        document.head.appendChild(script);

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
  };

  // Method 3: Check for common ad blocker indicators
  const detectByIndicators = () => {
    try {
      const indicators = [
        typeof window.adsbygoogle === 'undefined',
        typeof window.google_ad_client === 'undefined',
        typeof window.ublock === 'object',
        typeof window.adblock === 'object',
        !document.querySelector('script[src*="adsbygoogle"]'),
        document.querySelectorAll('.adsbygoogle').length === 0,
      ];

      const blockedCount = indicators.filter(Boolean).length;
      const threshold = Math.ceil(indicators.length / 2);

      return blockedCount >= threshold;
    } catch (error) {
      console.warn('Ad block detection method 3 failed:', error);
      return false;
    }
  };

  // Method 4: Try to access blocked resources
  const detectByResourceBlocking = () => {
    return new Promise(resolve => {
      try {
        const img = new Image();
        img.onload = () => resolve(false);
        img.onerror = () => resolve(true);
        img.src =
          'https://pagead2.googlesyndication.com/pagead/images/abg/icon.png';

        setTimeout(() => resolve(false), 2000);
      } catch (error) {
        console.warn('Ad block detection method 4 failed:', error);
        resolve(false);
      }
    });
  };

  const runDetection = async () => {
    setIsDetecting(true);

    try {
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

      const results = [
        elementBlocked,
        scriptBlocked,
        indicatorsBlocked,
        resourceBlocked,
      ];
      const blockedCount = results.filter(Boolean).length;
      const isAdBlocked = blockedCount >= 2;

      setDetectionResults({
        elementBlocked,
        scriptBlocked,
        indicatorsBlocked,
        resourceBlocked,
        blockedCount,
        isAdBlocked,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error('Detection failed:', error);
      setDetectionResults({
        error: error.message,
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    runDetection();
  }, []);

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='card-title'>Ad Blocker Detection Test</h2>
              </div>
              <div className='card-body'>
                <p className='card-text'>
                  This page tests various ad blocker detection methods. Enable
                  your ad blocker and refresh the page to see the results.
                </p>

                <div className='mb-4'>
                  <button
                    className='btn btn-primary'
                    onClick={runDetection}
                    disabled={isDetecting}
                  >
                    {isDetecting ? 'Testing...' : 'Run Detection Test'}
                  </button>
                </div>

                {Object.keys(detectionResults).length > 0 && (
                  <div className='alert alert-info'>
                    <h5>Detection Results:</h5>
                    <ul className='list-unstyled'>
                      {detectionResults.error ? (
                        <li>
                          <strong>Error:</strong> {detectionResults.error}
                        </li>
                      ) : (
                        <>
                          <li>
                            <strong>Element Blocking:</strong>{' '}
                            {detectionResults.elementBlocked
                              ? '✅ Blocked'
                              : '❌ Not Blocked'}
                          </li>
                          <li>
                            <strong>Script Blocking:</strong>{' '}
                            {detectionResults.scriptBlocked
                              ? '✅ Blocked'
                              : '❌ Not Blocked'}
                          </li>
                          <li>
                            <strong>Indicators:</strong>{' '}
                            {detectionResults.indicatorsBlocked
                              ? '✅ Blocked'
                              : '❌ Not Blocked'}
                          </li>
                          <li>
                            <strong>Resource Blocking:</strong>{' '}
                            {detectionResults.resourceBlocked
                              ? '✅ Blocked'
                              : '❌ Not Blocked'}
                          </li>
                          <li>
                            <strong>Blocked Count:</strong>{' '}
                            {detectionResults.blockedCount}/4
                          </li>
                          <li>
                            <strong>Final Result:</strong>
                            <span
                              className={`badge ${detectionResults.isAdBlocked ? 'badge-danger' : 'badge-success'}`}
                            >
                              {detectionResults.isAdBlocked
                                ? 'Ad Blocker Detected'
                                : 'No Ad Blocker'}
                            </span>
                          </li>
                        </>
                      )}
                      <li>
                        <strong>Test Time:</strong> {detectionResults.timestamp}
                      </li>
                    </ul>
                  </div>
                )}

                <div className='mt-4'>
                  <h5>Browser Information:</h5>
                  <ul className='list-unstyled'>
                    <li>
                      <strong>User Agent:</strong>{' '}
                      {typeof window !== 'undefined'
                        ? window.navigator.userAgent
                        : 'N/A'}
                    </li>
                    <li>
                      <strong>Ad Blocker Extensions:</strong>
                    </li>
                    <ul>
                      <li>
                        AdBlock Plus:{' '}
                        {typeof window !== 'undefined' &&
                        typeof window.adsbygoogle === 'undefined'
                          ? 'Possibly Active'
                          : 'Not Detected'}
                      </li>
                      <li>
                        uBlock Origin:{' '}
                        {typeof window !== 'undefined' &&
                        typeof window.ublock === 'object'
                          ? 'Active'
                          : 'Not Detected'}
                      </li>
                      <li>
                        AdBlock:{' '}
                        {typeof window !== 'undefined' &&
                        typeof window.adblock === 'object'
                          ? 'Active'
                          : 'Not Detected'}
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
