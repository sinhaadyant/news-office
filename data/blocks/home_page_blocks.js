// Home page blocks configuration with dynamic article mapping
import {
  getArticlesByGroup,
  getTrendingArticles,
  getAllArticles,
} from "@/util/articleUtils";

const generateHomePageBlocks = () => {
  // Get article data
  const allArticles = getAllArticles();
  const trendingArticles = getTrendingArticles();
  const blogArticles = getArticlesByGroup("blog");
  const interiorArticles = getArticlesByGroup("interior");
  const travelArticles = getArticlesByGroup("travel");
  const technologyArticles = getArticlesByGroup("technology");
  const nftArticles = getArticlesByGroup("nft");
  const lifestyleArticles = getArticlesByGroup("lifestyle");
  const minimalArticles = getArticlesByGroup("minimal");

  // Helper function to get article slugs
  const getArticleSlugs = (articles, count) =>
    articles.slice(0, count).map(
      (article) =>
        article.slug ||
        article.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim("-")
    );

  return [
    // Hero Banner Section
    {
      id: "hero-banner",
      title: "Hero Banner",
      block_name: "hero-banner",
      section_title: "Latest News",
      section_description: "Stay updated with the latest trending stories",
      show_view_all: true,
      view_all_text: "View All News",
      view_all_link: "/blog",
      articles: getArticleSlugs(trendingArticles, 8),
      layout: "hero",
      featured_article:
        trendingArticles[0]?.slug ||
        trendingArticles[0]?.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim("-") ||
        "scientists-speculate-that-ours-might-not-be-held",
      css_class: "tgslider__area-four pt-20",
    },

    // Banner Grid Section
    {
      id: "banner-grid",
      title: "Banner Grid",
      block_name: "banner-grid",
      section_title: "Featured Stories",
      section_description: "Top stories across all categories",
      show_view_all: true,
      view_all_text: "View All Stories",
      view_all_link: "/blog",
      articles: getArticleSlugs(allArticles, 6),
      layout: "grid",
      css_class: "banner__grid-area section__hover-line pt-75 pb-75",
    },

    // NFT Slider Section
    {
      id: "nft-slider",
      title: "NFT Slider",
      block_name: "nft-slider",
      section_title: "NFT & Crypto",
      section_description: "Digital art and cryptocurrency news",
      show_view_all: true,
      view_all_text: "More NFT Posts",
      view_all_link: "/nft",
      articles: getArticleSlugs(nftArticles, 8),
      layout: "slider",
      show_item_count: 4,
      css_class: "nft__post-area section__hover-line pt-75 pb-75",
    },

    // Trending Banner Section
    {
      id: "trending-banner",
      title: "Trending Banner",
      block_name: "trending-banner",
      section_title: "Trending Now",
      section_description: "What's trending right now",
      show_view_all: true,
      view_all_text: "View All Trending",
      view_all_link: "/blog?filter=trending",
      articles: getArticleSlugs(trendingArticles, 6),
      layout: "banner",
      background: "dark",
      css_class:
        "trending__banner-area black-bg section__hover-line pt-75 pb-80",
    },

    // Popular Posts Section
    {
      id: "popular-posts",
      title: "Popular Posts",
      block_name: "popular-posts",
      section_title: "Popular Stories",
      section_description: "Most read articles this week",
      show_view_all: true,
      view_all_text: "More Popular Posts",
      view_all_link: "/blog?filter=popular",
      articles: getArticleSlugs(blogArticles, 8),
      layout: "slider",
      show_item_count: 4,
      css_class: "popular__post-area white-bg section__hover-line pt-75 pb-75",
    },

    // Trending News Section
    {
      id: "trending-news",
      title: "Trending News",
      block_name: "trending-news",
      section_title: "Trending Stories",
      section_description: "What's trending right now",
      show_view_all: true,
      view_all_text: "View All Trending",
      view_all_link: "/blog?filter=trending",
      articles: getArticleSlugs(trendingArticles, 8),
      layout: "slider",
      show_item_count: 6,
      background: "dark",
      css_class: "trending-post-area section__hover-line pt-75 pb-80 black-bg",
    },

    // Featured Posts Section
    {
      id: "featured-posts",
      title: "Featured Posts",
      block_name: "featured-posts",
      section_title: "Editor's Choice",
      section_description: "Hand-picked articles by our editors",
      show_view_all: true,
      view_all_text: "More Featured Posts",
      view_all_link: "/blog?filter=featured",
      articles: getArticleSlugs(
        allArticles.filter((article) => article.trending),
        6
      ),
      layout: "grid",
      show_item_count: 6,
      css_class: "featured__post-area section__hover-line pt-75 pb-75",
    },

    // Video Posts Section
    {
      id: "video-posts",
      title: "Video Posts",
      block_name: "video-posts",
      section_title: "Recent Video Posts",
      section_description: "Latest video content",
      show_view_all: true,
      view_all_text: "More Video Posts",
      view_all_link: "/blog?filter=video",
      articles: getArticleSlugs(blogArticles, 5),
      layout: "video",
      featured_article:
        blogArticles[0]?.slug ||
        blogArticles[0]?.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim("-") ||
        "scientists-speculate-that-ours-might-not-be-held",
      css_class: "video__post-area section__hover-line pt-75 pb-75",
    },

    // Handpicked Section
    {
      id: "handpicked-section",
      title: "Handpicked Section",
      block_name: "handpicked-section",
      section_title: "More to Watch",
      section_description: "Curated content just for you",
      show_view_all: true,
      view_all_text: "Hand-Picked Posts",
      view_all_link: "/blog?filter=handpicked",
      articles: getArticleSlugs(trendingArticles, 12),
      layout: "slider",
      show_item_count: 6,
      background: "dark",
      css_class:
        "hand-picked-area black-bg fix section__hover-line pt-75 pb-80",
    },

    // Stories Section
    {
      id: "stories-section",
      title: "Stories Section",
      block_name: "stories-section",
      section_title: "Popular Stories",
      section_description: "Most engaging stories",
      show_view_all: true,
      view_all_text: "Stories Posts",
      view_all_link: "/blog?filter=stories",
      articles: getArticleSlugs(lifestyleArticles, 6),
      layout: "stories",
      featured_articles: getArticleSlugs(lifestyleArticles, 2),
      css_class: "stories__area section__hover-line pt-75 pb-75",
    },

    // Newsletter Section
    {
      id: "newsletter-section",
      title: "Newsletter Section",
      block_name: "newsletter-section",
      section_title: "Stay Updated",
      section_description: "Subscribe to our newsletter for the latest updates",
      show_view_all: false,
      view_all_text: "",
      view_all_link: "",
      newsletter: {
        title: "Subscribe to Newsletter",
        description: "Get the latest news and updates delivered to your inbox",
        placeholder: "Enter your email address",
        button_text: "Subscribe",
      },
      layout: "newsletter",
      css_class: "newsletter__area",
    },

    // Interior Slider Section
    {
      id: "interior-slider",
      title: "Interior Slider",
      block_name: "interior-slider",
      section_title: "Interior & Design",
      section_description: "Latest in interior design trends",
      show_view_all: true,
      view_all_text: "More Interior Posts",
      view_all_link: "/interior",
      articles: getArticleSlugs(interiorArticles, 6),
      layout: "slider",
      show_item_count: 4,
      css_class: "interior__post-area section__hover-line pt-75 pb-75",
    },

    // Categories Section
    {
      id: "categories-section",
      title: "Categories Section",
      block_name: "categories-section",
      section_title: "Top Categories",
      section_description: "Explore content by category",
      show_view_all: true,
      view_all_text: "More Categories",
      view_all_link: "/categories",
      categories: [
        {
          name: "Technology",
          image: "category01.jpg",
          link: "/technology",
          article_count: technologyArticles.length,
        },
        {
          name: "Gaming",
          image: "category02.jpg",
          link: "/gaming",
          article_count: blogArticles.filter(
            (article) => article.category === "Gaming"
          ).length,
        },
        {
          name: "Sports",
          image: "category03.jpg",
          link: "/sports",
          article_count: blogArticles.filter(
            (article) => article.category === "Sports"
          ).length,
        },
        {
          name: "Movie",
          image: "category04.jpg",
          link: "/movie",
          article_count: blogArticles.filter(
            (article) => article.category === "Movie"
          ).length,
        },
        {
          name: "NFT",
          image: "category05.jpg",
          link: "/nft",
          article_count: nftArticles.length,
        },
        {
          name: "Lifestyle",
          image: "category05.jpg",
          link: "/lifestyle",
          article_count: lifestyleArticles.length,
        },
      ],
      layout: "grid",
      css_class: "category__area section__hover-line pt-75",
    },

    // Handpicked Posts Section
    {
      id: "handpicked-posts",
      title: "Handpicked Posts",
      block_name: "handpicked-posts",
      section_title: "Editor's Selection",
      section_description: "Carefully curated articles",
      show_view_all: true,
      view_all_text: "More Handpicked Posts",
      view_all_link: "/blog?filter=handpicked",
      articles: getArticleSlugs(trendingArticles, 8),
      layout: "grid",
      show_item_count: 4,
      css_class: "handpicked__posts-area section__hover-line pt-75 pb-75",
    },

    // Newsletter Style Two Section
    {
      id: "newsletter-style-two",
      title: "Newsletter Style Two",
      block_name: "newsletter-style-two",
      section_title: "Join Our Community",
      section_description: "Be part of our growing community",
      show_view_all: false,
      view_all_text: "",
      view_all_link: "",
      newsletter: {
        title: "Join Our Community",
        description: "Connect with like-minded people and stay updated",
        placeholder: "Enter your email address",
        button_text: "Join Now",
      },
      layout: "newsletter",
      css_class: "newsletter__area newsletter__style-two",
    },
  ];
};

// Export the generated blocks
export default generateHomePageBlocks();
