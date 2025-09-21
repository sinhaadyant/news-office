// Utility functions for processing block data with article information
import {
  getArticleById,
  getArticlesByIds,
  getArticleBySlug,
  getArticlesBySlugs,
  getArticlesByGroup,
  getTrendingArticles,
  getAllArticles,
} from "./articleUtils";

/**
 * Enrich block data with full article information
 * @param {Object} block - Block configuration object
 * @returns {Object} - Block with enriched article data
 */
export const enrichBlockWithArticles = (block) => {
  if (!block) return null;

  const enrichedBlock = { ...block };

  // Add full article objects if articles array exists
  if (block.articles && Array.isArray(block.articles)) {
    // Check if articles are slugs (strings) or IDs (numbers)
    const isSlugs = block.articles.every((item) => typeof item === "string");
    if (isSlugs) {
      enrichedBlock.articlesData = getArticlesBySlugs(block.articles);
    } else {
      enrichedBlock.articlesData = getArticlesByIds(block.articles);
    }
  }

  // Add featured article data if exists
  if (block.featured_article) {
    // Check if featured_article is a slug (string) or ID (number)
    if (typeof block.featured_article === "string") {
      enrichedBlock.featuredArticleData = getArticleBySlug(
        block.featured_article
      );
    } else {
      enrichedBlock.featuredArticleData = getArticleById(
        block.featured_article
      );
    }
  }

  // Add featured articles data if exists (for stories section)
  if (block.featured_articles && Array.isArray(block.featured_articles)) {
    // Check if featured_articles are slugs (strings) or IDs (numbers)
    const isSlugs = block.featured_articles.every(
      (item) => typeof item === "string"
    );
    if (isSlugs) {
      enrichedBlock.featuredArticlesData = getArticlesBySlugs(
        block.featured_articles
      );
    } else {
      enrichedBlock.featuredArticlesData = getArticlesByIds(
        block.featured_articles
      );
    }
  }

  // Add category articles count if categories exist
  if (block.categories && Array.isArray(block.categories)) {
    enrichedBlock.categories = block.categories.map((category) => {
      const categoryArticles = getArticlesByGroup(category.name.toLowerCase());
      return {
        ...category,
        article_count: categoryArticles.length,
        latest_articles: categoryArticles.slice(0, 3).map((article) => ({
          id: article.id,
          title: article.title,
          img: article.img,
          date: article.date,
        })),
      };
    });
  }

  return enrichedBlock;
};

/**
 * Process all blocks and enrich with article data
 * @param {Array} blocks - Array of block configurations
 * @returns {Array} - Array of enriched blocks
 */
export const processBlocksWithArticles = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) {
    return [];
  }

  return blocks.map((block) => enrichBlockWithArticles(block));
};

/**
 * Get block by ID from blocks array
 * @param {Array} blocks - Array of blocks
 * @param {String} blockId - Block ID to find
 * @returns {Object|null} - Found block or null
 */
export const getBlockById = (blocks, blockId) => {
  if (!blocks || !Array.isArray(blocks) || !blockId) {
    return null;
  }

  return blocks.find((block) => block.id === blockId) || null;
};

/**
 * Filter blocks by layout type
 * @param {Array} blocks - Array of blocks
 * @param {String} layout - Layout type to filter by
 * @returns {Array} - Filtered blocks
 */
export const getBlocksByLayout = (blocks, layout) => {
  if (!blocks || !Array.isArray(blocks) || !layout) {
    return [];
  }

  return blocks.filter((block) => block.layout === layout);
};

/**
 * Get blocks that have view all functionality
 * @param {Array} blocks - Array of blocks
 * @returns {Array} - Blocks with view all enabled
 */
export const getBlocksWithViewAll = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) {
    return [];
  }

  return blocks.filter((block) => block.show_view_all === true);
};

/**
 * Get statistics for blocks
 * @param {Array} blocks - Array of blocks
 * @returns {Object} - Block statistics
 */
export const getBlocksStatistics = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) {
    return {
      total_blocks: 0,
      blocks_with_articles: 0,
      total_articles: 0,
      layout_types: {},
    };
  }

  const stats = {
    total_blocks: blocks.length,
    blocks_with_articles: 0,
    total_articles: 0,
    layout_types: {},
  };

  blocks.forEach((block) => {
    // Count blocks with articles
    if (block.articles && Array.isArray(block.articles)) {
      stats.blocks_with_articles++;
      stats.total_articles += block.articles.length;
    }

    // Count layout types
    if (block.layout) {
      stats.layout_types[block.layout] =
        (stats.layout_types[block.layout] || 0) + 1;
    }
  });

  return stats;
};

/**
 * Validate block configuration
 * @param {Object} block - Block to validate
 * @returns {Object} - Validation result
 */
export const validateBlock = (block) => {
  const errors = [];
  const warnings = [];

  if (!block) {
    errors.push("Block is null or undefined");
    return { valid: false, errors, warnings };
  }

  // Required fields
  if (!block.id) errors.push("Block ID is required");
  if (!block.title) errors.push("Block title is required");
  if (!block.block_name) errors.push("Block name is required");
  if (!block.section_title) errors.push("Section title is required");

  // Validate articles if present
  if (block.articles) {
    if (!Array.isArray(block.articles)) {
      errors.push("Articles must be an array");
    } else {
      block.articles.forEach((articleId, index) => {
        if (typeof articleId !== "number") {
          errors.push(`Article ID at index ${index} must be a number`);
        }
      });
    }
  }

  // Validate categories if present
  if (block.categories) {
    if (!Array.isArray(block.categories)) {
      errors.push("Categories must be an array");
    } else {
      block.categories.forEach((category, index) => {
        if (!category.name) {
          errors.push(`Category at index ${index} must have a name`);
        }
        if (!category.image) {
          warnings.push(`Category at index ${index} should have an image`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate all blocks in an array
 * @param {Array} blocks - Blocks to validate
 * @returns {Object} - Validation results for all blocks
 */
export const validateAllBlocks = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) {
    return {
      valid: false,
      errors: ["Blocks array is required"],
      warnings: [],
    };
  }

  const allErrors = [];
  const allWarnings = [];
  let validBlocks = 0;

  blocks.forEach((block, index) => {
    const validation = validateBlock(block);
    if (validation.valid) {
      validBlocks++;
    } else {
      validation.errors.forEach((error) => {
        allErrors.push(`Block ${index}: ${error}`);
      });
    }
    validation.warnings.forEach((warning) => {
      allWarnings.push(`Block ${index}: ${warning}`);
    });
  });

  return {
    valid: allErrors.length === 0,
    total_blocks: blocks.length,
    valid_blocks: validBlocks,
    errors: allErrors,
    warnings: allWarnings,
  };
};
