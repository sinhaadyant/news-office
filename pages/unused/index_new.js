import Layout from "@/components/layout/Layout";
import {
  HeroBanner,
  BannerGrid,
  NftSliderSection,
  TrendingBanner,
  PopularPosts,
  TrendingNews,
  FeaturedPosts,
  VideoPosts,
  HandpickedSection,
  StoriesSection,
  NewsletterSection,
  InteriorSlider,
  CategoriesSection,
  HandpickedPosts,
  NewsletterStyleTwo,
} from "@/components/blocks/sections";

export default function Home1() {
  return (
    <>
      <Layout headerStyle={1}>
        <HeroBanner />
        <BannerGrid />
        <NftSliderSection />
        <TrendingBanner />
        <PopularPosts />
        <TrendingNews />
        <FeaturedPosts />
        <VideoPosts />
        <HandpickedSection />
        <StoriesSection />
        <NewsletterSection />
        <InteriorSlider />
        <PopularPosts />
        <CategoriesSection />
        <TrendingNews />
        <HandpickedPosts />
        <NewsletterStyleTwo />
      </Layout>
    </>
  );
}
