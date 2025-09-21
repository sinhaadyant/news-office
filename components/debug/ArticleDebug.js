import { getArticleById, getAllArticles } from "@/util/articleUtils";

const ArticleDebug = () => {
  const allArticles = getAllArticles();
  const testArticle = getArticleById(1);

  console.log("All articles count:", allArticles.length);
  console.log("Test article (ID 1):", testArticle);

  return (
    <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px" }}>
      <h3>Article Debug Info</h3>
      <p>Total articles loaded: {allArticles.length}</p>
      <p>
        Test article (ID 1): {testArticle ? testArticle.title : "Not found"}
      </p>
      <p>
        First 5 article IDs:{" "}
        {allArticles
          .slice(0, 5)
          .map((a) => a.id)
          .join(", ")}
      </p>
    </div>
  );
};

export default ArticleDebug;
