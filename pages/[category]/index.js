import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LatestSidebar from '@/components/elements/LatestSidebar';
import Layout from '@/components/layout/Layout';
import PageErrorBoundary from '@/components/common/PageErrorBoundary';
import { ArticleCardSkeleton } from '@/components/common/SkeletonLoaders';
import { AdBlockBannerPackage } from '@/components/common/AdBlockBannerPackage';
import AdBlock from '@/components/ads/AdBlock';
import PremiumBadge from '@/components/common/PremiumBadge';
import { getArticlesByCategory, getCategoryBySlug, generateSlug } from '@/util/articleUtils';
import {
  getCategoryLink,
  getAuthorLink,
  getArticleLink,
} from '@/util/urlUtils';
import {
  PAGINATION_CONFIG,
  LAYOUT_CONFIG,
  GRID_CONFIG,
  SECTION_CONFIG,
  BUTTON_CONFIG,
  LOADING_CONFIG,
} from '@/constants/main';

export default function CategoryPage() {
  const router = useRouter();
  const { category, page } = router.query;

  const pagination = PAGINATION_CONFIG.CATEGORY_ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  // Get articles by category using the proper utility function
  const filteredData = category ? getArticlesByCategory(category) : [];
  const categoryInfo = category ? getCategoryBySlug(category) : null;

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / pagination);

  // Initialize page and validate category
  useEffect(() => {
    if (!category) {
      setIsInitialized(true);
      return;
    }

    if (page && !isNaN(parseInt(page))) {
      const pageNum = parseInt(page);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
        setIsInitialized(true);
      } else {
        // Invalid page number - redirect to category page 1
        router.replace(`/${category}`);
        return;
      }
    } else {
      // No page parameter - start from page 1
      setIsInitialized(true);
    }
  }, [category, page, totalPages, router]);

  // Load initial data based on current page
  useEffect(() => {
    if (isInitialized) {
      loadPageData(currentPage);
    }
  }, [currentPage, isInitialized]);

  // Function to load data for a specific page
  const loadPageData = useCallback(
    pageNum => {
      setLoading(true);
      setError(null);

      try {
        const startIndex = (pageNum - 1) * pagination;
        const endIndex = startIndex + pagination;
        const pageData = filteredData.slice(startIndex, endIndex);

        if (pageNum === 1) {
          // First page - replace data
          setDisplayedData(pageData);
        } else {
          // Subsequent pages - append data
          setDisplayedData(prev => [...prev, ...pageData]);
        }

        // Check if there's more data
        setHasMore(endIndex < filteredData.length);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    },
    [pagination, filteredData]
  );

  // Load more function
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Update URL to reflect the current state without navigation
      // router.replace(`/${category}/${nextPage}`, undefined, { shallow: true });
    }
  }, [loading, hasMore, currentPage, router, category]);

  // Add scroll-based functionality for resetting to category page 1
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled to top, reset to show only first page of category
      if (window.scrollY === 0 && displayedData.length > pagination) {
        setCurrentPage(1);
        setDisplayedData(filteredData.slice(0, pagination));
        // router.replace(`/${category}`, undefined, { shallow: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedData.length, pagination, router, category, filteredData]);

  // Function to generate description for articles that don't have one
  const generateDescription = article => {
    // You can customize this logic based on your needs
    const descriptions = [
      'Discover the latest insights and trends in this fascinating topic.',
      'Explore new perspectives and cutting-edge developments in this field.',
      'Learn about the most recent updates and innovations in this area.',
      'Stay informed with the latest news and analysis on this subject.',
      'Get the inside scoop on recent developments and future prospects.',
    ];

    // Use article ID to consistently assign descriptions
    const index = article.id % descriptions.length;
    return descriptions[index];
  };

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <Layout
        headerStyle={LAYOUT_CONFIG.HEADER_STYLE_LATEST}
        footerStyle={LAYOUT_CONFIG.FOOTER_STYLE_LATEST}
        footerClass={LAYOUT_CONFIG.FOOTER_CLASS_LATEST}
        logoWhite={LAYOUT_CONFIG.LOGO_WHITE_LATEST}
      >
        <section className={SECTION_CONFIG.LATEST_POST_AREA}>
          <div className={GRID_CONFIG.CONTAINER_DEFAULT}>
            <div className='row'>
              <div className='col-lg-8'>
                <ArticleCardSkeleton count={6} />
              </div>
              <div className='col-lg-4'>
                <ArticleCardSkeleton count={3} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <PageErrorBoundary pageName='category page'>
      <Layout
        headerStyle={LAYOUT_CONFIG.HEADER_STYLE_LATEST}
        footerStyle={LAYOUT_CONFIG.FOOTER_STYLE_LATEST}
        footerClass={LAYOUT_CONFIG.FOOTER_CLASS_LATEST}
        logoWhite={LAYOUT_CONFIG.LOGO_WHITE_LATEST}
      >
        {/* AdBlock Warning Banner */}
        <AdBlockBannerPackage
          message='Help us continue providing quality content by disabling your ad blocker.'
          onDismiss={() => console.log('Category banner dismissed')}
        />

        <section className={SECTION_CONFIG.LATEST_POST_AREA}>
          <div className={GRID_CONFIG.CONTAINER_DEFAULT}>
            <div className={GRID_CONFIG.ROW_CENTER}>
              <div className={GRID_CONFIG.MAIN_CONTENT_COL}>
                {/* Breadcrumb Navigation */}
                <nav aria-label='breadcrumb' className='mb-3'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link href='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link href='/latest-news'>Latest News</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      {category
                        ? category.charAt(0).toUpperCase() + category.slice(1)
                        : 'Category'}
                    </li>
                  </ol>
                </nav>

                <div className='section__title-wrap mb-40'>
                  <div className='row align-items-end'>
                    <div className='col-sm-6'>
                      <div className='section__title'>
                        <span className='section__sub-title'>Category</span>
                        <h3 className='section__main-title'>
                          {categoryInfo
                            ? categoryInfo.displayName
                            : category
                            ? category.charAt(0).toUpperCase() + category.slice(1)
                            : 'Category'}
                        </h3>
                        {currentPage > 1 && (
                          <p className='section__description'>
                            Showing page {currentPage} of {totalPages} (
                            {displayedData.length} of {filteredData.length}{' '}
                            articles)
                          </p>
                        )}
                        {filteredData.length > 0 && currentPage === 1 && (
                          <p className='section__description'>
                            {filteredData.length} articles found in {categoryInfo ? categoryInfo.displayName : category} category
                            {categoryInfo && categoryInfo.latestArticle && (
                              <span className='d-block mt-2'>
                                Latest: <Link href={getArticleLink(categoryInfo.latestArticle)} className='text-primary'>
                                  {categoryInfo.latestArticle.title}
                                </Link>
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='section__read-more text-start text-sm-end'>
                        <Link href='/latest-news'>
                          View All Categories{' '}
                          <i className='far fa-long-arrow-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error State */}
                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                    <button
                      className='btn btn-sm btn-outline-danger ms-2'
                      onClick={() => loadPageData(currentPage)}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Articles List */}
                <div className='latest__post-wrap'>
                  {displayedData.length === 0 && !loading && (
                    <div className='text-center py-5'>
                      {filteredData.length === 0 ? (
                        <>
                          <div className='mb-4'>
                            <i className='fas fa-folder-open fa-3x text-muted mb-3'></i>
                            <h4 className='text-muted'>No Articles Found</h4>
                            <p className='text-muted'>
                              {category
                                ? `No articles found in "${category}" category.`
                                : 'No articles found in this category.'}
                            </p>
                          </div>
                          <div className='d-flex justify-content-center gap-3'>
                            <Link
                              href='/latest-news'
                              className={BUTTON_CONFIG.BTN_PRIMARY}
                            >
                              <i className='fas fa-arrow-left me-2'></i>
                              Back to Latest News
                            </Link>
                            <Link
                              href='/'
                              className={BUTTON_CONFIG.BTN_SECONDARY}
                            >
                              <i className='fas fa-home me-2'></i>
                              Go to Home
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className='text-muted'>
                            No more articles to display.
                          </p>
                          <Link
                            href={`/${category}`}
                            className={BUTTON_CONFIG.BTN_SECONDARY}
                          >
                            Back to First Page
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                  {displayedData.map((item, i) => (
                    <React.Fragment key={`${item.id}-${i}`}>
                      <div className='latest__post-item'>
                      <div className='latest__post-thumb tgImage__hover'>
                        <Link href={getArticleLink(item)}>
                          <img
                            src={`/assets/img/${item.group}/${item.img}`}
                            alt={item.title}
                            loading='lazy'
                          />
                        </Link>
                        <div className='badge-container'>
                          <div className='badge-left'>
                            {item.trending && (
                              <div className='trending-badge'>
                                <span>🔥</span>
                              </div>
                            )}
                          </div>
                          <div className='badge-right'>
                            <PremiumBadge isPremium={item.isPremium} />
                          </div>
                        </div>
                      </div>
                      <div className='latest__post-content'>
                        <ul className='tgbanner__content-meta list-wrap'>
                          <li className='category'>
                            <Link href={getCategoryLink(item.category)}>
                              {item.category.toLowerCase()}
                            </Link>
                          </li>
                          <li>
                            <span className='by'>By</span>{' '}
                            <Link href={getAuthorLink(item.author)}>
                              {item.author}
                            </Link>
                          </li>
                          <li>{item.date}</li> 
                          {/* {item.trending && (
                            <li>
                              <span className='trending-badge'>
                                🔥 Trending
                              </span>
                            </li>
                          )} */}
                        </ul>
                        <h3 className='title tgcommon__hover'>
                          <Link href={getArticleLink(item)}>{item.title}</Link>
                        </h3>
                        <p>{generateDescription(item)}</p>
                        <ul className='post__activity list-wrap'>
                          {/* <li>
                            <i className='fal fa-signal' />{' '}
                            {Math.floor(Math.random() * 5) + 1}k
                          </li> */}
                          <li>
                            <Link href={getArticleLink(item)}>
                              <i className='fal fa-comment-dots' />{' '}
                              {Math.floor(Math.random() * 100) + 50}
                            </Link>
                          </li>
                          <li>
                            <i className='fal fa-share-alt' />{' '}
                            {Math.floor(Math.random() * 20) + 10}
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Show ad after every 5 articles */}
                    {(i + 1) % 5 === 0 && (
                      <AdBlock 
                        type="block" 
                        id={`category-ad-${Math.floor(i / 5)}`}
                        slot={`category-${category}-ad-${Math.floor(i / 5)}`}
                      />
                    )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Loading State */}
                {loading && (
                  <div className='text-center py-4'>
                    <div
                      className={`${LOADING_CONFIG.SPINNER_DEFAULT} text-primary`}
                      role='status'
                    >
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                    <p className='mt-2'>Loading more articles...</p>
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && (
                  <div className='latest__post-more text-center'>
                    <button
                      className={BUTTON_CONFIG.BTN_PRIMARY}
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      <span className='text'>
                        {loading ? 'Loading...' : 'Load More'}
                      </span>
                      <i className='far fa-plus' />
                    </button>
                  </div>
                )}

                {/* No More Data */}
                {!hasMore && displayedData.length > 0 && (
                  <div className='latest__post-more text-center'>
                    <p className='text-muted'>
                      You've reached the end! Showing all {filteredData.length}{' '}
                      articles in {category} category.
                    </p>
                    <Link
                      href={`/${category}`}
                      className={BUTTON_CONFIG.BTN_SECONDARY}
                    >
                      Back to First Page
                    </Link>
                  </div>
                )}

                {/* Pagination Info */}
                {displayedData.length > 0 && (
                  <div className='pagination-info text-center mt-4'>
                    <small className='text-muted'>
                      Page {currentPage} of {totalPages} | Showing{' '}
                      {displayedData.length} articles | Total:{' '}
                      {filteredData.length} articles in {category} category
                    </small>
                  </div>
                )}
              </div>

              <div className={GRID_CONFIG.SIDEBAR_COL}>
                <LatestSidebar />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PageErrorBoundary>
  );
}
