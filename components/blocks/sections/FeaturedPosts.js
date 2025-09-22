import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/common/OptimizedImage';
import {
  getArticleLink,
  getCategoryLink,
  getAuthorLink,
} from '@/util/urlUtils';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const FeaturedPosts = memo(({ blockData }) => {
  // Use blockData if available, otherwise fallback to static data
  const articles = useMemo(() => {
    if (blockData?.articlesData && blockData.articlesData.length > 0) {
      return blockData.articlesData;
    }
    // Fallback to static data slice
    return [];
  }, [blockData?.articlesData]);

  const sectionTitle = blockData?.section_title || 'Editor Choice';
  const sectionSubTitle = blockData?.section_sub_title || 'Featured';
  const viewAllLink = blockData?.view_all_link || '/blog';
  const viewAllText = blockData?.view_all_text || 'More Featured Post';

  if (!articles || articles.length === 0) {
    return (
      <section className='featured-post-area section__hover-line pt-75'>
        <div className='container'>
          <div className='text-center py-5'>
            <p className='text-muted'>No featured posts available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section
        className={
          blockData?.css_class || 'featured-post-area section__hover-line pt-75'
        }
      >
        <div className='container'>
          <div className='section__title-wrap mb-40'>
            <div className='row align-items-end'>
              <div className='col-sm-6'>
                <div className='section__title'>
                  <span className='section__sub-title'>{sectionSubTitle}</span>
                  <h3 className='section__main-title'>{sectionTitle}</h3>
                </div>
              </div>
              {blockData?.show_view_all !== false && (
                <div className='col-sm-6'>
                  <div className='section__read-more text-start text-sm-end'>
                    <Link href={viewAllLink}>
                      {viewAllText} <i className='far fa-long-arrow-right' />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            {articles.map((item, i) => (
              <div className='col-lg-4 col-sm-6' key={`${item.id}-${i}`}>
                <div className='featured__post'>
                  <div className='featured__thumb'>
                    <Link href={getArticleLink(item)}>
                      <OptimizedImage
                        src={`/assets/img/${item.group}/${item.img}`}
                        alt={item.title}
                        width={400}
                        height={300}
                        priority={i < 3} // Prioritize first 3 images
                        className='featured__thumb-image'
                      />
                    </Link>
                    <div className='featured__thumb-number'>
                      {String(item.id).padStart(2, '0')}
                    </div>
                    {item.trending && (
                      <div className='trending-badge'>
                        <span>🔥</span>
                      </div>
                    )}
                    {item.premium && (
                      <div className='premium-badge'>
                        <span>⭐</span>
                      </div>
                    )}
                  </div>
                  <div className='featured__content'>
                    <ul className='tgbanner__content-meta list-wrap'>
                      <li className='category'>
                        <Link href={getCategoryLink(item.category)}>
                          {item.category}
                        </Link>
                      </li>
                      <li>
                        <span className='by'>By</span>{' '}
                        <Link href={getAuthorLink(item.author)}>
                          {item.author}
                        </Link>
                      </li>
                      <li>{new Date(item.date).toLocaleDateString()}</li>
                    </ul>
                    <h4 className='title tgcommon__hover'>
                      <Link href={getArticleLink(item)}>{item.title}</Link>
                    </h4>
                    {item.excerpt && (
                      <p className='featured__excerpt'>{item.excerpt}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
});

FeaturedPosts.displayName = 'FeaturedPosts';

export default FeaturedPosts;
