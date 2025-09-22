import { getAllArticles } from '@/util/articleUtils';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function generateSiteMap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/latest-news</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     <!-- Article pages -->
     ${articles
       .map(article => {
         return `
       <url>
           <loc>${SITE_URL}/article/${article.slug || article.id}</loc>
           <lastmod>${new Date(article.date).toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // This function will be called at build time
}

export async function getServerSideProps({ res }) {
  // Get all articles
  const articles = getAllArticles();

  // Generate the XML sitemap with the articles data
  const sitemap = generateSiteMap(articles);

  res.setHeader('Content-Type', 'text/xml');
  // Write the XML to the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
