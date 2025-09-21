import Link from "next/link";
import data from "@/util/blogData";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink } from "@/util/urlUtils";

export default function FeaturedPosts({ blockData }) {
  return (
    <section className="featured-post-area section__hover-line pt-75">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Featured</span>
                <h3 className="section__main-title">Editor Choice</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href="/blog">
                  More Featured Post <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {data.slice(8, 14).map((item, i) => (
            <div className="col-lg-4 col-sm-6" key={i}>
              <div className="featured__post">
                <div
                  className="featured__thumb"
                  style={{
                    backgroundImage: `url(/assets/img/blog/${item.img})`,
                  }}
                >
                  0{item.id}
                </div>
                <div className="featured__content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link href="/blog">{item.category}</Link>
                    </li>
                    <li>
                      <span className="by">By</span>{" "}
                      <Link href="/blog">Yokolili L.</Link>
                    </li>
                  </ul>
                  <h4 className="title tgcommon__hover">
                    <Link href={getArticleLink(item)}>{item.title}</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
