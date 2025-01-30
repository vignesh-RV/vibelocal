import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <main className="l-main">
      {/* Home Section */}
      <section className="home" id="home">
        <div className="home__container bd-grid">
          {/* Image Gallery */}
          <div className="home__img">
            <img src="/images/shopping.jpg" alt="cart" />
          </div>

          {/* Text Content */}
          <div className="home__data">
            <h1 className="home__title">Vibe <br /> Local</h1>
            <p className="home__description">
              Support local, shop smart, and
              <br />
              strengthen your community.
            </p>
            <button className="home__button" onClick={()=> navigate("/shops")}>Get Started</button>

            {/* Social Media Section */}
            <div className="home__social">
              <p className="home__social-title">Follow Us:</p>
              <div className="home__social-links">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__social-link"
                  aria-label="Instagram"
                >
                  <img src="/images/instagramlogo.jpg" alt="Instagram" className="home__social-icon" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__social-link"
                  aria-label="Facebook"
                >
                  <img src="/images/facebook.webp" alt="Facebook" className="home__social-icon" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__social-link"
                  aria-label="Twitter"
                >
                  <img src="http://localhost:3000/images/twitter.jpg" alt="Twitter" className="home__social-icon" />

                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
