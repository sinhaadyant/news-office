// Utility to help identify and fix image path issues
// This script can be used to find and fix hardcoded image paths

export const findIncorrectImagePaths = () => {
  // List of common incorrect patterns
  const incorrectPatterns = [
    "/assets/img/article/",
    "/assets/img/blog/blog0", // Should be dynamic based on group
    "blog01.jpg", // Should use actual article data
    "blog02.jpg",
    "blog03.jpg",
    "blog14.jpg",
  ];

  return incorrectPatterns;
};

export const getCorrectImagePath = (article) => {
  if (!article || !article.group || !article.img) {
    return "/assets/img/blog/blog01.jpg"; // fallback
  }

  return `/assets/img/${article.group}/${article.img}`;
};

export const validateImagePath = (path) => {
  // Check if path follows the correct pattern
  const correctPattern =
    /^\/assets\/img\/[a-z]+\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/i;
  return correctPattern.test(path);
};

export const fixHardcodedImagePath = (oldPath, article) => {
  // Common fixes for hardcoded paths
  const fixes = {
    "/assets/img/article/blog01.jpg":
      getCorrectImagePath(article) || "/assets/img/blog/blog01.jpg",
    "/assets/img/article/blog02.jpg":
      getCorrectImagePath(article) || "/assets/img/blog/blog02.jpg",
    "/assets/img/article/blog03.jpg":
      getCorrectImagePath(article) || "/assets/img/blog/blog03.jpg",
    "/assets/img/article/blog14.jpg":
      getCorrectImagePath(article) || "/assets/img/blog/blog14.jpg",
  };

  return fixes[oldPath] || oldPath;
};

// Example usage in components:
/*
// Instead of:
<img src="/assets/img/article/blog01.jpg" alt="img" />

// Use:
<img src={getCorrectImagePath(article)} alt={article.title} />

// Or with fallback:
<img src={article ? `/assets/img/${article.group}/${article.img}` : '/assets/img/blog/blog01.jpg'} alt={article?.title || 'img'} />
*/
