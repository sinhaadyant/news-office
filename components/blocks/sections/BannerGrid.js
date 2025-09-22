import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/common/OptimizedImage';
import ComponentErrorBoundary from '@/components/common/ComponentErrorBoundary';
import { generateSlug } from '@/util/articleUtils';

export default function BannerGrid({ blockData }) {
  const articles = blockData?.articlesData || [];
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <ComponentErrorBoundary componentName='banner grid'>
      <section className={blockData?.css_class || 'tgbanner__area'}>
        <div className='container'>
          <div className='tgbanner__grid'>
            {featuredArticle && (
              <div className='tgbanner__post big-post'>
                <div className='tgbanner__thumb tgImage__hover'>
                  <Link
                    href={`/article/${
                      featuredArticle.slug ||
                      generateSlug(featuredArticle.title)
                    }`}
                  >
                    <OptimizedImage
                      src={`/assets/img/${featuredArticle.group}/${featuredArticle.img}`}
                      alt={featuredArticle.title}
                      width={800}
                      height={600}
                      priority={true}
                    />
                  </Link>
                </div>
                <div className='tgbanner__content'>
                  <ul className='tgbanner__content-meta list-wrap'>
                    <li className='category'>
                      <Link
                        href={`/${
                          featuredArticle.category?.toLowerCase() || 'blog'
                        }`}
                      >
                        {featuredArticle.category}
                      </Link>
                    </li>
                    <li>
                      <span className='by'>By</span>{' '}
                      <Link
                        href={`/author/${
                          featuredArticle.author
                            ?.replace(' ', '-')
                            .toLowerCase() || 'author'
                        }`}
                      >
                        {featuredArticle.author}
                      </Link>
                    </li>
                    <li>{featuredArticle.date}</li>
                  </ul>
                  <h2 className='title tgcommon__hover'>
                    <Link
                      href={`/article/${
                        featuredArticle.slug ||
                        generateSlug(featuredArticle.title)
                      }`}
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>
                </div>
              </div>
            )}
            <div className='tgbanner__side-post'>
              {sideArticles.map((article, index) => (
                <div key={index} className='tgbanner__post small-post'>
                  <div className='tgbanner__thumb tgImage__hover'>
                    <Link
                      href={`/article/${
                        article.slug || generateSlug(article.title)
                      }`}
                    >
                      <img
                        src={`/assets/img/${article.group}/${article.img}`}
                        alt={article.title}
                      />
                    </Link>
                  </div>
                  <div className='tgbanner__content'>
                    <ul className='tgbanner__content-meta list-wrap'>
                      <li className='category'>
                        <Link
                          href={`/${article.category?.toLowerCase() || 'blog'}`}
                        >
                          {article.category}
                        </Link>
                      </li>
                    </ul>
                    <h2 className='title tgcommon__hover'>
                      <Link
                        href={`/article/${
                          article.slug || generateSlug(article.title)
                        }`}
                      >
                        {article.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}
