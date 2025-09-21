import Link from "next/link";
import PopularSlider from "@/components/slider/PopularSlider";

export default function PopularPosts({ blockData }) {
  // Fallback data if blockData is not provided
  const defaultBlockData = {
    section_title: "Popular Post",
    section_description: "Most read articles this week",
    show_view_all: true,
    view_all_text: "More Popular Post",
    view_all_link: "/blog",
    css_class: "popular__post-area section__hover-line pt-75 pb-75",
    articlesData: [],
  };

  const data = blockData || defaultBlockData;

  return (
    <section className={data.css_class}>
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Popular</span>
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
          <div className="swiper-container popular-active">
            <PopularSlider articles={data.articlesData} />
          </div>
        </div>
      </div>
    </section>
  );
}
