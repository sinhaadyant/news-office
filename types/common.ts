// Common types used across the application

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogUrl?: string;
  structuredData?: object;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string | string[];
  noindex?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showNumbers?: boolean;
  showPrevNext?: boolean;
  className?: string;
}

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: {
    type: 'free' | 'premium' | 'pro';
    expiresAt?: string;
    isActive: boolean;
  };
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    newsletter: boolean;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface MenuItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: MenuItem[];
  external?: boolean;
  badge?: string;
  disabled?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socialLinks: SocialLink[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  logo: string;
  favicon: string;
  contact: ContactInfo;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultImage: string;
  };
}
