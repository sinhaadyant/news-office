import LatestSidebar from "@/components/elements/LatestSidebar";
import Layout from "@/components/layout/Layout";
import data from "@/util/blogData";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Home6() {
  const { category } = useParams();
  const filteredData = data.filter((item) => item.category === category);
  return (
    <>
      <Layout headerStyle={6} footerStyle={3} footerClass="black-bg" logoWhite>
        <section className="latest-post-area pt-80 pb-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-8">
                <div className="section__title-wrap mb-40">
                  <div className="row align-items-end">
                    <div className="col-sm-6">
                      <div className="section__title">
                        <span className="section__sub-title">Latest</span>
                        <h3 className="section__main-title">{category}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="latest__post-wrap">
                  {data.slice(106, 111).map((item, i) => (
                    <div className="latest__post-item" key={i}>
                      <div className="latest__post-thumb tgImage__hover">
                        <Link href={`/article/${item.id}`}>
                          <img
                            src={`/assets/img/${item.group}/${item.img}`}
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="latest__post-content">
                        <ul className="tgbanner__content-meta list-wrap">
                          <li className="category">
                            <Link href="/blog">technology</Link>
                          </li>
                          <li>
                            <span className="by">By</span>{" "}
                            <Link href="/blog">alonso d.</Link>
                          </li>
                          <li>nov 22, 2022</li>
                        </ul>
                        <h3 className="title tgcommon__hover">
                          <Link href={`/article/${item.id}`}>
                            The multiverse is a hypothetical no group of the
                            multiple universes.
                          </Link>
                        </h3>
                        <p>
                          Structured gripped tape invisible moulded cups for
                          sauppor firm hold strong powermesh front liner sport
                          detail.
                        </p>
                        <ul className="post__activity list-wrap">
                          <li>
                            <i className="fal fa-signal" /> 1.5k
                          </li>
                          <li>
                            <Link href={`/article/${item.id}`}>
                              <i className="fal fa-comment-dots" /> 150
                            </Link>
                          </li>
                          <li>
                            <i className="fal fa-share-alt" /> 32
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="latest__post-more text-center">
                  <Link href="#" id="loadMore" className="btn">
                    <span className="text">Load More</span>{" "}
                    <i className="far fa-plus" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <LatestSidebar />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
