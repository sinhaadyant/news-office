import Layout from "@/components/layout/Layout";
import DynamicBlockRenderer from "@/components/blocks/DynamicBlockRenderer";
import homePageBlocks from "@/data/blocks/home_page";

export default function DynamicHome() {
  return (
    <>
      <Layout headerStyle={1}>
        <DynamicBlockRenderer blocks={homePageBlocks} />
      </Layout>
    </>
  );
}
