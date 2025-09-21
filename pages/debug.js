import Layout from "@/components/layout/Layout";
import homePageBlocks from "@/data/blocks/home_page";
import { getArticleById } from "@/util/articleUtils";

export default function DebugPage() {
  const testArticle = getArticleById(1);

  return (
    <Layout headerStyle={1}>
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>Debug Information</h1>
        
        <h2>Home Page Blocks</h2>
        <p>Blocks count: {homePageBlocks?.length || 0}</p>
        <pre>{JSON.stringify(homePageBlocks, null, 2)}</pre>
        
        <h2>Test Article</h2>
        <p>Article ID 1: {testArticle ? testArticle.title : "Not found"}</p>
        <pre>{JSON.stringify(testArticle, null, 2)}</pre>
      </div>
    </Layout>
  );
}
