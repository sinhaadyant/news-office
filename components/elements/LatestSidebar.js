import Link from "next/link";
import InstagramSidebarSlider from "../slider/InstagramSidebarSlider";
import SidePostSlider from "../slider/SidePostSlider";
import { getTrendingCategories } from "../../util/articleUtils";

export default function LatestSidebar() {
  // Get trending categories dynamically
  const trendingCategories = getTrendingCategories();

  return (
    <>
      <aside className="blog-sidebar">
        <div className="widget sidebar-widget">
          <SidePostSlider />
        </div>
        <div className="widget sidebar-widget widget_categories">
          <h4 className="widget-title">Trending Category</h4>
          <ul className="list-wrap">
            {trendingCategories.map((category, index) => (
              <li key={index}>
                <div className="thumb">
                  <Link href={category.link}>
                    <img
                      src={`/assets/img/category/${category.image}`}
                      alt={category.displayName}
                    />
                  </Link>
                </div>
                <Link href={category.link}>{category.displayName}</Link>
                <span className="float-right">{category.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget sidebar-widget">
          <SidePostSlider />
        </div>
        <div className="widget sidebar-widget">
          <h4 className="widget-title">Instagram Feeds</h4>
          <div className="sidebarInsta__wrap">
            <div className="sidebarInsta__top">
              <div className="sidebarInsta__logo">
                <img src="/assets/img/instagram/insta_logo.png" alt="img" />
              </div>
              <div className="sidebarInsta__info">
                <h6 className="name">
                  <Link href="#">ins.co/sarso.co</Link>
                </h6>
                <span className="designation">Code Supply Co.</span>
              </div>
            </div>
            <div className="sidebarInsta__slider-wrap">
              <div className="swiper-container sidebarInsta-active">
                <InstagramSidebarSlider />
              </div>
              <div className="swiper-container sidebarInsta-active-2" dir="rtl">
                <InstagramSidebarSlider />
              </div>
            </div>
            <div className="sidebarInsta__bottom">
              <Link href="#" className="btn">
                <i className="fab fa-instagram" />
                <span className="text">Follow Us</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
