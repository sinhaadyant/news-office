import Link from "next/link";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink, getCategoryLink, getAuthorLink } from "@/util/urlUtils";
import PremiumBadge from "@/components/common/PremiumBadge";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";
import EmptyState from "@/components/common/EmptyState";

export default function StoriesSection({ blockData }) {
  const articles = (blockData?.articlesData && Array.isArray(blockData.articlesData)) ? blockData.articlesData : [];
  const featuredArticles = articles.slice(0, 2);
  const smallArticles = articles.slice(2, 6);

  if (!articles || articles.length === 0) {
    return (
      <ComponentErrorBoundary componentName="stories section">
        <section className="stories-post-area section__hover-line pt-75 pb-40">
          <div className="container">
            <EmptyState 
              title="No Stories Available"
              message="No stories are available at the moment. Please check back later."
            />
          </div>
        </section>
      </ComponentErrorBoundary>
    );
  }

  return (
    <ComponentErrorBoundary componentName="stories section">
      <section className="stories-post-area section__hover-line pt-75 pb-40">
        <div className="container">
          <div className="section__title-wrap mb-40">
            <div className="row align-items-end">
              <div className="col-sm-6">
                <div className="section__title">
                  <span className="section__sub-title">Stories</span>
                  <h3 className="section__main-title">Popular Stories</h3>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href="/blog">
                    Stories Post <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-gutters-40">
            {featuredArticles.map((item, i) => (
              <div className="col-md-6" key={i}>
                <div className="stories-post__item">
                  <div className="stories-post__thumb tgImage__hover">
                    <Link href={getArticleLink(item)}>
                      <img
                        src={`/assets/img/${item.group}/${item.img}`}
                        alt={item.title}
                      />
                    </Link>
                    <div className='badge-container'>
                      <div className='badge-left'>
                        {item.trending && (
                          <div className='trending-badge'>
                            <span>🔥</span>
                          </div>
                        )}
                      </div>
                      <div className='badge-right'>
                        <PremiumBadge isPremium={item.isPremium} />
                      </div>
                    </div>
                  </div>
                  <div className="stories-post__content video__post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href={getCategoryLink(item.category)}>
                          {item.category}
                        </Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href={getAuthorLink(item.author)}>
                          {item.author}
                        </Link>
                      </li>
                      <li>{item.date}</li>
                    </ul>
                    <h3 className="title tgcommon__hover">
                      <Link href={getArticleLink(item)}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {smallArticles.length > 0 && (
            <div className="row">
              {smallArticles.map((item, i) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                  <div className="trending__post stories-small-post__item">
                    <div className="trending__post-thumb tgImage__hover">
                      <Link href="/#" className="addWish">
                        <i className="fal fa-heart" />
                      </Link>
                      <Link href={getArticleLink(item)}>
                        <img
                          src={`/assets/img/${item.group}/${item.img}`}
                          alt={item.title}
                        />
                      </Link>
                      <div className='badge-container'>
                        <div className='badge-left'>
                          {item.trending && (
                            <div className='trending-badge'>
                              <span>🔥</span>
                            </div>
                          )}
                        </div>
                        <div className='badge-right'>
                          <PremiumBadge isPremium={item.isPremium} />
                        </div>
                      </div>
                    </div>
                    <div className="trending__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href={getCategoryLink(item.category)}>
                            {item.category}
                          </Link>
                        </li>
                        <li>
                          <span className="by">By</span>{" "}
                          <Link href={getAuthorLink(item.author)}>
                            {item.author}
                          </Link>
                        </li>
                        <li>{item.date}</li>
                      </ul>
                      <h4 className="title tgcommon__hover">
                        <Link href={getArticleLink(item)}>
                          {item.title}
                        </Link>
                      </h4>
                      <ul className="post__activity list-wrap">
                        <li>
                          <i className="fal fa-signal" /> 1.5k
                        </li>
                        <li>
                          <Link href={getArticleLink(item)}>
                            <i className="fal fa-comment-dots" /> 150
                          </Link>
                        </li>
                        <li>
                          <i className="fal fa-share-alt" /> 32
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}
