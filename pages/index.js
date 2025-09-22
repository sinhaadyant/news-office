import React from 'react';
import Layout from '@/components/layout/Layout';
import DynamicBlockRenderer from '@/components/blocks/DynamicBlockRenderer';
import { AdBlockBannerPackage } from '@/components/common/AdBlockBannerPackage';
import homePageBlocks from '@/data/blocks/home_page_blocks';
import { processBlocksWithArticles } from '@/util/blockDataUtils';

export default function Home1() {
  // Process blocks with article data
  const enrichedBlocks = processBlocksWithArticles(homePageBlocks);

  return (
    <>
      <Layout headerStyle={1}>
        {/* AdBlock Warning Banner */}
        <AdBlockBannerPackage
          message='Please consider supporting us by disabling your ad blocker to help us continue providing quality content.'
          onDismiss={() => console.log('Banner dismissed')}
        />

        <DynamicBlockRenderer blocks={enrichedBlocks} />
      </Layout>
    </>
  );
}
