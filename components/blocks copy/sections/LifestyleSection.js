import Link from "next/link";
import { getArticleById } from "@/util/articleUtils";

const LifestyleSection = ({ blockData }) => {
  const articles = blockData.articles
    .map((id) => getArticleById(id))
    .filter(Boolean);

  // Return null if no articles found
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="lifestyle__post-area section__hover-line pt-75 pb-75">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Lifestyle</span>
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
        <div className="lifestyle__grid">
          {articles.slice(0, 4).map((article) => (
            <div key={article.id} className="lifestyle__post">
              <div className="lifestyle__thumb tgImage__hover">
                <Link href={`/article/${article.id}`}>
                  <img
                    src={`/assets/img/${article.group}/${article.img}`}
                    alt="img"
                  />
                </Link>
              </div>
              <div className="lifestyle__content">
                <ul className="lifestyle__content-meta list-wrap">
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
                <ul className="post__activity list-wrap">
                  <li>
                    <i className="fal fa-signal" /> 1.5k
                  </li>
                  <li>
                    <Link href={`/article/${article.id}`}>
                      <i className="fal fa-comment-dots" /> 150
                    </Link>
                  </li>
                  <li>
                    <i className="fal fa-share-alt" /> 32
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
