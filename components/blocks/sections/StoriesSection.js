import Link from "next/link";
import data from "@/util/blogData";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink } from "@/util/urlUtils";

export default function StoriesSection({ blockData }) {
  return (
    <section className="stories-post-area section__hover-line pt-75 pb-40">
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
        <div className="row row-gutters-40">
          {data.slice(24, 26).map((item, i) => (
            <div className="col-md-6" key={i}>
              <div className="stories-post__item">
                <div className="stories-post__thumb tgImage__hover">
                  <Link
                    href={getArticleLink(item)}
                  >
                    <img
                      src={`/assets/img/${item.group}/${item.img}`}
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="stories-post__content video__post-content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link href="/blog">{item.category}</Link>
                    </li>
                    <li>
                      <span className="by">By</span>{" "}
                      <Link href="/blog">alonso d.</Link>
                    </li>
                    <li>nov 21, 2022</li>
                  </ul>
                  <h3 className="title tgcommon__hover">
                    <Link
                      href={getArticleLink(item)}
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {data.slice(26, 30).map((item, i) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
              <div className="trending__post stories-small-post__item">
                <div className="trending__post-thumb tgImage__hover">
                  <Link href="/#" className="addWish">
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
                </div>
                <div className="trending__post-content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link href="/blog">{item.category}</Link>
                    </li>
                    <li>
                      <span className="by">By</span>{" "}
                      <Link href="/blog">miranda h.</Link>
                    </li>
                  </ul>
                  <h4 className="title tgcommon__hover">
                    <Link
                      href={getArticleLink(item)}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <ul className="post__activity list-wrap">
                    <li>
                      <i className="fal fa-signal" /> 1.5k
                    </li>
                    <li>
                      <Link
                        href={`/article/${
                          item.slug || generateSlug(item.title)
                        }`}
                      >
                        <i className="fal fa-comment-dots" /> 150
                      </Link>
                    </li>
                    <li>
                      <i className="fal fa-share-alt" /> 32
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
