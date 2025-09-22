import Head from 'next/head';
import { SEOData, Article } from '@/types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: SEOData['openGraph'];
  twitter?: SEOData['twitter'];
  structuredData?: Record<string, unknown>;
  article?: Article;
  noindex?: boolean;
  nofollow?: boolean;
  image?: string;
  type?: string;
  url?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'News Hub - Latest News and Updates',
  description = 'Stay updated with the latest news, articles, and insights from around the world.',
  keywords = ['news', 'articles', 'updates', 'latest news'],
  canonical,
  openGraph,
  twitter,
  structuredData,
  article,
  noindex = false,
  nofollow = false,
  image,
  type = 'website',
  url,
  siteName = 'News Hub',
  locale = 'en_US',
  author,
  // publishedTime,
  // modifiedTime,
  // section,
  // tags,
}) => {
  // Default values
  const defaultImage = image || '/assets/img/og-default.jpg';
  const defaultUrl =
    url ||
    canonical ||
    (typeof window !== 'undefined' ? window.location.href : '');

  // Generate structured data
  const generateStructuredData = () => {
    const baseData = structuredData || {};

    if (article) {
      // Article structured data
      const articleData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.featuredImage?.src || defaultImage,
        author: {
          '@type': 'Person',
          name: article.author.name,
          url: article.author.slug
            ? `/author/${article.author.slug}`
            : undefined,
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: '/assets/img/logo.png',
          },
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': defaultUrl,
        },
        articleSection: article.category.name,
        keywords: article.tags.join(', '),
        wordCount: article.content.split(' ').length,
        ...baseData,
      };

      return articleData;
    }

    // Website structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      description,
      url: defaultUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${defaultUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      ...baseData,
    };

    return websiteData;
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbData = () => {
    if (!article) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: article.category.name,
          item: `/category/${article.category.slug}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: defaultUrl,
        },
      ],
    };
  };

  const structuredDataJson = generateStructuredData();
  const breadcrumbData = generateBreadcrumbData();

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(', ')} />
      <meta name='author' content={author || siteName} />
      <meta
        name='robots'
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`}
      />

      {/* Canonical URL */}
      {canonical && <link rel='canonical' href={canonical} />}

      {/* Open Graph Meta Tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={openGraph?.title || title} />
      <meta
        property='og:description'
        content={openGraph?.description || description}
      />
      <meta property='og:image' content={openGraph?.image || defaultImage} />
      <meta property='og:url' content={openGraph?.url || defaultUrl} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={locale} />

      {/* Article specific Open Graph tags */}
      {article && (
        <>
          <meta property='article:author' content={article.author.name} />
          <meta
            property='article:published_time'
            content={article.publishedAt}
          />
          {article.updatedAt && (
            <meta
              property='article:modified_time'
              content={article.updatedAt}
            />
          )}
          <meta property='article:section' content={article.category.name} />
          {article.tags.map((tag, index) => (
            <meta key={index} property='article:tag' content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta
        name='twitter:card'
        content={twitter?.card || 'summary_large_image'}
      />
      <meta name='twitter:title' content={twitter?.title || title} />
      <meta
        name='twitter:description'
        content={twitter?.description || description}
      />
      <meta name='twitter:image' content={twitter?.image || defaultImage} />
      <meta name='twitter:site' content='@newshub' />
      <meta
        name='twitter:creator'
        content={`@${author?.replace(/\s+/g, '').toLowerCase() || 'newshub'}`}
      />

      {/* Additional Meta Tags */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='English' />
      <meta name='revisit-after' content='7 days' />
      <meta name='distribution' content='global' />
      <meta name='rating' content='general' />

      {/* Theme and App Icons */}
      <meta name='theme-color' content='#3b82f6' />
      <meta name='msapplication-TileColor' content='#3b82f6' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataJson),
        }}
      />

      {/* Breadcrumb Structured Data */}
      {breadcrumbData && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
      )}

      {/* Additional structured data for articles */}
      {article && (
        <>
          {/* Author structured data */}
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: article.author.name,
                url: article.author.slug
                  ? `/author/${article.author.slug}`
                  : undefined,
                jobTitle: 'Author',
                worksFor: {
                  '@type': 'Organization',
                  name: siteName,
                },
              }),
            }}
          />

          {/* Organization structured data */}
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: siteName,
                url: '/',
                logo: '/assets/img/logo.png',
                sameAs: [
                  'https://twitter.com/newshub',
                  'https://facebook.com/newshub',
                  'https://linkedin.com/company/newshub',
                ],
              }),
            }}
          />
        </>
      )}
    </Head>
  );
};

export default SEOHead;

// Utility function to generate SEO data from article
export const generateArticleSEO = (
  article: Article,
  baseUrl: string = ''
): SEOHeadProps => {
  return {
    title: article.seo?.title || `${article.title} | News Hub`,
    description: article.seo?.description || article.excerpt,
    keywords: article.seo?.keywords || article.tags,
    canonical: `${baseUrl}/article/${article.slug}`,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      image: article.featuredImage?.src,
      type: 'article',
      url: `${baseUrl}/article/${article.slug}`,
      ...article.seo?.openGraph,
    },
    twitter: {
      title: article.title,
      description: article.excerpt,
      image: article.featuredImage?.src,
      ...article.seo?.twitter,
    },
    structuredData: article.seo?.structuredData,
    article,
    author: article.author.name,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    section: article.category.name,
    tags: article.tags,
  };
};

// Utility function to generate category SEO
export const generateCategorySEO = (
  category: { name: string; slug: string; description?: string },
  baseUrl: string = ''
): SEOHeadProps => {
  return {
    title: `${category.name} News | News Hub`,
    description:
      category.description ||
      `Latest ${category.name.toLowerCase()} news and articles`,
    keywords: [category.name, 'news', 'articles'],
    canonical: `${baseUrl}/category/${category.slug}`,
    openGraph: {
      title: `${category.name} News`,
      description:
        category.description ||
        `Latest ${category.name.toLowerCase()} news and articles`,
      type: 'website',
      url: `${baseUrl}/category/${category.slug}`,
    },
  };
};
