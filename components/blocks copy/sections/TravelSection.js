import Link from "next/link";
import { getArticleById } from "@/util/articleUtils";

const TravelSection = ({ blockData }) => {
  const articles = blockData.articles
    .map((id) => getArticleById(id))
    .filter(Boolean);
  const featuredArticle = getArticleById(blockData.featured_article);
  const gridArticles = articles.filter(
    (article) => article.id !== blockData.featured_article
  );

  // Return null if no featured article found
  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="travel__post-area section__hover-line pt-75 pb-75">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Travel</span>
                <h3 className="section__main-title">
                  {blockData.section_title}
                </h3>
              </div>
            </div>
            {blockData.show_view_all && (
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href={blockData.view_all_link}>
                    {blockData.view_all_text}{" "}
                    <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="travel__grid">
          {/* Featured Article */}
          <div className="travel__post featured">
            <div className="travel__thumb tgImage__hover">
              <Link href={`/article/${featuredArticle.id}`}>
                <img
                  src={`/assets/img/${featuredArticle.group}/${featuredArticle.img}`}
                  alt="img"
                />
              </Link>
            </div>
            <div className="travel__content">
              <ul className="travel__content-meta list-wrap">
                <li className="category">
                  <Link
                    href={`/blog?category=${featuredArticle.category.toLowerCase()}`}
                  >
                    {featuredArticle.category}
                  </Link>
                </li>
                <li>{featuredArticle.date}</li>
              </ul>
              <h3 className="title tgcommon__hover">
                <Link href={`/article/${featuredArticle.id}`}>
                  {featuredArticle.title}
                </Link>
              </h3>
            </div>
          </div>

          {/* Grid Articles */}
          {gridArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="travel__post">
              <div className="travel__thumb tgImage__hover">
                <Link href={`/article/${article.id}`}>
                  <img
                    src={`/assets/img/${article.group}/${article.img}`}
                    alt="img"
                  />
                </Link>
              </div>
              <div className="travel__content">
                <ul className="travel__content-meta list-wrap">
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
    </section>
  );
};

export default TravelSection;
