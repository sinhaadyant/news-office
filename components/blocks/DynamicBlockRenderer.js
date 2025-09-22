// Import all block components directly
import React from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AdBlock from "@/components/ads/AdBlock";
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

  const renderBlock = (block, index) => {
    // Skip if block is null or undefined
    if (!block) {
      return null;
    }

    const BlockComponent = blockComponents[block.block_name];

    if (!BlockComponent) {
      return null;
    }

    // Skip ads for hero banner and newsletter sections
    const skipAdBlocks = ['hero-banner', 'newsletter-section', 'newsletter-style-two'];
    const shouldShowAd = !skipAdBlocks.includes(block.block_name);

    return (
      <React.Fragment key={block.title || block.block_name || index}>
        <ErrorBoundary>
          <BlockComponent blockData={block} />
        </ErrorBoundary>
        {shouldShowAd && (
          <AdBlock 
            type="block" 
            id={`home-block-${index}`}
            slot={`home-block-${block.block_name}`}
          />
        )}
      </React.Fragment>
    );
  };

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};

export default DynamicBlockRenderer;
