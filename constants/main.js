// Common constants for all pages
export const PAGINATION_CONFIG = {
  // Latest News pagination
  LATEST_NEWS_ITEMS_PER_PAGE: 2,

  // Blog pagination
  BLOG_ITEMS_PER_PAGE: 10,

  // Category pagination
  CATEGORY_ITEMS_PER_PAGE: 10,

  // Article pagination
  ARTICLE_ITEMS_PER_PAGE: 8,

  // General pagination
  DEFAULT_ITEMS_PER_PAGE: 6,

  // Load more threshold (pixels from bottom)
  SCROLL_THRESHOLD: 1000,

  // Max pages to show in pagination
  MAX_VISIBLE_PAGES: 5,
};

// Layout constants
export const LAYOUT_CONFIG = {
  // Header styles
  HEADER_STYLE_DEFAULT: 1,
  HEADER_STYLE_LATEST: 6,

  // Footer styles
  FOOTER_STYLE_DEFAULT: 1,
  FOOTER_STYLE_LATEST: 3,

  // Footer classes
  FOOTER_CLASS_DEFAULT: "",
  FOOTER_CLASS_LATEST: "black-bg",

  // Logo variants
  LOGO_WHITE_DEFAULT: false,
  LOGO_WHITE_LATEST: true,
};

// Grid and column configurations
export const GRID_CONFIG = {
  // Bootstrap column classes
  MAIN_CONTENT_COL: "col-xl-9 col-lg-8",
  SIDEBAR_COL: "col-xl-3 col-lg-4 col-md-6",
  FULL_WIDTH_COL: "col-12",

  // Container classes
  CONTAINER_DEFAULT: "container",
  CONTAINER_FLUID: "container-fluid",

  // Row classes
  ROW_CENTER: "row justify-content-center",
  ROW_DEFAULT: "row",
};

// Section classes
export const SECTION_CONFIG = {
  // Latest news section
  LATEST_POST_AREA: "latest-post-area pt-80 pb-80",

  // Blog section
  BLOG_POST_AREA: "blog-post-area pt-80 pb-80",

  // Category section
  CATEGORY_POST_AREA: "category-post-area pt-80 pb-80",

  // Article section
  ARTICLE_POST_AREA: "article-post-area pt-80 pb-80",
};

// Button configurations
export const BUTTON_CONFIG = {
  // Primary button
  BTN_PRIMARY: "btn",

  // Secondary button
  BTN_SECONDARY: "btn btn-outline-primary",

  // Large button
  BTN_LARGE: "btn btn-lg",

  // Small button
  BTN_SMALL: "btn btn-sm",
};

// Loading states
export const LOADING_CONFIG = {
  // Spinner sizes
  SPINNER_SMALL: "spinner-border spinner-border-sm",
  SPINNER_DEFAULT: "spinner-border",
  SPINNER_LARGE: "spinner-border spinner-border-lg",

  // Loading text
  LOADING_DEFAULT: "Loading...",
  LOADING_MORE: "Loading more...",
  LOADING_ARTICLES: "Loading articles...",
};

