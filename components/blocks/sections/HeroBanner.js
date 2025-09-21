import TechnologySlider from "@/components/slider/TechnologySlider";

export default function HeroBanner({ blockData }) {
  return (
    <section className={blockData?.css_class || "tgslider__area-four pt-20"}>
      <div className="container">
        <div className="tgslider__top">
          <div className="row">
            <div className="col-lg-9">
              <div className="tgslider__trending-post">
                <h4 className="title">
                  {blockData?.section_title || "Trending:"}
                </h4>
              </div>
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <div className="tgslider__nav" />
            </div>
          </div>
        </div>
        <div className="tgslider__wrapper">
          <TechnologySlider blockData={blockData} />
        </div>
      </div>
    </section>
  );
}
