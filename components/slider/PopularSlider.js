import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink, getCategoryLink, getAuthorLink } from "@/util/urlUtils";
import PremiumBadge from "@/components/common/PremiumBadge";
import ComponentErrorBoundary from "@/components/common/ComponentErrorBoundary";

export default function PopularSlider({ articles = [] }) {
  // Ensure articles is an array
  const safeArticles = Array.isArray(articles) ? articles : [];
  return (
    <ComponentErrorBoundary componentName="popular slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".block-gallery-pagination",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1350: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="swiper-wrapper"
      >
        {safeArticles.slice(0, 6).map((item, i) => (
          <SwiperSlide key={i}>
            <div className="trending__post">
              <div className="trending__post-thumb tgImage__hover">
                <Link href="#" className="addWish">
                  <i className="fal fa-heart" />
                </Link>
                <Link
                  href={getArticleLink(item)}
                >
                  <img
                    src={`/assets/img/${item.group}/${item.img}`}
                    alt="img"
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
                    <Link href="/blog">Gaming</Link>
                  </li>
                  <li>
                    <span className="by">By</span>{" "}
                    <Link href="/blog">miranda h.</Link>
                  </li>
                  <li>nov 21, 2022</li>
                </ul>
                <h4 className="title tgcommon__hover">
                  <Link
                    href={getArticleLink(item)}
                  >
                    {item.title}
                  </Link>
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </ComponentErrorBoundary>
  );
}
