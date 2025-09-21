// Import all block components directly
import HeroBanner from "./sections/HeroBanner";
import BannerGrid from "./sections/BannerGrid";
import NftSliderSection from "./sections/NftSliderSection";
import TrendingBanner from "./sections/TrendingBanner";
import PopularPosts from "./sections/PopularPosts";
import TrendingNews from "./sections/TrendingNews";
import FeaturedPosts from "./sections/FeaturedPosts";
import VideoPosts from "./sections/VideoPosts";
import HandpickedSection from "./sections/HandpickedSection";
import StoriesSection from "./sections/StoriesSection";
import NewsletterSection from "./sections/NewsletterSection";
import InteriorSlider from "./sections/InteriorSlider";
import CategoriesSection from "./sections/CategoriesSection";
import HandpickedPosts from "./sections/HandpickedPosts";
import NewsletterStyleTwo from "./sections/NewsletterStyleTwo";

// Block component mapping
const blockComponents = {
  "hero-banner": HeroBanner,
  "banner-grid": BannerGrid,
  "nft-slider": NftSliderSection,
  "trending-banner": TrendingBanner,
  "popular-posts": PopularPosts,
  "trending-news": TrendingNews,
  "featured-posts": FeaturedPosts,
  "video-posts": VideoPosts,
  "handpicked-section": HandpickedSection,
  "stories-section": StoriesSection,
  "newsletter-section": NewsletterSection,
  "interior-slider": InteriorSlider,
  "categories-section": CategoriesSection,
  "handpicked-posts": HandpickedPosts,
  "newsletter-style-two": NewsletterStyleTwo,
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
