import Link from "next/link";

export default function CategoriesSection({ blockData }) {
  // Fallback data if blockData is not provided
  const defaultBlockData = {
    section_title: "Top Categories",
    section_description: "Explore content by category",
    show_view_all: true,
    view_all_text: "More Category",
    view_all_link: "/blog",
    css_class: "category__area section__hover-line pt-75",
    categories: [
      {
        name: "technology",
        image: "category01.jpg",
        link: "/blog",
        article_count: 0,
      },
      {
        name: "multiverse",
        image: "category02.jpg",
        link: "/blog",
        article_count: 0,
      },
      {
        name: "sports",
        image: "category03.jpg",
        link: "/blog",
        article_count: 0,
      },
      {
        name: "nature",
        image: "category04.jpg",
        link: "/blog",
        article_count: 0,
      },
      {
        name: "crypto / nft",
        image: "category05.jpg",
        link: "/blog",
        article_count: 0,
      },
    ],
  };

  const data = blockData || defaultBlockData;

  return (
    <section className={data.css_class}>
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">category</span>
                <h3 className="section__main-title">{data.section_title}</h3>
                {data.section_description && (
                  <p className="section__description">
                    {data.section_description}
                  </p>
                )}
              </div>
            </div>
            {data.show_view_all && (
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href={data.view_all_link}>
                    {data.view_all_text}{" "}
                    <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="category__wrapper">
          {data.categories.map((category, index) => (
            <div key={index} className="category__item">
              <Link href={category.link}>
                <img
                  src={`/assets/img/category/${category.image}`}
                  alt={category.name}
                  loading="lazy"
                />
                <span className="cat-name">{category.name}</span>
                {category.article_count !== undefined && (
                  <span className="cat-count">({category.article_count})</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
