import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAdBlockDetector } from '@/hooks/useAdBlockDetector';
// import AdBlockModal from '@/components/AdBlockModal';
import Preloader from '@/components/elements/Preloader';

// Import CSS files
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../public/assets/css/animate.min.css';
import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/flaticon.css';
import '../public/assets/css/fontawesome-all.min.css';
import '../public/assets/css/imageRevealHover.css';
import '../public/assets/css/magnific-popup.css';
import '../public/assets/css/main.css';
import '../public/assets/css/slick.css';
import '../public/assets/css/spacing.css';
import '../public/assets/css/swiper-bundle.css';
import '../public/assets/css/optimizations.css';
import '../public/assets/css/login-system.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  // Ad-block detection
  const { isAdBlockActive, isTested } = useAdBlockDetector({
    onDetected: () => {
      console.log('Ad blocker detected');
      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ad_block_detected', {
          event_category: 'ad_block',
          value: 1,
        });
      }
    },
    onNotDetected: () => {
      console.log('No ad blocker detected');
      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'no_ad_block', {
          event_category: 'ad_block',
          value: 0,
        });
      }
    },
  });

  // Ad-block modal management
  // const { isVisible, showModal, dismissModal } = useAdBlockModal();

  // Show modal when ad-block is detected
  // useEffect(() => {
  //   if (isTested && isAdBlockActive) {
  //     showModal();
  //   }
  // }, [isTested, isAdBlockActive, showModal]);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle subscription
  const handleSubscribe = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'subscribe_clicked', {
        event_category: 'subscription',
        event_label: 'ad_block_modal',
      });
    }

    // Open subscription page
    window.open('/subscribe', '_blank');
  };

  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='theme-color' content='#3b82f6' />

        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        {/* Skip to content link for accessibility */}
        <link href='#main-content' rel='prefetch' />
      </Head>

      <ErrorBoundary>
        <div id='app-root'>
          {/* Skip to content link */}
          <a
            href='#main-content'
            className='skip-to-content'
            style={{
              position: 'absolute',
              top: '-40px',
              left: '6px',
              background: '#000',
              color: '#fff',
              padding: '8px',
              textDecoration: 'none',
              zIndex: 10000,
              borderRadius: '4px',
              fontSize: '14px',
            }}
            onFocus={e => {
              e.currentTarget.style.top = '6px';
            }}
            onBlur={e => {
              e.currentTarget.style.top = '-40px';
            }}
          >
            Skip to main content
          </a>

          {!loading ? (
            <>
              <main id='main-content' role='main'>
                <Component {...pageProps} />
              </main>
            </>
          ) : (
            <Preloader />
          )}

          {/* Ad-block detection modal */}
          {/* <AdBlockModal
            isVisible={isVisible}
            onDismiss={dismissModal}
            title="Ad Blocker Detected"
            message="We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content without ads."
            showSubscribeButton={true}
            showDismissButton={true}
            onSubscribe={handleSubscribe}
          /> */}
        </div>
      </ErrorBoundary>

      <style jsx global>{`
        /* Global styles for accessibility and performance */
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Skip to content link */
        .skip-to-content {
          transition: top 0.3s ease;
        }

        .skip-to-content:focus {
          top: 6px !important;
        }

        /* Loading states */
        .loading {
          opacity: 0.6;
          pointer-events: none;
        }

        /* Error states */
        .error {
          border-color: #ef4444;
          background-color: #fef2f2;
        }

        /* Success states */
        .success {
          border-color: #10b981;
          background-color: #f0fdf4;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #111827;
            color: #f9fafb;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          * {
            border-color: currentColor !important;
          }
        }
      `}</style>
    </>
  );
}

export default MyApp;

// Global type declarations
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
