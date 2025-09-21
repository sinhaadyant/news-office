import fs from "fs";
import path from "path";

// Cache for articles to avoid reading files repeatedly
let articlesCache = null;

// Function to load all articles from individual JSON files (Server-side only)
const loadArticles = () => {
  if (articlesCache) {
    return articlesCache;
  }

  const articlesDir = path.join(process.cwd(), "data", "articles");
  const articles = {};

  try {
    // Read all article files
    const files = fs.readdirSync(articlesDir);

    files.forEach((file) => {
      if (file.endsWith(".json")) {
        const filePath = path.join(articlesDir, file);
        const articleData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        articles[articleData.id] = articleData;
      }
    });

    articlesCache = articles;
    return articles;
  } catch (error) {
    console.error("Error loading articles:", error);
    return {};
  }
};

// Function to get article by ID
export const getArticleById = (id) => {
  const articles = loadArticles();
  return articles[id] || null;
};

// Function to get articles by IDs array
export const getArticlesByIds = (ids) => {
  const articles = loadArticles();
  return ids.map((id) => articles[id]).filter(Boolean);
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

// Function to clear cache (useful for development)
export const clearArticlesCache = () => {
  articlesCache = null;
};
