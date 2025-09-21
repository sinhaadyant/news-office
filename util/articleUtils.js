// Import the original blog data for client-side use
import blogData from "./blogData.js";

// Cache for articles to avoid processing repeatedly
let articlesCache = null;

// Function to load all articles from the original blog data
const loadArticles = () => {
  if (articlesCache) {
    return articlesCache;
  }

  const articles = {};

  try {
    // Convert the array to an object with id as key
    blogData.forEach((article) => {
      articles[article.id] = article;
    });

    articlesCache = articles;
    return articles;
  } catch (error) {
    console.error("Error loading articles:", error);
    return {};
  }
};

// Function to get articles by IDs array
export const getArticlesByIds = (ids) => {
  if (!Array.isArray(ids)) {
    return [];
  }
  const articles = loadArticles();
  return ids.map((id) => articles[id]).filter(Boolean);
};

// Function to get articles by slugs array
export const getArticlesBySlugs = (slugs) => {
  if (!Array.isArray(slugs)) {
    return [];
  }
  const articles = loadArticles();
  return slugs.map((slug) => getArticleBySlug(slug)).filter(Boolean);
};

// Function to get articles by category
export const getArticlesByCategory = (category) => {
  const articles = loadArticles();
  return Object.values(articles).filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get articles by group
export const getArticlesByGroup = (group) => {
  const articles = loadArticles();
  return Object.values(articles).filter(
    (article) => article.group.toLowerCase() === group.toLowerCase()
  );
};

// Function to get trending articles
export const getTrendingArticles = () => {
  const articles = loadArticles();
  return Object.values(articles).filter((article) => article.trending);
};

// Function to get all articles
export const getAllArticles = () => {
  const articles = loadArticles();
  return Object.values(articles);
};

// Function to get trending categories with article counts
export const getTrendingCategories = () => {
  const articles = loadArticles();
  const categoryCounts = {};

  // Count articles by category
  Object.values(articles).forEach((article) => {
    const category = article.category || article.group;
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  // Convert to array and sort by count (descending)
  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name: name.toLowerCase(),
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      count,
      link: `/${name.toLowerCase()}`,
      image: getCategoryImage(name.toLowerCase()),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Get top 5 categories
};

// Helper function to get category image
const getCategoryImage = (categoryName) => {
  const imageMap = {
    gaming: "side_category01.jpg",
    technology: "side_category02.jpg",
    sports: "side_category03.jpg",
    movie: "side_category04.jpg",
    nft: "side_category05.jpg",
    lifestyle: "side_category01.jpg",
    interior: "side_category02.jpg",
    travel: "side_category03.jpg",
    minimal: "side_category04.jpg",
    blog: "side_category05.jpg",
  };

  return imageMap[categoryName] || "side_category01.jpg";
};

// Function to generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim("-"); // Remove leading/trailing hyphens
};

// Function to get article by slug
export const getArticleBySlug = (slug) => {
  const articles = loadArticles();
  return Object.values(articles).find((article) => {
    const articleSlug = article.slug || generateSlug(article.title);
    return articleSlug === slug;
  });
};

// Function to get article by ID (for backward compatibility)
export const getArticleById = (id) => {
  if (!id || typeof id !== "number") {
    return null;
  }
  const articles = loadArticles();
  return articles[id] || null;
};

// Function to get related articles by category
export const getRelatedArticles = (currentArticle, limit = 3) => {
  const articles = loadArticles();
  return Object.values(articles)
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
          article.group === currentArticle.group)
    )
    .slice(0, limit);
};

// Function to get next/previous articles
export const getAdjacentArticles = (currentId) => {
  const articles = loadArticles();
  const articleIds = Object.keys(articles)
    .map(Number)
    .sort((a, b) => a - b);
  const currentIndex = articleIds.indexOf(Number(currentId));

  const prevId = currentIndex > 0 ? articleIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < articleIds.length - 1 ? articleIds[currentIndex + 1] : null;

  return {
    prev: prevId ? articles[prevId] : null,
    next: nextId ? articles[nextId] : null,
  };
};

// Function to clear cache (useful for development)
export const clearArticlesCache = () => {
  articlesCache = null;
};
