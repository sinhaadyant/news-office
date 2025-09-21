import Link from "next/link";
import TrendingSlider from "@/components/slider/TrendingSlider";

export default function HandpickedSection({ blockData }) {
  return (
    <section className="hand-picked-area black-bg fix section__hover-line pt-75 pb-80">
      <div className="container">
        <div className="section__title-wrap section__title-white mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">hand-picked</span>
                <h3 className="section__main-title">More to Watch</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href="/blog">
                  Hand-Picked Post <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trending__slider dark-post-slider">
        <div className="swiper-container handpicked-active">
          <TrendingSlider showItem={6} />
        </div>
      </div>
    </section>
  );
}
