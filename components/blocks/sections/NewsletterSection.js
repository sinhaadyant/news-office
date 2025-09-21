export default function NewsletterSection({ blockData }) {
  // Fallback data if blockData is not provided
  const defaultBlockData = {
    section_title: "Get Notified",
    section_description: "Subscribe to our newsletter for the latest updates",
    css_class: "newsletter-area pb-80",
    newsletter: {
      title: "Get notified of the best deals on our WordPress Themes",
      description: "Subscribe to our newsletter for the latest updates",
      placeholder: "Email address",
      button_text: "Subscribe",
    },
  };

  const data = blockData || defaultBlockData;

  return (
    <section className={data.css_class}>
      <div className="container">
        <div className="newsletter__wrap">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="newsletter__title">
                <span className="sub-title">newsletter</span>
                <h4 className="title">
                  {data.newsletter?.title || data.section_title}
                </h4>
                {data.newsletter?.description && (
                  <p className="description">{data.newsletter.description}</p>
                )}
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="newsletter__form-wrap">
                <form action="#" className="newsletter__form">
                  <div className="newsletter__form-grp">
                    <input
                      type="email"
                      placeholder={
                        data.newsletter?.placeholder || "Email address"
                      }
                      required
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I agree that my submitted data is being collected and
                        stored.
                      </label>
                    </div>
                  </div>
                  <button className="btn" type="submit">
                    <span className="text">
                      {data.newsletter?.button_text || "Subscribe"}
                    </span>{" "}
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
