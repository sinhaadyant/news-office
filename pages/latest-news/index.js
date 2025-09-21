import LatestSidebar from "@/components/elements/LatestSidebar";
import Layout from "@/components/layout/Layout";
import data from "@/util/blogData";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { generateSlug } from "@/util/articleUtils";
import {
  getCategoryLink,
  getAuthorLink,
  getArticleLink,
} from "@/util/urlUtils";
import {
  PAGINATION_CONFIG,
  LAYOUT_CONFIG,
  GRID_CONFIG,
  SECTION_CONFIG,
  BUTTON_CONFIG,
  LOADING_CONFIG,
} from "@/constants/main";

export default function LatestPage() {
  const router = useRouter();
  const { page } = router.query;

  const pagination = PAGINATION_CONFIG.LATEST_NEWS_ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [articleData, setArticleData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pagination);

  // Initialize page from URL or default to 1
  useEffect(() => {
    if (page && !isNaN(parseInt(page))) {
      const pageNum = parseInt(page);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
        setIsInitialized(true);
      } else {
        // Invalid page number - redirect to /latest-news
        router.replace("/latest-news");
        return;
      }
    } else {
      // No page parameter - start from page 1
      setIsInitialized(true);
    }
  }, [page, totalPages, router]);

  // Load initial data based on current page
  useEffect(() => {
    if (isInitialized) {
      loadPageData(currentPage);
    }
  }, [currentPage, isInitialized]);

  // Function to load data for a specific page
  const loadPageData = useCallback(
    (pageNum) => {
      setLoading(true);
      setError(null);

      try {
        const startIndex = (pageNum - 1) * pagination;
        const endIndex = startIndex + pagination;
        const pageData = data.slice(startIndex, endIndex);

        if (pageNum === 1) {
          // First page - replace data
          setDisplayedData(pageData);
        } else {
          // Subsequent pages - append data
          setDisplayedData((prev) => [...prev, ...pageData]);
        }

        // Check if there's more data
        setHasMore(endIndex < data.length);
      } catch (err) {
        setError("Failed to load articles");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination]
  );

  // Load more function
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Update URL to reflect the current state without navigation
      // router.replace(`/latest-news/${nextPage}`, undefined, { shallow: true });
    }
  }, [loading, hasMore, currentPage, router]);

  // Add scroll-based functionality for resetting to latest news
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled to top, reset to show only latest news (page 1)
      if (window.scrollY === 0 && displayedData.length > pagination) {
        setCurrentPage(1);
        setDisplayedData(data.slice(0, pagination));
        // router.replace("/latest-news", undefined, { shallow: true });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedData.length, pagination, router]);

  // Function to generate description for articles that don't have one
  const generateDescription = (article) => {
    // You can customize this logic based on your needs
    const descriptions = [
      "Discover the latest insights and trends in this fascinating topic.",
      "Explore new perspectives and cutting-edge developments in this field.",
      "Learn about the most recent updates and innovations in this area.",
      "Stay informed with the latest news and analysis on this subject.",
      "Get the inside scoop on recent developments and future prospects.",
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
            <div className="text-center">
              <div
                className={`${LOADING_CONFIG.SPINNER_DEFAULT} text-primary`}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading latest news...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <>
      <Layout
        headerStyle={LAYOUT_CONFIG.HEADER_STYLE_LATEST}
        footerStyle={LAYOUT_CONFIG.FOOTER_STYLE_LATEST}
        footerClass={LAYOUT_CONFIG.FOOTER_CLASS_LATEST}
        logoWhite={LAYOUT_CONFIG.LOGO_WHITE_LATEST}
      >
        <section className={SECTION_CONFIG.LATEST_POST_AREA}>
          <div className={GRID_CONFIG.CONTAINER_DEFAULT}>
            <div className={GRID_CONFIG.ROW_CENTER}>
              <div className={GRID_CONFIG.MAIN_CONTENT_COL}>
                <div className="section__title-wrap mb-40">
                  <div className="row align-items-end">
                    <div className="col-sm-6">
                      <div className="section__title">
                        <span className="section__sub-title">Latest</span>
                        <h3 className="section__main-title">Latest News</h3>
                        {currentPage > 1 && (
                          <p className="section__description">
                            Showing page {currentPage} of {totalPages}(
                            {displayedData.length} of {data.length} articles)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error State */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => loadPageData(currentPage)}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Articles List */}
                <div className="latest__post-wrap">
                  {displayedData.length === 0 && !loading && (
                    <div className="text-center py-5">
                      <p className="text-muted">No articles found.</p>
                      <Link
                        href="/latest-news"
                        className={BUTTON_CONFIG.BTN_SECONDARY}
                      >
                        Back to Latest News
                      </Link>
                    </div>
                  )}
                  {displayedData.map((item, i) => (
                    <div className="latest__post-item" key={`${item.id}-${i}`}>
                      <div className="latest__post-thumb tgImage__hover">
                        <Link href={getArticleLink(item)}>
                          <img
                            src={`/assets/img/${item.group}/${item.img}`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="latest__post-content">
                        <ul className="tgbanner__content-meta list-wrap">
                          <li className="category">
                            <Link href={getCategoryLink(item.category)}>
                              {item.category.toLowerCase()}
                            </Link>
                          </li>
                          <li>
                            <span className="by">By</span>{" "}
                            <Link href={getAuthorLink(item.author)}>
                              {item.author}
                            </Link>
                          </li>
                          <li>{item.date}</li>
                          {item.trending && (
                            <li>
                              <span className="trending-badge">
                                🔥 Trending
                              </span>
                            </li>
                          )}
                        </ul>
                        <h3 className="title tgcommon__hover">
                          <Link href={getArticleLink(item)}>{item.title}</Link>
                        </h3>
                        <p>{generateDescription(item)}</p>
                        <ul className="post__activity list-wrap">
                          <li>
                            <i className="fal fa-signal" />{" "}
                            {Math.floor(Math.random() * 5) + 1}k
                          </li>
                          <li>
                            <Link href={getArticleLink(item)}>
                              <i className="fal fa-comment-dots" />{" "}
                              {Math.floor(Math.random() * 100) + 50}
                            </Link>
                          </li>
                          <li>
                            <i className="fal fa-share-alt" />{" "}
                            {Math.floor(Math.random() * 20) + 10}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="text-center py-4">
                    <div
                      className={`${LOADING_CONFIG.SPINNER_DEFAULT} text-primary`}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading more articles...</p>
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && (
                  <div className="latest__post-more text-center">
                    <button
                      className={BUTTON_CONFIG.BTN_PRIMARY}
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      <span className="text">
                        {loading ? "Loading..." : "Load More"}
                      </span>
                      <i className="far fa-plus" />
                    </button>
                  </div>
                )}

                {/* No More Data */}
                {!hasMore && displayedData.length > 0 && (
                  <div className="latest__post-more text-center">
                    <p className="text-muted">
                      You've reached the end! Showing all {data.length}{" "}
                      articles.
                    </p>
                    <Link
                      href="/latest-news"
                      className="btn btn-outline-primary"
                    >
                      Back to First Page
                    </Link>
                  </div>
                )}

                {/* Pagination Info */}
                {displayedData.length > 0 && (
                  <div className="pagination-info text-center mt-4">
                    <small className="text-muted">
                      Page {currentPage} of {totalPages} | Showing{" "}
                      {displayedData.length} articles | Total: {data.length}{" "}
                      articles
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
    </>
  );
}
