// Utility script to help update section components with dynamic blockData props
// This file provides templates and examples for updating section components

export const sectionComponentTemplate = `
// Template for updating section components with dynamic blockData props

export default function ComponentName({ blockData }) {
  // Fallback data if blockData is not provided
  const defaultBlockData = {
    section_title: "Default Title",
    section_description: "Default description",
    show_view_all: true,
    view_all_text: "View All",
    view_all_link: "/blog",
    css_class: "default-class",
    articlesData: [],
    // Add other specific properties as needed
  };

  const data = blockData || defaultBlockData;

  return (
    <section className={data.css_class}>
      <div className="container">
        <div className="section__title-wrap mb-40">
          <div className="row align-items-end">
            <div className="col-sm-6">
              <div className="section__title">
                <span className="section__sub-title">Subtitle</span>
                <h3 className="section__main-title">{data.section_title}</h3>
                {data.section_description && (
                  <p className="section__description">{data.section_description}</p>
                )}
              </div>
            </div>
            {data.show_view_all && (
              <div className="col-sm-6">
                <div className="section__read-more text-start text-sm-end">
                  <Link href={data.view_all_link}>
                    {data.view_all_text} <i className="far fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Component-specific content */}
      </div>
    </section>
  );
}
`;

export const componentUpdateInstructions = {
  // Instructions for updating each component type
  "slider-components": {
    description:
      "Components that use sliders (PopularPosts, TrendingNews, etc.)",
    changes: [
      "Add blockData prop with fallback data",
      "Pass articlesData to slider components",
      "Use dynamic show_item_count from blockData",
      "Add conditional CSS classes for dark backgrounds",
    ],
    example: `
// Before
<PopularSlider />

// After  
<PopularSlider articles={data.articlesData} showItem={data.show_item_count} />
    `,
  },

  "grid-components": {
    description: "Components that display articles in grid layout",
    changes: [
      "Add blockData prop with fallback data",
      "Map through articlesData to render article cards",
      "Use dynamic article data for titles, images, links",
      "Add loading states and error handling",
    ],
    example: `
// Before
<div className="article__item">
  <img src="/assets/img/blog/blog01.jpg" alt="img" />
  <h4>Article Title</h4>
</div>

// After
{data.articlesData.map((article, index) => (
  <div key={article.id} className="article__item">
    <Link href={\`/article/\${article.id}\`}>
      <img src={\`/assets/img/blog/\${article.img}\`} alt={article.title} />
      <h4>{article.title}</h4>
    </Link>
  </div>
))}
    `,
  },

  "newsletter-components": {
    description: "Newsletter signup components",
    changes: [
      "Add blockData prop with newsletter configuration",
      "Use dynamic newsletter title, description, placeholder",
      "Add conditional rendering for newsletter fields",
    ],
  },

  "category-components": {
    description: "Category display components",
    changes: [
      "Add blockData prop with categories array",
      "Map through categories with article counts",
      "Add dynamic links and images",
      "Include article count display",
    ],
  },
};

export const requiredImports = {
  Link: "import Link from 'next/link';",
  defaultBlockData: "// Always include fallback data structure",
  conditionalRendering: "// Add conditional rendering for optional fields",
  dynamicClasses: "// Use dynamic CSS classes from blockData",
};

export const commonPatterns = {
  // Common patterns for updating components
  fallbackData: `
const defaultBlockData = {
  section_title: "Default Title",
  section_description: "Default description", 
  show_view_all: true,
  view_all_text: "View All",
  view_all_link: "/blog",
  css_class: "default-class",
  articlesData: [],
};`,

  conditionalViewAll: `
{data.show_view_all && (
  <div className="col-sm-6">
    <div className="section__read-more text-start text-sm-end">
      <Link href={data.view_all_link}>
        {data.view_all_text} <i className="far fa-long-arrow-right" />
      </Link>
    </div>
  </div>
)}`,

  dynamicClasses: `
const sectionClass = data.background === "dark" 
  ? \`\${data.css_class} black-bg\` 
  : data.css_class;`,

  articleMapping: `
{data.articlesData.map((article, index) => (
  <div key={article.id} className="article__item">
    <Link href={\`/article/\${article.id}\`}>
      <img src={\`/assets/img/blog/\${article.img}\`} alt={article.title} />
      <h4>{article.title}</h4>
    </Link>
  </div>
))}`,
};
