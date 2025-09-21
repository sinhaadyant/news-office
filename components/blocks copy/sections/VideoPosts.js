import Link from "next/link";
import { getArticleById } from "@/util/articleUtils";
import { useState } from "react";
import ModalVideo from "react-modal-video";

const VideoPosts = ({ blockData }) => {
  const [isOpen, setOpen] = useState(false);
  const articles = blockData.articles
    .map((id) => getArticleById(id))
    .filter(Boolean);
  const featuredArticle = getArticleById(blockData.featured_article);
  const sideArticles = articles.filter(
    (article) => article.id !== blockData.featured_article
  );

  // Return null if no featured article found
  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="video-post-area section__hover-line white-bg pt-75 pb-80">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Video</span>
                <h3 className="section__main-title">Recent Video Post</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href="/blog">
                  More Video Post <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="video__post-item big-post">
              <div className="video__post-thumb">
                <Link href={`/article/${featuredArticle.id}`}>
                  <img
                    src={`/assets/img/${featuredArticle.group}/${featuredArticle.img}`}
                    alt="img"
                  />
                </Link>
                <a onClick={() => setOpen(true)} className="popup-video">
                  <i className="fas fa-play" />
                </a>
              </div>
              <div className="video__post-content">
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
                <h3 className="title tgcommon__hover">
                  <Link href={`/article/${featuredArticle.id}`}>
                    {featuredArticle.title}
                  </Link>
                </h3>
              </div>
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId="hAP2QF--2Dg"
                onClose={() => setOpen(false)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            {sideArticles.map((article) => (
              <div className="video__post-item side-post" key={article.id}>
                <div className="video__post-thumb tgImage__hover">
                  <a onClick={() => setOpen(true)} className="popup-video">
                    <img
                      src={`/assets/img/${article.group}/${article.img}`}
                      alt="img"
                    />
                    <i className="fas fa-play" />
                  </a>
                </div>
                <div className="video__post-content">
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
                  <h3 className="title tgcommon__hover">
                    <Link href={`/article/${article.id}`}>{article.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPosts;
