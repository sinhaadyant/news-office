// Domain interfaces for the news application

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  avatar?: Image;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: Image;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: Image;
  gallery?: Image[];
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  likes: number;
  comments: Comment[];
  relatedArticles?: Article[];
  seo?: SEOData;
  status: 'draft' | 'published' | 'archived';
}

export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  publishedAt: string;
  replies?: Comment[];
  isApproved: boolean;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: Record<string, unknown>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface APIResponse<T> {
  data: T;
  pagination?: Pagination;
  success: boolean;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'editor' | 'admin';
  preferences?: {
    theme?: 'light' | 'dark';
    newsletter?: boolean;
    notifications?: boolean;
  };
  createdAt: string;
  lastLogin?: string;
}

export interface BlockData {
  id: string;
  type: string;
  title?: string;
  config?: Record<string, unknown>;
  articles?: Article[];
  data?: Record<string, unknown>;
}

export interface PageData {
  title: string;
  description: string;
  blocks: BlockData[];
  seo?: SEOData;
}

export interface AdSlot {
  id: string;
  type: 'banner' | 'sidebar' | 'in-article' | 'popup';
  position: string;
  size: {
    width: number;
    height: number;
  };
  provider?: string;
  adUnit?: string;
  fallback?: React.ReactNode;
}

export interface InfiniteScrollConfig {
  threshold: number;
  rootMargin: string;
  enabled: boolean;
  onPageChange?: (page: number) => void;
  onLoadMore?: () => void;
}

export interface AdBlockState {
  isDetected: boolean;
  isTested: boolean;
  userDismissed: boolean;
  lastChecked: number;
}

// Utility types
export type SortOrder = 'asc' | 'desc';
export type SortField = 'publishedAt' | 'title' | 'views' | 'likes';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface FilterConfig {
  category?: string;
  author?: string;
  tags?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  search?: string;
}

export interface QueryParams extends FilterConfig {
  page?: number;
  limit?: number;
  sort?: SortConfig;
}

// Component Props Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  articles: Article[];
  pagination: Pagination;
  seo: SEOData;
}

export interface ArticleCardProps extends ComponentProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  showAuthor?: boolean;
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface SkeletonProps extends ComponentProps {
  variant?: 'article' | 'list' | 'hero' | 'sidebar' | 'author' | 'comments';
  count?: number;
  height?: number;
  width?: number;
}

// Error types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

// Hook return types
export interface UseInfiniteScrollReturn<T> {
  items: T[];
  isLoading: boolean;
  hasMore: boolean;
  error?: Error | undefined;
  loadMore: () => void;
  reset: () => void;
}

export interface UseAdBlockDetectorReturn {
  isAdBlockActive: boolean;
  isTested: boolean;
  retryDetection: () => void;
}

export interface UseSEOReturn {
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateImage: (image: string) => void;
  updateStructuredData: (data: Record<string, unknown>) => void;
}
