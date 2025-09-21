export default function NewsletterStyleTwo({ blockData }) {
  return (
    <section className="newsletter-style-two black-bg pt-80 pb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="newsletter__title text-center mb-35">
              <div className="newsletter__title-icon">
                <i className="fas fa-envelope-open-text" />
              </div>
              <span className="sub-title">newsletter</span>
              <h4 className="title">
                Get notified of the best deals on <br /> our WordPress Themes
              </h4>
            </div>
            <div className="newsletter__form-wrap text-center">
              <form action="#" className="newsletter__form">
                <div className="newsletter__form-grp">
                  <input type="email" placeholder="Email address" required />
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
                  <span className="text">Subscribe</span>
                  <i className="fas fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
