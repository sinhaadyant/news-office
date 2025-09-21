import Layout from "@/components/layout/Layout";
import DynamicBlockRenderer from "@/components/blocks/DynamicBlockRenderer";
import homePageBlocks from "@/data/blocks/home_page_blocks";
import { processBlocksWithArticles } from "@/util/blockDataUtils";

export default function Home1() {
  // Process blocks with article data
  const enrichedBlocks = processBlocksWithArticles(homePageBlocks);

  return (
    <>
      <Layout headerStyle={1}>
        <DynamicBlockRenderer blocks={enrichedBlocks} />
      </Layout>
    </>
  );
}
