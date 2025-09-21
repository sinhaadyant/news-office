import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getArticleById,
  getArticlesByGroup,
  getAllArticles,
} from "@/util/articleUtils";

const InteriorSection = ({
  blockData = null,
  contentType = "newsletter", // "newsletter", "interior-posts", "custom"
  title = "Get notified of the best deals on",
  subtitle = "newsletter",
  description = "our WordPress Themes",
  emailPlaceholder = "Email address",
  buttonText = "Subscribe",
  buttonIcon = "fas fa-paper-plane",
  newsletterIcon = "fas fa-envelope-open-text",
  darkMode = true,
  maxArticles = 6,
  showArticles = false,
  articles = [],
}) => {
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showArticles && articles.length === 0) {
      setLoading(true);
      try {
        let fetched = [];

        if (blockData && blockData.articles) {
          // Use blockData if provided
          fetched = blockData.articles
            .map((id) => getArticleById(id))
            .filter(Boolean);
        } else if (contentType === "interior-posts") {
          // Fetch interior articles by group
          fetched = getArticlesByGroup("interior").slice(0, maxArticles);
        } else {
          // Fetch general articles
          fetched = getAllArticles().slice(0, maxArticles);
        }

        setFetchedArticles(fetched);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    } else if (showArticles && articles.length > 0) {
      setFetchedArticles(articles);
    }
  }, [blockData, contentType, showArticles, articles, maxArticles]);

  // Dynamic class names based on darkMode prop
  const sectionClasses = `newsletter-style-two ${
    darkMode ? "black-bg" : ""
  } pt-80 pb-80`;

  return (
    <section className="newsletter-style-two black-bg pt-80 pb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="newsletter__title text-center mb-35">
              <div className="newsletter__title-icon">
                <i className="fas fa-envelope-open-text" />
              </div>
              <span className="sub-title">newsletter</span>
              <h4 className="title">
                Get notified of the best deals on <br /> our WordPress Themes
              </h4>
            </div>
            <div className="newsletter__form-wrap text-center">
              <form action="#" className="newsletter__form">
                <div className="newsletter__form-grp">
                  <input type="email" placeholder="Email address" required />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      I agree that my submitted data is being collected and
                      stored.
                    </label>
                  </div>
                </div>
                <button className="btn" type="submit">
                  <span className="text">Subscribe</span>
                  <i className="fas fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSection;
