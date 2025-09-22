import Preloader from '@/components/elements/Preloader';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AdBlockDetector from '@/components/common/AdBlockDetector';
import { useEffect, useState } from 'react';
import { initializeTheme } from '@/util/themeInitializer';
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

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize theme immediately to prevent flash
    initializeTheme();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ErrorBoundary>
      <AdBlockDetector
        // Detection options
        detectionDelay={100}
        // Callbacks
        onAdBlockDetected={() => {
          console.log('Ad blocker detected');
          // You can add analytics tracking here
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'ad_block_detected', {
              event_category: 'ad_block',
            });
          }
        }}
        onAdBlockNotDetected={() => {
          console.log('No ad blocker detected');
          // You can add analytics tracking here
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'no_ad_block', { event_category: 'ad_block' });
          }
        }}
        // Modal configuration
        showWarning={true}
        warningMessage="We noticed you're using an ad blocker. Please support us by disabling it or consider subscribing to continue enjoying our content without ads."
        warningTitle='Ad Blocker Detected'
        showSubscribeButton={true}
        // Subscribe callback
        onSubscribe={() => {
          // Redirect to subscription page or open subscription modal
          window.open('/subscribe', '_blank');
          // Or trigger your subscription modal
          // Example: setShowSubscriptionModal(true);
        }}
      >
        {!loading ? <Component {...pageProps} /> : <Preloader />}
      </AdBlockDetector>
    </ErrorBoundary>
  );
}

export default MyApp;
