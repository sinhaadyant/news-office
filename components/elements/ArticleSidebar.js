import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/common/OptimizedImage';
import ComponentErrorBoundary from '@/components/common/ComponentErrorBoundary';
import InstagramSidebarSlider from '../slider/InstagramSidebarSlider';
import SidePostSlider from '../slider/SidePostSlider';
import { generateSlug } from '../../util/articleUtils';

export default function ArticleSidebar({
  relatedArticles = [],
  currentArticle = null,
}) {
  return (
    <ComponentErrorBoundary componentName='article sidebar'>
      <aside className='blog-sidebar'>
        <div className='widget sidebar-widget widget_categories'>
          <h4 className='widget-title'>Trending Category</h4>
          <ul className='list-wrap'>
            <li>
              <div className='thumb'>
                <Link href='/blog'>
                  <OptimizedImage
                    src='/assets/img/category/side_category01.jpg'
                    alt='Technology category'
                    width={60}
                    height={60}
                  />
                </Link>
              </div>
              <Link href='/blog'>technology</Link>
              <span className='float-right'>12</span>
            </li>
            <li>
              <div className='thumb'>
                <Link href='/blog'>
                  <OptimizedImage
                    src='/assets/img/category/side_category02.jpg'
                    alt='Business category'
                    width={60}
                    height={60}
                  />
                </Link>
              </div>
              <Link href='/blog'>business</Link>
              <span className='float-right'>08</span>
            </li>
            <li>
              <div className='thumb'>
                <Link href='/blog'>
                  <OptimizedImage
                    src='/assets/img/category/side_category03.jpg'
                    alt='Fitness category'
                    width={60}
                    height={60}
                  />
                </Link>
              </div>
              <Link href='/blog'>fitness</Link>
              <span className='float-right'>13</span>
            </li>
            <li>
              <div className='thumb'>
                <Link href='/blog'>
                  <img
                    src='/assets/img/category/side_category04.jpg'
                    alt='img'
                  />
                </Link>
              </div>
              <Link href='/blog'>Gadgets</Link>
              <span className='float-right'>09</span>
            </li>
            <li>
              <div className='thumb'>
                <Link href='/blog'>
                  <img
                    src='/assets/img/category/side_category05.jpg'
                    alt='img'
                  />
                </Link>
              </div>
              <Link href='/blog'>politics</Link>
              <span className='float-right'>15</span>
            </li>
          </ul>
        </div>
        {relatedArticles.length > 0 && (
          <div className='widget sidebar-widget'>
            <h4 className='widget-title'>Related Articles</h4>
            <div className='rc-post-wrap'>
              {relatedArticles.map((article, index) => (
                <div key={index} className='rc-post-item'>
                  <div className='thumb'>
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
                  <div className='content'>
                    <h6 className='title'>
                      <Link
                        href={`/article/${
                          article.slug || generateSlug(article.title)
                        }`}
                      >
                        {article.title}
                      </Link>
                    </h6>
                    <span className='date'>{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='widget sidebar-widget'>
          <SidePostSlider />
        </div>
        <div className='widget sidebar-widget'>
          <h4 className='widget-title'>Instagram Feeds</h4>
          <div className='sidebarInsta__wrap'>
            <div className='sidebarInsta__top'>
              <div className='sidebarInsta__logo'>
                <img src='/assets/img/instagram/insta_logo.png' alt='img' />
              </div>
              <div className='sidebarInsta__info'>
                <h6 className='name'>
                  <Link href='#'>ins.co/sarso.co</Link>
                </h6>
                <span className='designation'>Code Supply Co.</span>
              </div>
            </div>
            <div className='sidebarInsta__slider-wrap'>
              <div className='swiper-container sidebarInsta-active'>
                <InstagramSidebarSlider />
              </div>
              <div className='swiper-container sidebarInsta-active-2' dir='rtl'>
                <InstagramSidebarSlider />
              </div>
            </div>
            <div className='sidebarInsta__bottom'>
              <Link href='#' className='btn'>
                <i className='fab fa-instagram' />
                <span className='text'>Follow Us</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </ComponentErrorBoundary>
  );
}
