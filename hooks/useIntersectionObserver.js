import { useState, useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const handleIntersection = useCallback(
    ([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      setIsIntersecting(isElementIntersecting);

      if (isElementIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    },
    [hasIntersected]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleIntersection, threshold, root, rootMargin]);

  return {
    elementRef,
    isIntersecting: triggerOnce ? hasIntersected : isIntersecting,
    hasIntersected,
  };
};

export const useLazyLoad = (options = {}) => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const { elementRef, isIntersecting, hasIntersected } =
    useIntersectionObserver({
      threshold,
      triggerOnce,
    });

  const shouldLoad = triggerOnce ? hasIntersected : isIntersecting;

  return {
    elementRef,
    shouldLoad,
    isIntersecting,
  };
};

export const useInfiniteScroll = (callback, options = {}) => {
  const { threshold = 100, rootMargin = '100px', enabled = true } = options;

  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  const handleIntersection = useCallback(
    async ([entry]) => {
      if (entry.isIntersecting && enabled && !isLoading) {
        setIsLoading(true);
        try {
          await callback();
        } catch (error) {
          console.error('Error in infinite scroll callback:', error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [callback, enabled, isLoading]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !enabled) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${threshold}px`,
    });

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [handleIntersection, threshold, enabled]);

  return {
    sentinelRef,
    isLoading,
  };
};

export const useVisibilityChange = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
