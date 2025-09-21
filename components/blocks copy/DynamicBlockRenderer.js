// Import all block components directly
import HeroBanner from "./sections/HeroBanner";
import PopularPosts from "./sections/PopularPosts";
import FeaturedPosts from "./sections/FeaturedPosts";
import VideoPosts from "./sections/VideoPosts";
import TrendingNews from "./sections/TrendingNews";
import Categories from "./sections/Categories";
import InteriorSection from "./sections/InteriorSection";
import TravelSection from "./sections/TravelSection";
import TechnologySection from "./sections/TechnologySection";
import NftSection from "./sections/NftSection";
import LifestyleSection from "./sections/LifestyleSection";
import MinimalSection from "./sections/MinimalSection";
import HandpickedSection from "./sections/HandpickedSection";
import NewsletterSection from "./sections/NewsletterSection";

// Block component mapping
const blockComponents = {
  "hero-banner": HeroBanner,
  "popular-posts": PopularPosts,
  "featured-posts": FeaturedPosts,
  "video-posts": VideoPosts,
  "trending-news": TrendingNews,
  categories: Categories,
  "interior-section": InteriorSection,
  "travel-section": TravelSection,
  "technology-section": TechnologySection,
  "nft-section": NftSection,
  "lifestyle-section": LifestyleSection,
  "minimal-section": MinimalSection,
  "handpicked-section": HandpickedSection,
  "newsletter-section": NewsletterSection,
};

const DynamicBlockRenderer = ({ blocks }) => {
  // Return null if no blocks provided
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  const renderBlock = (block) => {
    // Skip if block is null or undefined
    if (!block) {
      return null;
    }

    const BlockComponent = blockComponents[block.block_name];

    if (!BlockComponent) {
      return null;
    }

    return (
      <BlockComponent key={block.title || block.block_name} blockData={block} />
    );
  };

  return <>{blocks.map((block) => renderBlock(block))}</>;
};

export default DynamicBlockRenderer;
