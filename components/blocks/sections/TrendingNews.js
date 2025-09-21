import Link from "next/link";
import TrendingSlider from "@/components/slider/TrendingSlider";

export default function TrendingNews({ blockData }) {
  // Fallback data if blockData is not provided
  const defaultBlockData = {
    section_title: "Trending News",
    section_description: "What's trending right now",
    show_view_all: true,
    view_all_text: "More Post",
    view_all_link: "/blog",
    css_class: "trending-post-area section__hover-line pt-25",
    show_item_count: 4,
    articlesData: [],
  };

  const data = blockData || defaultBlockData;
  const sectionClass =
    data.background === "dark" ? `${data.css_class} black-bg` : data.css_class;

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Popular Posts</span>
                <h3 className="section__main-title">{data.section_title}</h3>
                {data.section_description && (
                  <p className="section__description">
                    {data.section_description}
                  </p>
                )}
              </div>
            </div>
            {data.show_view_all && (
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href={data.view_all_link}>
                    {data.view_all_text}{" "}
                    <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="trending__slider">
          <div className="swiper-container trending-active">
            <TrendingSlider
              showItem={data.show_item_count}
              articles={data.articlesData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
