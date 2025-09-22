// Block and component related types
import { Article, Category } from './article';

export interface BlockData {
  id: string;
  title: string;
  block_name: string;
  section_title: string;
  section_description?: string;
  show_view_all?: boolean;
  view_all_text?: string;
  view_all_link?: string;
  articles?: (string | number)[];
  articlesData?: Article[];
  featured_article?: string | number;
  featuredArticleData?: Article;
  featured_articles?: (string | number)[];
  featuredArticlesData?: Article[];
  categories?: Category[];
  layout?:
    | 'hero'
    | 'grid'
    | 'slider'
    | 'banner'
    | 'video'
    | 'stories'
    | 'newsletter';
  show_item_count?: number;
  background?: 'light' | 'dark';
  css_class?: string;
  newsletter?: NewsletterConfig;
}

export interface NewsletterConfig {
  title: string;
  description: string;
  placeholder: string;
  button_text: string;
  action?: string;
  success_message?: string;
}

export interface BlockComponentProps {
  blockData: BlockData;
  className?: string;
}

export interface DynamicBlockRendererProps {
  blocks: BlockData[];
  className?: string;
}

export interface HomePageBlocks {
  blocks: BlockData[];
  lastUpdated: string;
  version: string;
}
