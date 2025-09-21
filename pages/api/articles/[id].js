import { getArticleById } from "@/util/articleUtilsServer";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const article = getArticleById(parseInt(id));

    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
