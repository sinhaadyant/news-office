import Link from "next/link";
import TrendingSlider from "@/components/slider/TrendingSlider";
import PopularSlider from "@/components/slider/PopularSlider";
import InteriroSlider from "@/components/slider/InteriroSlider";
import NftSlider from "@/components/slider/NftSlider";
import TechnologySlider from "@/components/slider/TechnologySlider";
import VerticalSider from "@/components/slider/VerticalSider";

const BlockRenderer = ({ blocks }) => {
  const renderBlock = (block) => {
    switch (block.block_name) {
      case "hero-banner":
        return (
          <section key={block.title} className="tgbanner__area">
            <div className="container">
              <div className="tgbanner__grid">
                <div className="tgbanner__post big-post">
                  <div className="tgbanner__thumb tgImage__hover">
                    <Link href={`/article/${block.featured_article}`}>
                      <img src="/assets/img/article/blog01.jpg" alt="img" />
                    </Link>
                  </div>
                  <div className="tgbanner__content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href="/blog">technology</Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href="/blog">alonso d.</Link>
                      </li>
                      <li>nov 21, 2022</li>
                    </ul>
                    <h2 className="title tgcommon__hover">
                      <Link href={`/article/${block.featured_article}`}>
                        {block.section_title}
                      </Link>
                    </h2>
                  </div>
                </div>
                <div className="tgbanner__side-post">
                  {block.articles.slice(1, 5).map((articleId, index) => (
                    <div key={index} className="tgbanner__post">
                      <div className="tgbanner__thumb tgImage__hover">
                        <Link href={`/article/${articleId}`}>
                          <img
                            src={`/assets/img/article/blog0${
                              articleId + 1
                            }.jpg`}
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="tgbanner__content">
                        <ul className="tgbanner__content-meta list-wrap">
                          <li className="category">
                            <Link href="/blog">technology</Link>
                          </li>
                          <li>nov 21, 2022</li>
                        </ul>
                        <h4 className="title tgcommon__hover">
                          <Link href={`/article/${articleId}`}>
                            Article {articleId} Title
                          </Link>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case "popular-posts":
        return (
          <section
            key={block.title}
            className="popular__post-area white-bg section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Popular</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container popular-active">
                  <PopularSlider />
                </div>
              </div>
            </div>
          </section>
        );

      case "trending-news":
        return (
          <section
            key={block.title}
            className={`trending-post-area section__hover-line pt-75 pb-80 ${
              block.background === "dark" ? "black-bg" : ""
            }`}
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Trending</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container trending-active">
                  <TrendingSlider showItem={block.show_item_count} />
                </div>
              </div>
            </div>
          </section>
        );

      case "categories":
        return (
          <section
            key={block.title}
            className="category__area section__hover-line pt-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">category</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="category__wrapper">
                {block.categories.map((category, index) => (
                  <div key={index} className="category__item">
                    <Link href={category.link}>
                      <img
                        src={`/assets/img/category/${category.image}`}
                        alt="img"
                      />
                      <span className="cat-name">{category.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "interior-section":
        return (
          <section
            key={block.title}
            className="interior__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Interior</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container interior-active">
                  <InteriroSlider />
                </div>
              </div>
            </div>
          </section>
        );

      case "travel-section":
        return (
          <section
            key={block.title}
            className="travel__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Travel</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="travel__grid">
                {block.articles.slice(0, 4).map((articleId, index) => (
                  <div key={index} className="travel__post">
                    <div className="travel__thumb tgImage__hover">
                      <Link href={`/article/${articleId}`}>
                        <img
                          src={`/assets/img/travel/travel_0${index + 1}.jpg`}
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="travel__content">
                      <ul className="travel__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">travel</Link>
                        </li>
                        <li>nov 21, 2022</li>
                      </ul>
                      <h4 className="title tgcommon__hover">
                        <Link href={`/article/${articleId}`}>
                          Travel Article {articleId}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "technology-section":
        return (
          <section
            key={block.title}
            className="technology__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Technology</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container technology-active">
                  <TechnologySlider />
                </div>
              </div>
            </div>
          </section>
        );

      case "nft-section":
        return (
          <section
            key={block.title}
            className="nft__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">NFT</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container nft-active">
                  <NftSlider />
                </div>
              </div>
            </div>
          </section>
        );

      case "lifestyle-section":
        return (
          <section
            key={block.title}
            className="lifestyle__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Lifestyle</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lifestyle__grid">
                {block.articles.slice(0, 4).map((articleId, index) => (
                  <div key={index} className="lifestyle__post">
                    <div className="lifestyle__thumb tgImage__hover">
                      <Link href={`/article/${articleId}`}>
                        <img
                          src={`/assets/img/lifestyle/life_style0${
                            index + 1
                          }.jpg`}
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="lifestyle__content">
                      <ul className="lifestyle__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">lifestyle</Link>
                        </li>
                        <li>nov 21, 2022</li>
                      </ul>
                      <h4 className="title tgcommon__hover">
                        <Link href={`/article/${articleId}`}>
                          Lifestyle Article {articleId}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "minimal-section":
        return (
          <section
            key={block.title}
            className="minimal__post-area section__hover-line pt-75 pb-75"
          >
            <div className="container">
              <div className="section__title-wrap mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">Minimal</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider">
                <div className="swiper-container minimal-active">
                  <VerticalSider />
                </div>
              </div>
            </div>
          </section>
        );

      case "handpicked-section":
        return (
          <section
            key={block.title}
            className={`hand-picked-area ${
              block.background === "dark" ? "black-bg" : ""
            } fix section__hover-line pt-75 pb-80`}
          >
            <div className="container">
              <div className="section__title-wrap section__title-white mb-40">
                <div className="row align-items-end">
                  <div className="col-sm-6">
                    <div className="section__title">
                      <span className="section__sub-title">hand-picked</span>
                      <h3 className="section__main-title">
                        {block.section_title}
                      </h3>
                    </div>
                  </div>
                  {block.show_view_all && (
                    <div className="col-sm-6">
                      <div className="section__read-more text-start text-sm-end">
                        <Link href={block.view_all_link}>
                          {block.view_all_text}{" "}
                          <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="trending__slider dark-post-slider">
                <div className="swiper-container handpicked-active">
                  <TrendingSlider showItem={block.show_item_count} />
                </div>
              </div>
            </div>
          </section>
        );

      case "newsletter-section":
        return (
          <section key={block.title} className="newsletter__area">
            <div className="container">
              <div className="newsletter__wrap">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="newsletter__content">
                      <h3 className="newsletter__title">
                        {block.newsletter.title}
                      </h3>
                      <p>{block.newsletter.description}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="newsletter__form">
                      <form>
                        <div className="newsletter__input">
                          <input
                            type="email"
                            placeholder={block.newsletter.placeholder}
                          />
                          <button type="submit" className="btn">
                            {block.newsletter.button_text}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return <>{blocks.map((block) => renderBlock(block))}</>;
};

export default BlockRenderer;
