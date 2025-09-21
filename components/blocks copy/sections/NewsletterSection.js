const NewsletterSection = ({ blockData }) => {
  // Return null if no blockData
  if (!blockData) {
    return null;
  }

  return (
    <section className="newsletter__area">
      <div className="container">
        <div className="newsletter__wrap">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="newsletter__content">
                <h3 className="newsletter__title">
                  {blockData.newsletter.title}
                </h3>
                <p>{blockData.newsletter.description}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter__form">
                <form>
                  <div className="newsletter__input">
                    <input
                      type="email"
                      placeholder={blockData.newsletter.placeholder}
                    />
                    <button type="submit" className="btn">
                      {blockData.newsletter.button_text}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
