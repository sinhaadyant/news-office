import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import data from "@/util/blogData";
import { generateSlug } from "@/util/articleUtils";
import { getArticleLink } from "@/util/urlUtils";
import PremiumBadge from "@/components/common/PremiumBadge";

export default function VideoPosts({ blockData }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="video-post-area section__hover-line white-bg pt-75 pb-80">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Video</span>
                <h3 className="section__main-title">Recent Video Post</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="section__read-more text-start text-sm-end">
                <Link href="/blog">
                  More Video Post <i className="far fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="video__post-item big-post">
              <div className="video__post-thumb">
                <Link href="/article/accessible-to-telescopes-is-about-90-billion-years">
                  <img src="/assets/img/blog/blog14.jpg" alt="img" />
                </Link>
                <a onClick={() => setOpen(true)} className="popup-video">
                  <i className="fas fa-play" />
                </a>
                <div className='badge-container'>
                  <div className='badge-left'>
                    {/* Video posts can be trending */}
                  </div>
                  <div className='badge-right'>
                    <PremiumBadge isPremium={true} />
                  </div>
                </div>
              </div>
                <div className="video__post-content">
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
                <h3 className="title tgcommon__hover">
                  <Link href="/article/the-multiverse-is-a-hypothetical-group-of-multiple-universes">
                    The multiverse is a hypothetical group of multiple
                    universes.
                  </Link>
                </h3>
              </div>
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId="V87lmIvrTSk"
                onClose={() => setOpen(false)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            {data.slice(15, 19).map((item, i) => (
              <div className="video__post-item side-post" key={i}>
                <div className="video__post-thumb tgImage__hover">
                  <a onClick={() => setOpen(true)} className="popup-video">
                    <img
                      src={`/assets/img/${item.group}/${item.img}`}
                      alt="img"
                    />
                    <i className="fas fa-play" />
                  </a>
                  <div className='badge-container'>
                    <div className='badge-left'>
                      {/* Video posts can be trending */}
                    </div>
                    <div className='badge-right'>
                      <PremiumBadge isPremium={true} />
                    </div>
                  </div>
                </div>
                <div className="video__post-content">
                  <ul className="tgbanner__content-meta list-wrap">
                    <li className="category">
                      <Link href="/blog">{item.category}</Link>
                    </li>
                    <li>
                      <span className="by">By</span>{" "}
                      <Link href="/blog">alonso d.</Link>
                    </li>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
