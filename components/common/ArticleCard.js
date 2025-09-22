import React, { memo, useCallback } from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import PremiumBadge from './PremiumBadge';
import {
  getCategoryLink,
  getAuthorLink,
  getArticleLink,
} from '@/util/urlUtils';

const ArticleCard = memo(
  ({
    article,
    index = 0,
    variant = 'default',
    showCategory = true,
    showAuthor = true,
    showDate = true,
    className = '',
    onLike,
    onShare,
  }) => {
    const handleLike = useCallback(() => {
      if (onLike) {
        onLike(article.id);
      }
    }, [onLike, article.id]);

    const handleShare = useCallback(() => {
      if (onShare) {
        onShare(article);
      }
    }, [onShare, article]);

    const cardClasses = `article-card article-card--${variant} ${className}`;
    const isPriority = index < 3; // Prioritize first 3 images

    return (
      <div className={cardClasses}>
        <div className='article-card__thumb tgImage__hover'>
          <Link href={getArticleLink(article)}>
            <OptimizedImage
              src={`/assets/img/${article.group}/${article.img}`}
              alt={article.title}
              width={400}
              height={300}
              priority={isPriority}
              className='article-card__image'
            />
          </Link>
          <div className='badge-container'>
            <div className='badge-left'>
              {article.trending && (
                <div className='trending-badge'>
                  <span>🔥</span>
                </div>
              )}
            </div>
            <div className='badge-right'>
              <PremiumBadge isPremium={article.isPremium} />
            </div>
          </div>
        </div>

        <div className='article-card__content'>
          {showCategory && (
            <div className='article-card__category'>
              <Link href={getCategoryLink(article.category)}>
                {article.category.toLowerCase()}
              </Link>
            </div>
          )}

          <h3 className='article-card__title'>
            <Link href={getArticleLink(article)}>{article.title}</Link>
          </h3>

          {article.excerpt && (
            <p className='article-card__excerpt'>{article.excerpt}</p>
          )}

          <div className='article-card__meta'>
            {showAuthor && (
              <span className='article-card__author'>
                By{' '}
                <Link href={getAuthorLink(article.author)}>
                  {article.author}
                </Link>
              </span>
            )}
            {showDate && (
              <span className='article-card__date'>
                {new Date(article.date).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className='article-card__actions'>
            <button
              className='article-card__like'
              onClick={handleLike}
              aria-label={`Like ${article.title}`}
            >
              <i className='far fa-heart'></i>
              {article.likes || 0}
            </button>

            <button
              className='article-card__share'
              onClick={handleShare}
              aria-label={`Share ${article.title}`}
            >
              <i className='fas fa-share-alt'></i>
            </button>

            {article.views && (
              <span className='article-card__views'>
                <i className='far fa-eye'></i>
                {article.views}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for memoization
    return (
      prevProps.article.id === nextProps.article.id &&
      prevProps.article.title === nextProps.article.title &&
      prevProps.article.likes === nextProps.article.likes &&
      prevProps.article.views === nextProps.article.views &&
      prevProps.variant === nextProps.variant
    );
  }
);

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
