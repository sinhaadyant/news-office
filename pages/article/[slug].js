import React, { memo, useCallback, useMemo } from 'react';
import ArticleSidebar from '@/components/elements/ArticleSidebar';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import OptimizedImage from '@/components/common/OptimizedImage';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { AdBlockBannerPackage } from '@/components/common/AdBlockBannerPackage';
import AdBlock from '@/components/ads/AdBlock';
import Paywall from '@/components/paywall/Paywall';
import PremiumBadge from '@/components/common/PremiumBadge';
import { useUserStore } from '@/stores/useUserStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getArticleBySlug,
  getRelatedArticles,
  getAdjacentArticles,
  generateSlug,
} from '../../util/articleUtils';

export default function BlogDetails() {
  let Router = useRouter();
  const [item, setItem] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [adjacentArticles, setAdjacentArticles] = useState({
    prev: null,
    next: null,
  });
  const [loading, setLoading] = useState(true);
  const { slug } = Router.query;

  const { getContentPreview } = useUserStore();

  // Function to split content into paragraphs and add ads
  const renderContentWithAds = (content, isPremium) => {
    if (!content) return null;

    // Get content preview based on user subscription
    const displayContent = getContentPreview(content, isPremium);
    const paragraphs = displayContent.split('\n\n').filter(p => p.trim());
    const contentWithAds = [];

    paragraphs.forEach((paragraph, index) => {
      contentWithAds.push(
        <p
          key={`paragraph-${index}`}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      );

      // Add inline ad after every 2nd paragraph
      if ((index + 1) % 2 === 0 && index < paragraphs.length - 1) {
        contentWithAds.push(
          <AdBlock 
            key={`ad-${index}`}
            type="inline" 
            id={`article-inline-${index}`}
            slot={`article-${slug}-inline-${index}`}
          />
        );
      }
    });

    return contentWithAds;
  };

  useEffect(() => {
    if (slug) {
      const article = getArticleBySlug(slug);
      if (article) {
        setItem(article);
        setRelatedArticles(getRelatedArticles(article, 3));
        setAdjacentArticles(getAdjacentArticles(article.id));
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <section className='blog-details-area pt-80 pb-100'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-xl-8 col-lg-7'>
                <div className='text-center'>
                  <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                  <p className='mt-3'>Loading article...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <section className='blog-details-area pt-80 pb-100'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-xl-8 col-lg-7'>
                <div className='text-center'>
                  <h2>Article Not Found</h2>
                  <p>The article you're looking for doesn't exist.</p>
                  <Link href='/' className='btn btn-primary'>
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <ErrorBoundary>
      <SEOHead
        title={item.title}
        description={item.excerpt || item.content?.substring(0, 160) + '...'}
        canonical={`${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/article/${item.slug}`}
        ogImage={`/assets/img/${item.group}/${item.img}`}
        ogUrl={`${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/article/${item.slug}`}
        author={item.author}
        publishedTime={new Date(item.date).toISOString()}
        modifiedTime={new Date(item.date).toISOString()}
        section={item.category}
        tags={item.tags || item.category}
        keywords={`${item.tags?.join(', ') || item.category}, news, article`}
      />
      <Layout
        breadcrumbCategory={item.category}
        breadcrumbPostTitle={item.title}
      >
        <>
          {/* AdBlock Warning Banner */}
          <AdBlockBannerPackage
            message='Support our journalism by disabling your ad blocker. Quality news needs your support.'
            onDismiss={() => console.log('Article banner dismissed')}
          />

          <section className='blog-details-area pt-80 pb-100'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-lg-1'>
                  <div className='blog-details-social'>
                    <ul className='list-wrap'>
                      <li>
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            `${
                              process.env.NEXT_PUBLIC_BASE_URL ||
                              'http://localhost:3000'
                            }/article/${item.slug}`
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i className='fab fa-facebook-f' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            item.title
                          )}&url=${encodeURIComponent(
                            `${
                              process.env.NEXT_PUBLIC_BASE_URL ||
                              'http://localhost:3000'
                            }/article/${item.slug}`
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i className='fab fa-twitter' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            `${
                              process.env.NEXT_PUBLIC_BASE_URL ||
                              'http://localhost:3000'
                            }/article/${item.slug}`
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i className='fab fa-linkedin-in' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                            `${
                              process.env.NEXT_PUBLIC_BASE_URL ||
                              'http://localhost:3000'
                            }/article/${item.slug}`
                          )}&media=${encodeURIComponent(
                            `${
                              process.env.NEXT_PUBLIC_BASE_URL ||
                              'http://localhost:3000'
                            }/assets/img/${item.group}/${item.img}`
                          )}&description=${encodeURIComponent(item.title)}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <i className='fab fa-pinterest' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='#'
                          onClick={e => {
                            e.preventDefault();
                            if (navigator.share) {
                              navigator.share({
                                title: item.title,
                                text:
                                  item.excerpt ||
                                  item.content?.substring(0, 160) + '...',
                                url: `${
                                  process.env.NEXT_PUBLIC_BASE_URL ||
                                  'http://localhost:3000'
                                }/article/${item.slug}`,
                              });
                            } else {
                              navigator.clipboard.writeText(
                                `${
                                  process.env.NEXT_PUBLIC_BASE_URL ||
                                  'http://localhost:3000'
                                }/article/${item.slug}`
                              );
                              alert('Link copied to clipboard!');
                            }
                          }}
                        >
                          <i className='fas fa-share' />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-xl-8 col-lg-7'>
                  <div className='blog-details-wrap'>
                    <ul className='tgbanner__content-meta list-wrap'>
                      <li className='category'>
                        <Link href={`/${item.category.toLowerCase()}`}>
                          {item.category}
                        </Link>
                      </li>
                      <li>
                        <span className='by'>By</span>{' '}
                        <Link
                          href={`/author/${item.author
                            .replace(' ', '-')
                            .toLowerCase()}`}
                        >
                          {item.author}
                        </Link>
                      </li>
                      <li>{item.date}</li>
                      <li>{Math.floor(Math.random() * 50) + 1} comments</li>
                    </ul>
                    <h2 className='title'>{item.title}</h2>
                    <div className='blog-details-thumb'>
                      <img
                        src={`/assets/img/${item.group}/${item.img}`}
                        alt={item.title}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className='blog-details-content'>
                      {item.excerpt && (
                        <div className='article-excerpt mb-4'>
                          <p className='lead'>{item.excerpt}</p>
                        </div>
                      )}

                      {/* Premium Badge */}
                      <PremiumBadge isPremium={item.isPremium} />

                      {/* Dynamic content with ads and paywall */}
                      {item.content ? (
                        <Paywall isPremium={item.isPremium} content={item.content}>
                          {renderContentWithAds(item.content, item.isPremium)}
                        </Paywall>
                      ) : (
                        <div>
                          <p>
                            In partnership with Sydney startup Trace, Envato is
                            delivering on its sustainability promise as a B-Corp
                            and meeting part of its recent commitment to the To
                            Whom It Should Concern campaign. Envato is now
                            officially carbon neutral, as part of a
                            comprehensive new sustainability.
                          </p>

                          <div className='content-ad my-4'>
                            <div className='ad-container text-center p-4 bg-light border rounded'>
                              <div className='ad-placeholder'>
                                <h6 className='text-muted mb-2'>
                                  Advertisement
                                </h6>
                                <div className='ad-content bg-white border p-3 rounded'>
                                  <p className='mb-2'>Sponsored Content</p>
                                  <small className='text-muted'>
                                    Your ad could be here
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p>
                            When we signed on to the To Whom It May Concern
                            campaign we made a pledge to be 100% renewable by
                            2030 and carbon zero by 2040," said Envato CEO
                            Hichame Assi. "It's a commitment made on the back of
                            our B Corp certification, and one we believe
                            reflects not just our values but a broader sense of
                            how businesses can contribute to fighting climate
                            change.
                          </p>

                          <div className='content-ad my-4'>
                            <div className='ad-container text-center p-4 bg-light border rounded'>
                              <div className='ad-placeholder'>
                                <h6 className='text-muted mb-2'>
                                  Advertisement
                                </h6>
                                <div className='ad-content bg-white border p-3 rounded'>
                                  <p className='mb-2'>Sponsored Content</p>
                                  <small className='text-muted'>
                                    Your ad could be here
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p>
                            We are proud that our people can make a positive
                            impact on the world around us through their work at
                            Envato. And while there is still lots of work to do
                            to realise carbon, we're nonetheless pleased we've
                            reached this sustainability milestone and thrilled
                            to partner with Trace to further track and refine
                            the management of our carbon footprint. An through
                            Trace, Envato is now able to more comprehensively
                            measure the amount of carbon emissions the business
                            generates. This includes not just its physical
                            offices in Melbourne, Guadalajara and Los Angeles,
                            but also includes an estimate of the footprint of
                            its 600 plus staff who work flexibly around the
                            world, as well as the usage tied to its tech
                            infrastructure including our cloud computing
                            services.
                          </p>
                        </div>
                      )}
                      <div className='blog-details-inner'>
                        <h3 className='inner-title'>
                          Building the Future of Artificial Intelligence
                        </h3>
                        <p>
                          When we signed on to the To Whom It May Concern
                          campaign we made a pledge to be 100% renewable by 2030
                          and carbon zero by 2040," said Envato CEO Hichame
                          Assi. "It's a commitment made on the back of our B
                          Corp certification, and one we believe reflects not
                          just our values but a broader sense of how businesses
                          can contribute to fighting climate change.
                        </p>
                        <div className='blog-details-images'>
                          <div className='row'>
                            <div className='col-md-4 col-sm-6'>
                              <div className='details-inner-image'>
                                <img
                                  src='/assets/img/lifestyle/life_style02.jpg'
                                  alt='img'
                                />
                              </div>
                            </div>
                            <div className='col-md-4 col-sm-6'>
                              <div className='details-inner-image'>
                                <img
                                  src='/assets/img/lifestyle/life_style03.jpg'
                                  alt='img'
                                />
                              </div>
                            </div>
                            <div className='col-md-4 col-sm-6'>
                              <div className='details-inner-image'>
                                <img
                                  src='/assets/img/lifestyle/life_style04.jpg'
                                  alt='img'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>
                          The Mount Sandy project in South Australia is one of
                          those supported by Envato through Trace. Its permanent
                          protection of the regionally and culturally important
                          pocket. Trace CEO and Co-Founder Catherine Long said
                          Envato was a perfect example of a fast-moving tech
                          business that already has a demonstrable commitment to
                          sustain. "But they needed a solution for measuring and
                          managing their carbon footprint that matched the speed
                          and efficiency of the way they work footprint that
                          matched the speed.
                        </p>
                      </div>
                      <blockquote>
                        <p>
                          " 20 years ago today, Steve introduced the world to
                          iMac. It set Apple on a new course and forever changed
                          the way people look at computers. "
                        </p>
                        <div className='blockquote-cite'>
                          <div className='image'>
                            <img src='/assets/img/others/about_me.png' alt='' />
                          </div>
                          <div className='info'>
                            <h5>Miranda H. Halim</h5>
                            <span>Head Of Idea</span>
                          </div>
                        </div>
                      </blockquote>
                      <p>
                        We are proud that our people can make a positive impact
                        on the world around us through their work at Envato. And
                        while there is still lots of work to do to realise
                        carbon, we're nonetheless pleased we've reached this
                        sustainability milestone and thrilled to partner with
                        Trace to further track and refine the management of our
                        carbon footprint. An through Trace, Envato is now able
                        to more comprehensively measure the amount of carbon
                        emissions the business generates. This includes not just
                        its physical offices in Melbourne, Guadalajara and Los
                        Angeles, but also includes an estimate of the footprint
                        of its 600 plus staff who work flexibly around the
                        world, as well as the usage tied to its ech
                        infrastructure including our cloud computing services.
                      </p>
                      <div className='blog-details-inner'>
                        <h3 className='inner-title'>The Creative Cloud</h3>
                        <p>
                          When we signed on to the To Whom It May Concern
                          campaign we made a pledge to be 100% renewable by 2030
                          and carbon zero by 2040," said Envato CEO Hichame
                          Assi..
                        </p>
                        <ul className='list-wrap'>
                          <li>
                            <span>The games generate:</span>Revenue through
                            sales of digital items, such as special costumes,
                            which appear in a rotating storefront that is
                            updated daily.
                          </li>
                          <li>
                            <span>Players use in-game:</span>Currency to
                            customize their appearance, and the daily refresh of
                            the store incentives players to buy fresh gear or
                            risk missing out on it entirely.
                          </li>
                          <li>
                            <span>Players have:</span> Already spent more than
                            $1 billion on Fortnite's in-game purchases,
                            according to IGN report.
                          </li>
                        </ul>
                      </div>
                      <p>
                        Envato is now able to more comprehensively measure the
                        amount of carbon emissions the business generates.
                        includes not just its physical offices in Melbourne,
                        Guadalajara and Los Angeles, but also includes an
                        estimate of footprint of its 600 plus staff who work
                        flexibly around the world, as well as the usage tied to
                        its tech infrastructure including our cloud computing
                        services lexibly around the world.
                      </p>
                    </div>
                    <div className='blog-details-bottom'>
                      <div className='row align-items-baseline'>
                        <div className='col-xl-6 col-md-7'>
                          <div className='blog-details-tags'>
                            <ul className='list-wrap mb-0'>
                              {item.tags &&
                                item.tags.map((tag, index) => (
                                  <li key={index}>
                                    <Link href={`/tag/${tag.toLowerCase()}`}>
                                      {tag}
                                    </Link>
                                  </li>
                                ))}
                              {(!item.tags || item.tags.length === 0) && (
                                <>
                                  <li>
                                    <Link href='#'>
                                      {item.category.toLowerCase()}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href='#'>{item.group}</Link>
                                  </li>
                                  <li>
                                    <Link href='#'>news</Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className='col-xl-6 col-md-5'>
                          <div className='blog-details-share'>
                            <h6 className='share-title'>Share Now:</h6>
                            <ul className='list-wrap mb-0'>
                              <li>
                                <Link
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    `${
                                      process.env.NEXT_PUBLIC_BASE_URL ||
                                      'http://localhost:3000'
                                    }/article/${item.slug}`
                                  )}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <i className='fab fa-facebook-f' />
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    item.title
                                  )}&url=${encodeURIComponent(
                                    `${
                                      process.env.NEXT_PUBLIC_BASE_URL ||
                                      'http://localhost:3000'
                                    }/article/${item.slug}`
                                  )}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <i className='fab fa-twitter' />
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                    `${
                                      process.env.NEXT_PUBLIC_BASE_URL ||
                                      'http://localhost:3000'
                                    }/article/${item.slug}`
                                  )}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <i className='fab fa-linkedin-in' />
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                                    `${
                                      process.env.NEXT_PUBLIC_BASE_URL ||
                                      'http://localhost:3000'
                                    }/article/${item.slug}`
                                  )}&media=${encodeURIComponent(
                                    `${
                                      process.env.NEXT_PUBLIC_BASE_URL ||
                                      'http://localhost:3000'
                                    }/assets/img/${item.group}/${item.img}`
                                  )}&description=${encodeURIComponent(
                                    item.title
                                  )}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <i className='fab fa-pinterest' />
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href='#'
                                  onClick={e => {
                                    e.preventDefault();
                                    if (navigator.share) {
                                      navigator.share({
                                        title: item.title,
                                        text:
                                          item.excerpt ||
                                          item.content?.substring(0, 160) +
                                            '...',
                                        url: `${
                                          process.env.NEXT_PUBLIC_BASE_URL ||
                                          'http://localhost:3000'
                                        }/article/${item.slug}`,
                                      });
                                    } else {
                                      navigator.clipboard.writeText(
                                        `${
                                          process.env.NEXT_PUBLIC_BASE_URL ||
                                          'http://localhost:3000'
                                        }/article/${item.slug}`
                                      );
                                      alert('Link copied to clipboard!');
                                    }
                                  }}
                                >
                                  <i className='fas fa-share' />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="blog-avatar-wrap">
                        <div className="blog-avatar-img">
                          <Link href="#">
                            <i className="far fa-check" />
                            <img
                              src="/assets/img/others/avatar.png"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="blog-avatar-content">
                          <p>
                            Monty Hython is a Writer at Sarsa and has been
                            covering emerging technologies and venture capital
                            there since 2013. He covers a wide variety of news
                            from early and late stage startups to massive tech
                            behemoths.
                          </p>
                          <h5 className="name">Alison Fiano</h5>
                          <span className="designation">OG Author</span>
                        </div>
                      </div> */}
                    <div className='blog-prev-next-posts'>
                      <div className='row'>
                        <div className='col-xl-6 col-lg-8 col-md-6'>
                          {adjacentArticles.prev && (
                            <div className='pn-post-item'>
                              <div className='thumb'>
                                <Link
                                  href={`/article/${
                                    adjacentArticles.prev.slug ||
                                    generateSlug(adjacentArticles.prev.title)
                                  }`}
                                >
                                  <img
                                    src={`/assets/img/${adjacentArticles.prev.group}/${adjacentArticles.prev.img}`}
                                    alt={adjacentArticles.prev.title}
                                  />
                                </Link>
                              </div>
                              <div className='content'>
                                <span>Prev Post</span>
                                <h5 className='title tgcommon__hover'>
                                  <Link
                                    href={`/article/${
                                      adjacentArticles.prev.slug ||
                                      generateSlug(adjacentArticles.prev.title)
                                    }`}
                                  >
                                    {adjacentArticles.prev.title}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='col-xl-6 col-lg-8 col-md-6'>
                          {adjacentArticles.next && (
                            <div className='pn-post-item next-post'>
                              <div className='thumb'>
                                <Link
                                  href={`/article/${
                                    adjacentArticles.next.slug ||
                                    generateSlug(adjacentArticles.next.title)
                                  }`}
                                >
                                  <img
                                    src={`/assets/img/${adjacentArticles.next.group}/${adjacentArticles.next.img}`}
                                    alt={adjacentArticles.next.title}
                                  />
                                </Link>
                              </div>
                              <div className='content'>
                                <span>Next Post</span>
                                <h5 className='title tgcommon__hover'>
                                  <Link
                                    href={`/article/${
                                      adjacentArticles.next.slug ||
                                      generateSlug(adjacentArticles.next.title)
                                    }`}
                                  >
                                    {adjacentArticles.next.title}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  {/* Sidebar Ad */}
                  <AdBlock 
                    type="sidebar" 
                    id="article-sidebar-ad"
                    slot={`article-${slug}-sidebar`}
                    className="mb-4"
                  />
                  
                  <ArticleSidebar
                    relatedArticles={relatedArticles}
                    currentArticle={item}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      </Layout>
    </ErrorBoundary>
  );
}
