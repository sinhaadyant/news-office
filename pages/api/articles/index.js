import {
  getAllArticles,
  getArticlesByCategory,
  getTrendingArticles,
} from "@/util/articleUtilsServer";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { category, trending } = req.query;

    let articles;

    if (category) {
      articles = getArticlesByCategory(category);
    } else if (trending === "true") {
      articles = getTrendingArticles();
    } else {
      articles = getAllArticles();
    }

    res.status(200).json(articles);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
