import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllArticles, getArticlesByCategory, getTrendingArticles } from '@/util/articleUtils';
import { handleApiError } from '@/util/errorHandler';

export const useArticles = (category = null, options = {}) => {
  const {
    page = 1,
    limit = 10,
    trending = false,
    premium = null,
    search = null
  } = options;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let fetchedArticles = [];

      if (trending) {
        fetchedArticles = getTrendingArticles();
      } else if (category) {
        fetchedArticles = getArticlesByCategory(category);
      } else {
        fetchedArticles = getAllArticles();
      }

      // Apply filters
      if (search) {
        fetchedArticles = fetchedArticles.filter(article =>
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.content?.toLowerCase().includes(search.toLowerCase()) ||
          article.author.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (premium !== null) {
        fetchedArticles = fetchedArticles.filter(article => 
          premium ? article.premium : !article.premium
        );
      }

      setTotalCount(fetchedArticles.length);

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = fetchedArticles.slice(startIndex, endIndex);

      setArticles(paginatedArticles);
    } catch (err) {
      const errorMessage = handleApiError(err, 'Failed to fetch articles');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [category, page, limit, trending, premium, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const refetch = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  const hasMore = useMemo(() => {
    return (page * limit) < totalCount;
  }, [page, limit, totalCount]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / limit);
  }, [totalCount, limit]);

  return {
    articles,
    loading,
    error,
    totalCount,
    hasMore,
    totalPages,
    refetch
  };
};

export const useArticle = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate async operation
      setTimeout(() => {
        const foundArticle = getAllArticles().find(a => a.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
        setLoading(false);
      }, 100);
    } catch (err) {
      const errorMessage = handleApiError(err, 'Failed to fetch article');
      setError(errorMessage);
      setLoading(false);
    }
  }, [slug]);

  return { article, loading, error };
};

export const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPrevPage,
    resetPagination,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};
