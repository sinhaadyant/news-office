import React, { useState, useEffect } from "react";
import Link from "next/link";
import TrendingSlider from "@/components/slider/TrendingSlider";
import { getTrendingArticles, getAllArticles } from "@/util/articleUtils";

const PopularPosts = ({
  title = "Trending News",
  subtitle = "Popular Posts",
  showItem = 4,
  showMoreLink = "/blog",
  moreLinkText = "More Post",
  maxItems = 8,
  filterType = "trending", // "trending", "all", "category", "group"
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      let fetchedArticles = [];

      switch (filterType) {
        case "trending":
          fetchedArticles = getTrendingArticles();
          break;
        case "all":
          fetchedArticles = getAllArticles();
          break;
        default:
          fetchedArticles = getTrendingArticles();
      }

      // Limit the number of articles
      const limitedArticles = fetchedArticles.slice(0, maxItems);
      setArticles(limitedArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load popular posts");
    } finally {
      setLoading(false);
    }
  }, [filterType, maxItems]);

  if (loading) {
    return (
      <section className="trending-post-area section__hover-line pt-25">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="trending-post-area section__hover-line pt-25">
        <div className="container">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="trending-post-area section__hover-line pt-25">
        <div className="container">
          <div className="text-center">
            <p className="text-muted">
              No popular posts available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="trending-post-area section__hover-line pt-25">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">{subtitle}</span>
                <h3 className="section__main-title">{title}</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href={showMoreLink}>
                  {moreLinkText} <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="trending__slider">
          <div className="swiper-container trending-active">
            <TrendingSlider showItem={showItem} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPosts;
