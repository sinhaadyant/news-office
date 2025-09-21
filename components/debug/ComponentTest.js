import HeroBanner from "../blocks/sections/HeroBanner";

const ComponentTest = () => {
  const testBlock = {
    title: "Test Hero Banner",
    block_name: "hero-banner",
    section_title: "Test Section",
    articles: [1, 2, 3, 4, 5],
    featured_article: 1,
  };

  return (
    <div style={{ padding: "20px", background: "#e0e0e0", margin: "20px" }}>
      <h3>Component Test</h3>
      <p>Testing HeroBanner component directly:</p>
      <HeroBanner blockData={testBlock} />
    </div>
  );
};

export default ComponentTest;
