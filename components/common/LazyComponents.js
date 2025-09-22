import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyVideoPlayer = dynamic(() => import('./VideoPlayer'), {
  loading: () => (
    <div className='lazy-loading-placeholder'>
      <div className='loading-spinner'></div>
      <p>Loading video player...</p>
    </div>
  ),
  ssr: false, // Disable SSR for video components
});

export const LazySlider = dynamic(() => import('../slider/TechnologySlider'), {
  loading: () => (
    <div className='lazy-loading-placeholder'>
      <div className='loading-spinner'></div>
      <p>Loading slider...</p>
    </div>
  ),
});

export const LazyModal = dynamic(() => import('./Modal'), {
  loading: () => null, // No loading state for modals
  ssr: false,
});

export const LazyChart = dynamic(() => import('./Chart'), {
  loading: () => (
    <div className='chart-loading'>
      <div className='loading-skeleton'></div>
    </div>
  ),
  ssr: false,
});

export const LazyComments = dynamic(() => import('./Comments'), {
  loading: () => (
    <div className='comments-loading'>
      <div className='loading-spinner'></div>
      <p>Loading comments...</p>
    </div>
  ),
});

export const LazyNewsletter = dynamic(() => import('./NewsletterForm'), {
  loading: () => (
    <div className='newsletter-loading'>
      <div className='loading-skeleton'></div>
    </div>
  ),
});

// Conditional lazy loading based on user interaction
export const LazyInteractiveComponent = dynamic(
  () => import('./InteractiveComponent'),
  {
    loading: () => (
      <div className='interactive-loading'>
        <button className='btn btn-primary'>
          Click to load interactive content
        </button>
      </div>
    ),
    ssr: false,
  }
);
