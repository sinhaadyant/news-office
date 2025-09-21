import Link from "next/link";
import data from "@/util/blogData";
import { generateSlug } from "@/util/articleUtils";

export default function HandpickedPosts({ blockData }) {
  return (
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
            <div className="handpicked__item big-post">
              <div className="handpicked__thumb tgImage__hover">
                <Link href="/article/observable-universes-each-of-which-would-comprise">
                  <img src="/assets/img/interior/interior_16.jpg" alt="img" />
                </Link>
              </div>
              <div className="handpicked__content">
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
                  <Link href="/article/observable-universes-each-of-which-would-comprise">
                    The multiverse is a hypothetical group of multiple
                    universes.
                  </Link>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="handpicked__sidebar-post">
              <div className="row">
                {data.slice(46, 50).map((item, i) => (
                  <div className="col-xl-6 col-lg-4 col-md-6" key={i}>
                    <div className="handpicked__item small-post">
                      <div className="handpicked__thumb tgImage__hover">
                        <Link
                          href={`/article/${
                            item.slug || generateSlug(item.title)
                          }`}
                        >
                          <img
                            src={`/assets/img/${item.group}/${item.img}`}
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="handpicked__content">
                        <ul className="tgbanner__content-meta list-wrap">
                          <li className="category">
                            <Link href="/blog">{item.category}</Link>
                          </li>
                          <li>
                            <span className="by">By</span>{" "}
                            <Link href="/blog">alonso d.</Link>
                          </li>
                        </ul>
                        <h4 className="title tgcommon__hover">
                          <Link
                            href={`/article/${
                              item.slug || generateSlug(item.title)
                            }`}
                          >
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
  );
}
