import Link from "next/link";

export default function TrendingBanner({ blockData }) {
  return (
    <section className="tgbanner__area-three pt-80">
      <div className="container">
        <div className="row align-items-lg-center justify-content-around">
          <div className="col-xl-3 col-lg-5 col-md-6 order-2 order-xl-0">
            <div className="trending__post">
              <div className="trending__post-thumb tgImage__hover">
                <Link href="#" className="addWish">
                  <i className="fal fa-heart" />
                </Link>
                <Link href="/article/practical-steps-to-build-transparency-in-your-remote-business">
                  <img src="/assets/img/travel/travel_01.jpg" alt="img" />
                </Link>
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
                </ul>
                <h4 className="title tgcommon__hover">
                  <Link href="/article/practical-steps-to-build-transparency-in-your-remote-business">
                    Scientists speculate that ours might not be held
                  </Link>
                </h4>
                <ul className="post__activity list-wrap">
                  <li>
                    <i className="fal fa-signal" /> 1.0k
                  </li>
                  <li>
                    <Link href="/article/practical-steps-to-build-transparency-in-your-remote-business">
                      <i className="fal fa-comment-dots" /> 128
                    </Link>
                  </li>
                  <li>
                    <i className="fal fa-share-alt" /> 29
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-8 order-0 order-xl-2">
            <div className="tgbanner__big-post text-center">
              <div className="tgbanner__big-post-thumb tgImage__hover">
                <Link href="/article/why-we-need-guidelines-for-brain-scan-data-to-real-data">
                  <img src="/assets/img/travel/travel_02.jpg" alt="img" />
                </Link>
              </div>
              <div className="tgbanner__big-post-content">
                <ul className="tgbanner__content-meta list-wrap">
                  <li className="category">
                    <Link href="/blog">technology</Link>
                  </li>
                  <li>
                    <span className="by">By</span>{" "}
                    <Link href="/blog">miranda h.</Link>
                  </li>
                  <li>nov 21, 2022</li>
                </ul>
                <h3 className="title tgcommon__hover">
                  <Link href="/article/why-we-need-guidelines-for-brain-scan-data-to-real-data">
                    The multiverse is a hypothetical group of multiple
                    universes.
                  </Link>
                </h3>
                <Link
                  href="/article/why-we-need-guidelines-for-brain-scan-data-to-real-data"
                  className="read-more"
                >
                  read more <i className="far fa-plus" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-5 col-md-6 order-3 order-xl-3">
            <div className="tgbanner__trending-news">
              <h4 className="tgbanner__trending-title">Trending News</h4>
              <ul className="tgbanner__trending-post-list list-wrap">
                <li>
                  <span className="post-count">01</span>
                  <div className="tgbanner__trending-post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href="/blog">movie</Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href="/blog">miranda h.</Link>
                      </li>
                    </ul>
                    <h4 className="title tgcommon__hover">
                      <Link href="/article/scientists-speculate-that-ours-might-not-be-held">
                        That share an universals hierarchy a large...
                      </Link>
                    </h4>
                  </div>
                </li>
                <li>
                  <span className="post-count">02</span>
                  <div className="tgbanner__trending-post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href="/blog">movie</Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href="/blog">miranda h.</Link>
                      </li>
                    </ul>
                    <h4 className="title tgcommon__hover">
                      <Link href="/article/scientists-speculate-that-ours-might-not-be-held">
                        Why we need guidelines for brain originated...
                      </Link>
                    </h4>
                  </div>
                </li>
                <li>
                  <span className="post-count">03</span>
                  <div className="tgbanner__trending-post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href="/blog">movie</Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href="/blog">miranda h.</Link>
                      </li>
                    </ul>
                    <h4 className="title tgcommon__hover">
                      <Link href="/article/scientists-speculate-that-ours-might-not-be-held">
                        Universes were originated from another...
                      </Link>
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
