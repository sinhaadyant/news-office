import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InstagramSidebarSlider from "../slider/InstagramSidebarSlider";
import SidePostSlider from "../slider/SidePostSlider";
import data from "@/util/blogData";
import {
  getCategoryLink,
  getAuthorLink,
  normalizeAuthorName,
  getDisplayName,
} from "@/util/urlUtils";

export default function AuthorSidebar() {
  const router = useRouter();
  const { author } = router.query;
  const [authorStats, setAuthorStats] = useState(null);
  const [relatedAuthors, setRelatedAuthors] = useState([]);

  // Calculate author statistics and related authors
  useEffect(() => {
    if (author) {
      // Filter articles by current author
      const authorArticles = data.filter(
        (item) => normalizeAuthorName(item.author) === author
      );

      // Get unique categories for this author
      const authorCategories = [
        ...new Set(authorArticles.map((item) => item.category)),
      ];

      // Get all unique authors
      const allAuthors = [...new Set(data.map((item) => item.author))];

      // Get other authors (excluding current author)
      const otherAuthors = allAuthors
        .filter((auth) => normalizeAuthorName(auth) !== author)
        .map((auth) => {
          const authArticles = data.filter((item) => item.author === auth);
          return {
            name: auth,
            displayName: auth,
            articleCount: authArticles.length,
            link: getAuthorLink(auth),
          };
        })
        .sort((a, b) => b.articleCount - a.articleCount)
        .slice(0, 5); // Top 5 other authors

      setAuthorStats({
        totalArticles: authorArticles.length,
        categories: authorCategories,
        firstArticleDate: authorArticles[authorArticles.length - 1]?.date,
        lastArticleDate: authorArticles[0]?.date,
      });

      setRelatedAuthors(otherAuthors);
    }
  }, [author]);

  return (
    <>
      <aside className="blog-sidebar">
        {/* Author Statistics */}
        {authorStats && (
          <div className="widget sidebar-widget">
            <h4 className="widget-title">Author Statistics</h4>
            <div className="author-stats-widget">
              <div className="stat-item">
                <div className="stat-number">{authorStats.totalArticles}</div>
                <div className="stat-label">Total Articles</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {authorStats.categories.length}
                </div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">First Article</div>
                <div className="stat-date">{authorStats.firstArticleDate}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Latest Article</div>
                <div className="stat-date">{authorStats.lastArticleDate}</div>
              </div>
            </div>
          </div>
        )}

        {/* Author Categories */}
        {authorStats && authorStats.categories.length > 0 && (
          <div className="widget sidebar-widget widget_categories">
            <h4 className="widget-title">Author's Categories</h4>
            <ul className="list-wrap">
              {authorStats.categories.map((category, index) => {
                const categoryArticles = data.filter(
                  (item) =>
                    item.category === category &&
                    normalizeAuthorName(item.author) === author
                );
                const categoryImages = {
                  Gaming: "side_category01.jpg",
                  Tech: "side_category02.jpg",
                  Movie: "side_category03.jpg",
                  Sports: "side_category04.jpg",
                  NFT: "side_category05.jpg",
                  Lifestyle: "side_category01.jpg",
                };

                return (
                  <li key={category}>
                    <div className="thumb">
                      <Link href={getCategoryLink(category)}>
                        <img
                          src={`/assets/img/category/${
                            categoryImages[category] || "side_category01.jpg"
                          }`}
                          alt={category}
                        />
                      </Link>
                    </div>
                    <Link href={getCategoryLink(category)}>
                      {category.toLowerCase()}
                    </Link>
                    <span className="float-right">
                      {categoryArticles.length}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Related Authors */}
        {relatedAuthors.length > 0 && (
          <div className="widget sidebar-widget">
            <h4 className="widget-title">Other Authors</h4>
            <ul className="list-wrap">
              {relatedAuthors.map((author, index) => (
                <li key={author.name}>
                  <div className="author-info">
                    <Link href={author.link} className="author-name">
                      {author.displayName}
                    </Link>
                    <span className="author-count">
                      {author.articleCount} articles
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trending Articles */}
        <div className="widget sidebar-widget">
          <h4 className="widget-title">Trending Articles</h4>
          <SidePostSlider />
        </div>

        {/* Latest Articles */}
        <div className="widget sidebar-widget">
          <h4 className="widget-title">Latest Articles</h4>
          <SidePostSlider />
        </div>

        {/* Instagram Feeds */}
        <div className="widget sidebar-widget">
          <h4 className="widget-title">Instagram Feeds</h4>
          <div className="sidebarInsta__wrap">
            <div className="sidebarInsta__top">
              <div className="sidebarInsta__logo">
                <img src="/assets/img/instagram/insta_logo.png" alt="img" />
              </div>
              <div className="sidebarInsta__info">
                <h6 className="name">
                  <Link href="#">ins.co/sarso.co</Link>
                </h6>
                <span className="designation">Code Supply Co.</span>
              </div>
            </div>
            <div className="sidebarInsta__slider-wrap">
              <div className="swiper-container sidebarInsta-active">
                <InstagramSidebarSlider />
              </div>
              <div className="swiper-container sidebarInsta-active-2" dir="rtl">
                <InstagramSidebarSlider />
              </div>
            </div>
            <div className="sidebarInsta__bottom">
              <Link href="#" className="btn">
                <i className="fab fa-instagram" />
                <span className="text">Follow Us</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
