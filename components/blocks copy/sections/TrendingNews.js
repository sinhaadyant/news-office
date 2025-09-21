import React, { useState, useEffect } from "react";
import Link from "next/link";
import TrendingSlider from "@/components/slider/TrendingSlider";
import { getTrendingArticles, getAllArticles } from "@/util/articleUtils";

const TrendingNews = ({
  title = "More to Watch",
  subtitle = "hand-picked",
  showItem = 6,
  showMoreLink = "/blog",
  moreLinkText = "Hand-Picked Post",
  maxItems = 8,
  filterType = "trending", // "trending", "all", "category", "group"
  darkMode = true, // For the black background styling
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
      setError("Failed to load trending news");
    } finally {
      setLoading(false);
    }
  }, [filterType, maxItems]);

  // Dynamic class names based on darkMode prop
  const sectionClasses = `hand-picked-area ${
    darkMode ? "black-bg" : ""
  } fix section__hover-line pt-75 pb-80`;
  const titleClasses = `section__title-wrap ${
    darkMode ? "section__title-white" : ""
  } mb-40`;
  const sliderClasses = `trending__slider ${
    darkMode ? "dark-post-slider" : ""
  }`;

  if (loading) {
    return (
      <section className={sectionClasses}>
        <div className="container">
          <div className="text-center">
            <div
              className={`spinner-border ${darkMode ? "text-light" : ""}`}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={sectionClasses}>
        <div className="container">
          <div className="text-center">
            <div
              className={`alert ${darkMode ? "alert-warning" : "alert-danger"}`}
              role="alert"
            >
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className={sectionClasses}>
        <div className="container">
          <div className="text-center">
            <p className={darkMode ? "text-light" : "text-muted"}>
              No trending news available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClasses}>
      <div className="container">
        <div className={titleClasses}>
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
      </div>
      <div className={sliderClasses}>
        <div className="swiper-container handpicked-active">
          <TrendingSlider showItem={showItem} />
        </div>
      </div>
    </section>
  );
};

export default TrendingNews;
