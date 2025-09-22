import Link from "next/link";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink, getCategoryLink, getAuthorLink } from "@/util/urlUtils";
import PremiumBadge from "@/components/common/PremiumBadge";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";
import EmptyState from "@/components/common/EmptyState";

export default function HandpickedPosts({ blockData }) {
  const articles = (blockData?.articlesData && Array.isArray(blockData.articlesData)) ? blockData.articlesData : [];
  const featuredArticle = articles[0] || null;
  const sideArticles = articles.slice(1, 4);

  if (!articles || articles.length === 0) {
    return (
      <ComponentErrorBoundary componentName="handpicked posts">
        <section className="handpicked-post-area section__hover-line pt-75 pb-50">
          <div className="container">
            <EmptyState 
              title="No Handpicked Posts"
              message="No handpicked posts are available at the moment. Please check back later."
            />
          </div>
        </section>
      </ComponentErrorBoundary>
    );
  }

  return (
    <ComponentErrorBoundary componentName="handpicked posts">
      <section className="handpicked-post-area section__hover-line pt-75 pb-50">
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
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              {featuredArticle && (
                <div className="handpicked__item big-post">
                  <div className="handpicked__thumb tgImage__hover">
                    <Link href={getArticleLink(featuredArticle)}>
                      <img 
                        src={`/assets/img/${featuredArticle.group}/${featuredArticle.img}`} 
                        alt={featuredArticle.title} 
                      />
                    </Link>
                    <div className='badge-container'>
                      <div className='badge-left'>
                        {featuredArticle.trending && (
                          <div className='trending-badge'>
                            <span>🔥</span>
                          </div>
                        )}
                      </div>
                      <div className='badge-right'>
                        <PremiumBadge isPremium={featuredArticle.isPremium} />
                      </div>
                    </div>
                  </div>
                  <div className="handpicked__content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href={getCategoryLink(featuredArticle.category)}>
                          {featuredArticle.category}
                        </Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href={getAuthorLink(featuredArticle.author)}>
                          {featuredArticle.author}
                        </Link>
                      </li>
                      <li>{featuredArticle.date}</li>
                    </ul>
                    <h2 className="title tgcommon__hover">
                      <Link href={getArticleLink(featuredArticle)}>
                        {featuredArticle.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              )}
            </div>
            <div className="col-xl-6">
              <div className="handpicked__sidebar-post">
                <div className="row">
                  {sideArticles.map((item, i) => (
                    <div className="col-xl-6 col-lg-4 col-md-6" key={i}>
                      <div className="handpicked__item small-post">
                        <div className="handpicked__thumb tgImage__hover">
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
                        <div className="handpicked__content">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}
