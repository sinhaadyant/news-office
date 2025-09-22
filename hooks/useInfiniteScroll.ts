import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { UseInfiniteScrollReturn, QueryParams, Pagination } from '@/types';

interface UseInfiniteScrollOptions<T> {
  fetchPage: (
    page: number,
    params?: QueryParams
  ) => Promise<{ data: T[]; pagination: Pagination }>;
  initialData?: T[];
  initialPage?: number;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
  params?: QueryParams;
  onPageChange?: (page: number) => void;
  onLoadMore?: (items: T[]) => void;
  preserveScrollPosition?: boolean;
  shallowRouting?: boolean;
}

export function useInfiniteScroll<T>({
  fetchPage,
  initialData = [],
  initialPage = 1,
  threshold = 0.1,
  rootMargin = '100px',
  enabled = true,
  params = {},
  onPageChange,
  onLoadMore,
  preserveScrollPosition = true,
  shallowRouting = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Save scroll position
  const saveScrollPosition = useCallback(() => {
    if (preserveScrollPosition) {
      scrollPositionRef.current = window.scrollY;
      sessionStorage.setItem(
        `scroll-position-${router.asPath}`,
        window.scrollY.toString()
      );
    }
  }, [preserveScrollPosition, router.asPath]);

  // Restore scroll position
  const restoreScrollPosition = useCallback(() => {
    if (preserveScrollPosition) {
      const savedPosition = sessionStorage.getItem(
        `scroll-position-${router.asPath}`
      );
      if (savedPosition) {
        const position = parseInt(savedPosition, 10);
        setTimeout(() => {
          window.scrollTo(0, position);
        }, 100);
      }
    }
  }, [preserveScrollPosition, router.asPath]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !enabled) return;

    setIsLoading(true);
    setError(undefined);

    try {
      const nextPage = currentPage + 1;
      const result = await fetchPage(nextPage, params);

      setItems(prevItems => [...prevItems, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(result.pagination.hasNext);

      // Call callbacks
      onPageChange?.(nextPage);
      onLoadMore?.(result.data);

      // Update URL if shallow routing is enabled
      if (shallowRouting && result.pagination.hasNext) {
        const newQuery = { ...router.query, page: nextPage.toString() };
        router.replace(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true }
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load more items')
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    enabled,
    currentPage,
    fetchPage,
    params,
    onPageChange,
    onLoadMore,
    shallowRouting,
    router,
  ]);

  // Reset the infinite scroll
  const reset = useCallback(() => {
    setItems(initialData);
    setCurrentPage(initialPage);
    setHasMore(true);
    setError(undefined);
    setIsLoading(false);
    setIsInitialized(false);
  }, [initialData, initialPage]);

  // Initialize with first page if no initial data
  useEffect(() => {
    if (!isInitialized && initialData.length === 0) {
      setIsInitialized(true);
      loadMore();
    } else {
      setIsInitialized(true);
    }
  }, [isInitialized, initialData.length, loadMore]);

  // Set up intersection observer
  useEffect(() => {
    if (!enabled || !isInitialized) return;

    const observerOptions = {
      threshold,
      rootMargin,
    };

    observerRef.current = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry?.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    }, observerOptions);

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    enabled,
    isInitialized,
    threshold,
    rootMargin,
    hasMore,
    isLoading,
    loadMore,
  ]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleRouteChange = () => {
      // Restore scroll position when navigating back
      setTimeout(restoreScrollPosition, 100);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, restoreScrollPosition]);

  // Handle scroll position saving
  useEffect(() => {
    const handleScroll = () => {
      saveScrollPosition();
    };

    if (preserveScrollPosition) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return undefined;
  }, [preserveScrollPosition, saveScrollPosition]);

  // Handle page parameter changes
  useEffect(() => {
    const pageParam = router.query.page;
    if (pageParam && typeof pageParam === 'string') {
      const pageNumber = parseInt(pageParam, 10);
      if (pageNumber !== currentPage && pageNumber > 0) {
        // Navigate to specific page
        setCurrentPage(pageNumber);
        if (pageNumber > Math.ceil(items.length / 10)) {
          // Assuming 10 items per page
          // Need to load more data
          loadMore();
        }
      }
    }
  }, [router.query.page, currentPage, items.length, loadMore]);

  return {
    items,
    isLoading,
    hasMore,
    error,
    loadMore,
    reset,
  };
}

// Hook for manual infinite scroll (without intersection observer)
export function useManualInfiniteScroll<T>({
  fetchPage,
  initialData = [],
  initialPage = 1,
  params = {},
  onPageChange,
  onLoadMore,
}: Omit<
  UseInfiniteScrollOptions<T>,
  | 'threshold'
  | 'rootMargin'
  | 'enabled'
  | 'preserveScrollPosition'
  | 'shallowRouting'
>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(undefined);

    try {
      const nextPage = currentPage + 1;
      const result = await fetchPage(nextPage, params);

      setItems(prevItems => [...prevItems, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(result.pagination.hasNext);

      onPageChange?.(nextPage);
      onLoadMore?.(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load more items')
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    currentPage,
    fetchPage,
    params,
    onPageChange,
    onLoadMore,
  ]);

  const reset = useCallback(() => {
    setItems(initialData);
    setCurrentPage(initialPage);
    setHasMore(true);
    setError(undefined);
    setIsLoading(false);
  }, [initialData, initialPage]);

  return {
    items,
    isLoading,
    hasMore,
    error,
    loadMore,
    reset,
  };
}

// Utility hook for pagination state
export function usePagination(
  initialPage: number = 1,
  initialLimit: number = 10
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage(prev => prev + 1), []);
  const prevPage = useCallback(
    () => setPage(prev => Math.max(1, prev - 1)),
    []
  );
  const goToPage = useCallback(
    (newPage: number) => setPage(Math.max(1, newPage)),
    []
  );
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}

// Utility hook for scroll position management
export function useScrollPosition(key: string) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const savePosition = useCallback(
    (position: number) => {
      setScrollPosition(position);
      sessionStorage.setItem(`scroll-${key}`, position.toString());
    },
    [key]
  );

  const restorePosition = useCallback(() => {
    const saved = sessionStorage.getItem(`scroll-${key}`);
    if (saved) {
      const position = parseInt(saved, 10);
      setScrollPosition(position);
      setTimeout(() => {
        window.scrollTo(0, position);
      }, 100);
    }
  }, [key]);

  const clearPosition = useCallback(() => {
    setScrollPosition(0);
    sessionStorage.removeItem(`scroll-${key}`);
  }, [key]);

  return {
    scrollPosition,
    savePosition,
    restorePosition,
    clearPosition,
  };
}
