import Link from "next/link";
import { getArticleById } from "@/util/articleUtils";

const HeroBanner = ({ blockData }) => {
  const featuredArticle = getArticleById(blockData.featured_article);
  const sideArticles = blockData.articles
    .slice(1, 5)
    .map((id) => getArticleById(id))
    .filter(Boolean);

  // Return null if no featured article found
  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="tgbanner__area">
      <div className="container">
        <div className="tgbanner__grid">
          {/* Featured Article */}
          <div className="tgbanner__post big-post">
            <div className="tgbanner__thumb tgImage__hover">
              <Link href={`/article/${featuredArticle.id}`}>
                <img
                  src={`/assets/img/${featuredArticle.group}/${featuredArticle.img}`}
                  alt="img"
                />
              </Link>
            </div>
            <div className="tgbanner__content">
              <ul className="tgbanner__content-meta list-wrap">
                <li className="category">
                  <Link
                    href={`/blog?category=${featuredArticle.category.toLowerCase()}`}
                  >
                    {featuredArticle.category}
                  </Link>
                </li>
                <li>
                  <span className="by">By</span>{" "}
                  <Link
                    href={`/author/${featuredArticle.author
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {featuredArticle.author}
                  </Link>
                </li>
                <li>{featuredArticle.date}</li>
              </ul>
              <h2 className="title tgcommon__hover">
                <Link href={`/article/${featuredArticle.id}`}>
                  {featuredArticle.title}
                </Link>
              </h2>
            </div>
          </div>

          {/* Side Articles */}
          <div className="tgbanner__side-post">
            {sideArticles.map((article, index) => (
              <div key={article.id} className="tgbanner__post">
                <div className="tgbanner__thumb tgImage__hover">
                  <Link href={`/article/${article.id}`}>
                    <img
                      src={`/assets/img/${article.group}/${article.img}`}
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="tgbanner__content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link
                        href={`/blog?category=${article.category.toLowerCase()}`}
                      >
                        {article.category}
                      </Link>
                    </li>
                    <li>{article.date}</li>
                  </ul>
                  <h4 className="title tgcommon__hover">
                    <Link href={`/article/${article.id}`}>{article.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
