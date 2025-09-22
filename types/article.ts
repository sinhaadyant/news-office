// Article related types

export interface Article {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  author: string;
  category: string;
  date: string;
  img: string;
  group: string;
  trending?: boolean;
  premium?: boolean;
  tags?: string[];
  featured?: boolean;
  views?: number;
  likes?: number;
  comments?: number;
}

export interface Author {
  name: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  totalArticles?: number;
  firstArticleDate?: string;
  lastArticleDate?: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  articleCount?: number;
  featured?: boolean;
}

export interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  error?: string | null;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  className?: string;
}

export interface RelatedArticlesProps {
  article: Article;
  count?: number;
  excludeId?: number;
}

export interface ArticleSearchFilters {
  category?: string;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  trending?: boolean;
  premium?: boolean;
  search?: string;
}

export interface ArticlePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}
