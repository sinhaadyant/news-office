import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthorSidebar from '@/components/elements/AuthorSidebar';
import Layout from '@/components/layout/Layout';
import PageErrorBoundary from '@/components/common/PageErrorBoundary';
import {
  AuthorSkeleton,
  ArticleCardSkeleton,
} from '@/components/common/SkeletonLoaders';
import { AdBlockBannerPackage } from '@/components/common/AdBlockBannerPackage';
import AdBlock from '@/components/ads/AdBlock';
import PremiumBadge from '@/components/common/PremiumBadge';
import data from '@/util/blogData';
import { generateSlug } from '@/util/articleUtils';
import {
  getCategoryLink,
  getAuthorLink,
  getArticleLink,
  normalizeAuthorName,
  getDisplayName,
} from '@/util/urlUtils';
import {
  PAGINATION_CONFIG,
  LAYOUT_CONFIG,
  GRID_CONFIG,
  SECTION_CONFIG,
  BUTTON_CONFIG,
  LOADING_CONFIG,
} from '@/constants/main';

export default function AuthorPage() {
  const router = useRouter();
  const { author, page } = router.query;

  const pagination = PAGINATION_CONFIG.CATEGORY_ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authorData, setAuthorData] = useState([]);

  // Filter data by author
  const filteredData = data.filter(
    item => normalizeAuthorName(item.author) === author
  );

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / pagination);

  // Get author info from first article (if exists)
  const authorInfo =
    filteredData.length > 0
      ? {
          name: filteredData[0].author,
          displayName: getDisplayName(author || ''),
          totalArticles: filteredData.length,
          firstArticleDate: filteredData[filteredData.length - 1]?.date,
          lastArticleDate: filteredData[0]?.date,
        }
      : null;

  // Initialize page and validate author
  useEffect(() => {
    if (!author) {
      setIsInitialized(true);
      return;
    }

    if (page && !isNaN(parseInt(page))) {
      const pageNum = parseInt(page);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
        setIsInitialized(true);
      } else {
        // Invalid page number - redirect to author page 1
        router.replace(`/author/${author}`);
        return;
      }
    } else {
      // No page parameter - start from page 1
      setIsInitialized(true);
    }
  }, [author, page, totalPages, router]);

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
    }
  }, [loading, hasMore, currentPage]);

  // Add scroll-based functionality for resetting to author page 1
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled to top, reset to show only first page of author
      if (window.scrollY === 0 && displayedData.length > pagination) {
        setCurrentPage(1);
        setDisplayedData(filteredData.slice(0, pagination));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedData.length, pagination, filteredData]);

  // Function to generate description for articles that don't have one
  const generateDescription = article => {
    const descriptions = [
      'Discover the latest insights and trends in this fascinating topic.',
      'Explore new perspectives and cutting-edge developments in this field.',
      'Learn about the most recent updates and innovations in this area.',
      'Stay informed with the latest news and analysis on this subject.',
      'Get the inside scoop on recent developments and future prospects.',
    ];

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
                <AuthorSkeleton />
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
    <PageErrorBoundary pageName='author page'>
      <Layout
        headerStyle={LAYOUT_CONFIG.HEADER_STYLE_LATEST}
        footerStyle={LAYOUT_CONFIG.FOOTER_STYLE_LATEST}
        footerClass={LAYOUT_CONFIG.FOOTER_CLASS_LATEST}
        logoWhite={LAYOUT_CONFIG.LOGO_WHITE_LATEST}
      >
        {/* AdBlock Warning Banner */}
        <AdBlockBannerPackage
          message='Support our authors by disabling your ad blocker. Your support helps us create quality content.'
          onDismiss={() => console.log('Author banner dismissed')}
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
                      {authorInfo ? authorInfo.displayName : 'Author'}
                    </li>
                  </ol>
                </nav>

                {/* Author Profile Section */}
                {authorInfo && (
                  <div className='blog-avatar-wrap mb-40'>
                    <div className='blog-avatar-img'>
                      <Link href='#'>
                        <i className='far fa-check' />
                        <img
                          src='/assets/img/others/avatar.png'
                          alt={authorInfo.displayName}
                        />
                      </Link>
                    </div>
                    <div className='blog-avatar-content'>
                      <h5 className='name'>{authorInfo.displayName}</h5>
                      <span className='designation'>Author</span>
                      <p>
                        {authorInfo.displayName} is a talented writer at Sarsa
                        and has been covering emerging technologies and various
                        topics since 2022. They cover a wide variety of news
                        from early and late stage developments to massive
                        industry insights.
                      </p>
                      <div className='author-stats'>
                        <div className='row'>
                          <div className='col-md-4'>
                            <div className='stat-item'>
                              <h6>{authorInfo.totalArticles}</h6>
                              <span>Articles</span>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='stat-item'>
                              <h6>
                                {
                                  new Set(
                                    filteredData.map(item => item.category)
                                  ).size
                                }
                              </h6>
                              <span>Categories</span>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='stat-item'>
                              <h6>{authorInfo.firstArticleDate}</h6>
                              <span>First Article</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className='section__title-wrap mb-40'>
                  <div className='row align-items-end'>
                    <div className='col-sm-6'>
                      <div className='section__title'>
                        <span className='section__sub-title'>Author</span>
                        <h3 className='section__main-title'>
                          {authorInfo ? authorInfo.displayName : 'Author'}
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
                            {filteredData.length} articles by{' '}
                            {authorInfo?.displayName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='section__read-more text-start text-sm-end'>
                        <Link href='/latest-news'>
                          View All Authors{' '}
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
                            <i className='fas fa-user-slash fa-3x text-muted mb-3'></i>
                            <h4 className='text-muted'>Author Not Found</h4>
                            <p className='text-muted'>
                              {author
                                ? `No articles found by author "${getDisplayName(
                                    author
                                  )}".`
                                : 'No articles found by this author.'}
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
                            href={`/author/${author}`}
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
                          {item.trending && (
                            <li>
                              <span className='trending-badge'>
                                🔥 Trending
                              </span>
                            </li>
                          )}
                          <li>
                            <PremiumBadge isPremium={item.isPremium} />
                          </li>
                        </ul>
                        <h3 className='title tgcommon__hover'>
                          <Link href={getArticleLink(item)}>{item.title}</Link>
                        </h3>
                        <p>{generateDescription(item)}</p>
                        <ul className='post__activity list-wrap'>
                          <li>
                            <i className='fal fa-signal' />{' '}
                            {Math.floor(Math.random() * 5) + 1}k
                          </li>
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
                        id={`author-ad-${Math.floor(i / 5)}`}
                        slot={`author-${author}-ad-${Math.floor(i / 5)}`}
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
                      articles by {authorInfo?.displayName}.
                    </p>
                    <Link
                      href={`/author/${author}`}
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
                      {filteredData.length} articles by{' '}
                      {authorInfo?.displayName}
                    </small>
                  </div>
                )}
              </div>

              <div className={GRID_CONFIG.SIDEBAR_COL}>
                <AuthorSidebar />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PageErrorBoundary>
  );
}
