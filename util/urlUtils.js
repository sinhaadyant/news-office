/**
 * URL Utility Functions
 * Centralized functions for generating consistent URLs throughout the application
 */

/**
 * Generate category URL from category name
 * @param {string} category - Category name
 * @returns {string} - Category URL
 */
export const getCategoryLink = (category) => {
  const categoryMap = {
    Gaming: "/gaming",
    Tech: "/technology",
    Movie: "/movie",
    Sports: "/sports",
    NFT: "/nft",
    Lifestyle: "/lifestyle",
  };
  return categoryMap[category] || "/blog";
};

/**
 * Generate author URL from author name
 * @param {string} author - Author name
 * @returns {string} - Author URL
 */
export const getAuthorLink = (author) => {
  if (!author) return "/author/unknown";
  return `/author/${author.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
};

/**
 * Generate article URL from article data
 * @param {Object} article - Article object with slug or title
 * @returns {string} - Article URL
 */
export const getArticleLink = (article) => {
  if (!article) return "/article/unknown";

  if (article.slug) {
    return `/article/${article.slug}`;
  }

  if (article.title) {
    // Generate slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
    return `/article/${slug}`;
  }

  return "/article/unknown";
};

/**
 * Normalize author name for URL comparison
 * @param {string} name - Author name
 * @returns {string} - Normalized name
 */
export const normalizeAuthorName = (name) => {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
};

/**
 * Get display name from normalized name
 * @param {string} normalizedName - Normalized name
 * @returns {string} - Display name
 */
export const getDisplayName = (normalizedName) => {
  if (!normalizedName) return "";
  return normalizedName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Generate category display name
 * @param {string} category - Category name
 * @returns {string} - Display name
 */
export const getCategoryDisplayName = (category) => {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

/**
 * Generate author display name
 * @param {string} author - Author name
 * @returns {string} - Display name
 */
export const getAuthorDisplayName = (author) => {
  if (!author) return "";
  return author.charAt(0).toUpperCase() + author.slice(1).toLowerCase();
};
