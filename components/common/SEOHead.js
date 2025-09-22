import Head from 'next/head';

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogUrl,
  structuredData,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
}) => {
  const siteName = 'Sarsa News';
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Default values
  const defaultTitle = `${title || 'Latest News'} | ${siteName}`;
  const defaultDescription =
    description ||
    'Stay updated with the latest news and trending stories from Sarsa News.';
  const defaultImage = ogImage || `${siteUrl}/assets/img/og-default.jpg`;
  const defaultUrl =
    canonical ||
    `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  // Generate structured data
  const generateStructuredData = () => {
    if (structuredData) {
      return structuredData;
    }

    // Default article structured data
    if (publishedTime) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: defaultImage,
        author: {
          '@type': 'Person',
          name: author || 'Sarsa News',
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/assets/img/logo/logo.svg`,
          },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': defaultUrl,
        },
      };
    }

    // Default website structured data
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: 'Latest news and trending stories',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{defaultTitle}</title>
      <meta name='description' content={defaultDescription} />
      <meta
        name='keywords'
        content={keywords || `${title}, news, article, ${siteName}`}
      />
      <meta name='author' content={author || siteName} />

      {/* Canonical URL */}
      <link rel='canonical' href={defaultUrl} />

      {/* Robots */}
      <meta
        name='robots'
        content={noindex ? 'noindex,nofollow' : 'index,follow'}
      />

      {/* Open Graph / Facebook */}
      <meta
        property='og:type'
        content={publishedTime ? 'article' : 'website'}
      />
      <meta property='og:title' content={title || defaultTitle} />
      <meta property='og:description' content={defaultDescription} />
      <meta property='og:image' content={defaultImage} />
      <meta property='og:url' content={defaultUrl} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content='en_US' />

      {/* Article specific Open Graph */}
      {publishedTime && (
        <>
          <meta property='article:published_time' content={publishedTime} />
          {modifiedTime && (
            <meta property='article:modified_time' content={modifiedTime} />
          )}
          {author && <meta property='article:author' content={author} />}
          {section && <meta property='article:section' content={section} />}
          {tags && (
            <>
              {Array.isArray(tags) ? (
                tags.map((tag, index) => (
                  <meta key={index} property='article:tag' content={tag} />
                ))
              ) : (
                <meta property='article:tag' content={tags} />
              )}
            </>
          )}
        </>
      )}

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title || defaultTitle} />
      <meta name='twitter:description' content={defaultDescription} />
      <meta name='twitter:image' content={defaultImage} />

      {/* Additional Meta Tags */}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='theme-color' content='#ffffff' />

      {/* Favicon */}
      <link rel='icon' type='image/png' href='/favicon.png' />
      <link rel='apple-touch-icon' href='/favicon.png' />

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
    </Head>
  );
};

export default SEOHead;
