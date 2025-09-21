import Layout from "@/components/layout/Layout";
import DynamicBlockRenderer from "@/components/blocks/DynamicBlockRenderer";
import homePageBlocks from "@/data/blocks/home_page";
import { useState } from "react";
import ModalVideo from "react-modal-video";

export default function Home1() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Layout headerStyle={1}>
        <DynamicBlockRenderer blocks={homePageBlocks} />
      </Layout>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="hAP2QF--2Dg"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
