import Link from "next/link";

const Categories = ({ blockData }) => {
  // Return null if no blockData or categories
  if (!blockData || !blockData.categories || !Array.isArray(blockData.categories)) {
    return null;
  }

  return (
    <section className="category__area section__hover-line pt-75">
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">category</span>
                <h3 className="section__main-title">
                  {blockData.section_title}
                </h3>
              </div>
            </div>
            {blockData.show_view_all && (
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href={blockData.view_all_link}>
                    {blockData.view_all_text}{" "}
                    <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="category__wrapper">
          {blockData.categories.map((category, index) => (
            <div key={index} className="category__item">
              <Link href={category.link}>
                <img
                  src={`/assets/img/category/${category.image}`}
                  alt={category.name}
                />
                <span className="cat-name">{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
