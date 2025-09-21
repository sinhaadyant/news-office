import Link from "next/link";
import { getArticleById } from "@/util/articleUtils";

const FeaturedPosts = ({ blockData }) => {
  const articles = blockData.articles
    .map((id) => getArticleById(id))
    .filter(Boolean);

  // Return null if no articles found
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="featured-post-area section__hover-line pt-75">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Featured</span>
                <h3 className="section__main-title">Editor Choice</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href="/blog">
                  More Featured Post <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.map((article) => (
            <div className="col-lg-4 col-sm-6" key={article.id}>
              <div className="featured__post">
                <div
                  className="featured__thumb"
                  style={{
                    backgroundImage: `url(/assets/img/${article.group}/${article.img})`,
                  }}
                >
                  {String(article.id).padStart(2, "0")}
                </div>
                <div className="featured__content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link
                        href={`/blog?category=${article.category.toLowerCase()}`}
                      >
                        {article.category}
                      </Link>
                    </li>
                    <li>
                      <span className="by">By</span>{" "}
                      <Link
                        href={`/author/${article.author
                          .replace(" ", "-")
                          .toLowerCase()}`}
                      >
                        {article.author}
                      </Link>
                    </li>
                  </ul>
                  <h4 className="title tgcommon__hover">
                    <Link href={`/article/${article.id}`}>{article.title}</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
