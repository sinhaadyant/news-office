const homePageBlocks = [
  // Hero Banner Section
  {
    title: "Hero Banner",
    block_name: "hero-banner",
    section_title: "Latest News",
    section_description: "Stay updated with the latest trending stories",
    show_view_all: true,
    view_all_text: "View All News",
    view_all_link: "/blog",
    articles: [1, 2, 3, 4, 5, 6, 7, 8],
    layout: "grid",
    featured_article: 1,
  },

  // Popular Posts Section
  {
    title: "Popular Posts",
    block_name: "popular-posts",
    section_title: "Popular Stories",
    section_description: "Most read articles this week",
    show_view_all: true,
    view_all_text: "More Popular Posts",
    view_all_link: "/blog?filter=popular",
    articles: [9, 10, 11, 12, 13, 14, 15, 16],
    layout: "slider",
    show_item_count: 4,
  },

  // Featured Posts Section
  {
    title: "Featured Posts",
    block_name: "featured-posts",
    section_title: "Editor Choice",
    section_description: "Hand-picked articles by our editors",
    show_view_all: true,
    view_all_text: "More Featured Post",
    view_all_link: "/blog?filter=featured",
    articles: [25, 26, 27, 28, 29, 30],
    layout: "grid",
    show_item_count: 6,
  },

  // Video Posts Section
  {
    title: "Video Posts",
    block_name: "video-posts",
    section_title: "Recent Video Post",
    section_description: "Latest video content",
    show_view_all: true,
    view_all_text: "More Video Post",
    view_all_link: "/blog?filter=video",
    articles: [31, 32, 33, 34, 35],
    layout: "video",
    featured_article: 31,
  },

  // Trending News Section
  {
    title: "Trending News",
    block_name: "trending-news",
    section_title: "Trending Stories",
    section_description: "What's trending right now",
    show_view_all: true,
    view_all_text: "View All Trending",
    view_all_link: "/blog?filter=trending",
    articles: [17, 18, 19, 20, 21, 22, 23, 24],
    layout: "slider",
    show_item_count: 6,
    background: "dark",
  },

  // Category Section
  {
    title: "Top Categories",
    block_name: "categories",
    section_title: "Top Categories",
    section_description: "Explore content by category",
    show_view_all: true,
    view_all_text: "More Categories",
    view_all_link: "/categories",
    categories: [
      {
        name: "Technology",
        image: "category01.jpg",
        link: "/blog?category=tech",
      },
      {
        name: "Gaming",
        image: "category02.jpg",
        link: "/blog?category=gaming",
      },
      {
        name: "Sports",
        image: "category03.jpg",
        link: "/blog?category=sports",
      },
      { name: "Movie", image: "category04.jpg", link: "/blog?category=movie" },
      { name: "NFT", image: "category05.jpg", link: "/blog?category=nft" },
    ],
    layout: "grid",
  },

  // Interior/Design Section
  {
    title: "Interior & Design",
    block_name: "interior-section",
    section_title: "Interior & Design",
    section_description: "Latest in interior design trends",
    show_view_all: true,
    view_all_text: "More Interior Posts",
    view_all_link: "/interior",
    articles: [31, 32, 33, 34, 35, 36],
    layout: "slider",
    show_item_count: 4,
  },

  // Travel Section
  {
    title: "Travel Stories",
    block_name: "travel-section",
    section_title: "Travel Stories",
    section_description: "Adventure and travel experiences",
    show_view_all: true,
    view_all_text: "More Travel Posts",
    view_all_link: "/travel",
    articles: [51, 52, 53, 54, 55, 56, 57, 58],
    layout: "grid",
    featured_article: 51,
  },

  // Technology Section
  {
    title: "Technology",
    block_name: "technology-section",
    section_title: "Technology News",
    section_description: "Latest in tech and innovation",
    show_view_all: true,
    view_all_text: "More Tech News",
    view_all_link: "/technology",
    articles: [72, 73, 74, 75, 76, 77, 78],
    layout: "slider",
    show_item_count: 4,
  },

  // NFT Section
  {
    title: "NFT & Crypto",
    block_name: "nft-section",
    section_title: "NFT & Crypto",
    section_description: "Digital art and cryptocurrency news",
    show_view_all: true,
    view_all_text: "More NFT Posts",
    view_all_link: "/nft",
    articles: [79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
    layout: "slider",
    show_item_count: 6,
  },

  // Lifestyle Section
  {
    title: "Lifestyle",
    block_name: "lifestyle-section",
    section_title: "Lifestyle",
    section_description: "Life, style, and culture",
    show_view_all: true,
    view_all_text: "More Lifestyle Posts",
    view_all_link: "/lifestyle",
    articles: [98, 99, 100, 101, 102, 103, 104, 105],
    layout: "grid",
  },

  // Minimal Section
  {
    title: "Minimal Design",
    block_name: "minimal-section",
    section_title: "Minimal Design",
    section_description: "Clean and minimal design inspiration",
    show_view_all: true,
    view_all_text: "More Minimal Posts",
    view_all_link: "/minimal",
    articles: [115, 116, 117, 118, 119, 120, 121, 122, 123],
    layout: "slider",
    show_item_count: 4,
  },

  // Hand-picked Section
  {
    title: "Hand-picked",
    block_name: "handpicked-section",
    section_title: "More to Watch",
    section_description: "Curated content just for you",
    show_view_all: true,
    view_all_text: "Hand-Picked Posts",
    view_all_link: "/blog?filter=handpicked",
    articles: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    layout: "slider",
    show_item_count: 6,
    background: "dark",
  },

  // Stories Section
  {
    title: "Stories",
    block_name: "stories",
    section_title: "Popular Stories",
    section_description: "Most engaging stories",
    show_view_all: true,
    view_all_text: "Stories Post",
    view_all_link: "/blog?filter=stories",
    articles: [100, 101, 102, 103, 104, 105],
    layout: "stories",
    featured_articles: [100, 101],
  },

  // Newsletter Section
  {
    title: "Newsletter",
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
  },
];

export default homePageBlocks;
