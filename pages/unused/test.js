import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/blocks/sections/HeroBanner";
import { getArticleById } from "@/util/articleUtils";

export default function TestPage() {
  // Test data
  const testBlock = {
    title: "Test Hero Banner",
    block_name: "hero-banner",
    section_title: "Test Section",
    articles: [1, 2, 3, 4, 5],
    featured_article: 1,
  };

  // Test article loading
  const testArticle = getArticleById(1);

  return (
    <Layout headerStyle={1}>
      <div style={{ padding: "20px" }}>
        <h1>Test Page</h1>
        <p>Test article loaded: {testArticle ? testArticle.title : "Not found"}</p>
        <hr />
        <h2>Hero Banner Test</h2>
        <HeroBanner blockData={testBlock} />
      </div>
    </Layout>
  );
}
