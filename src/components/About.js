import React, { useState } from 'react';
import './WelcomePage.css';
import { useNavigate } from "react-router-dom";

function About() {
  const [showBenefits, setShowBenefits] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="about">
      <h1 className="about__title">About Vibe Local</h1>
      <p className="about__intro">
        Welcome to <strong>Vibe Local</strong>, an innovative platform designed to connect you with local mini shops in your community. 
        We believe in supporting small businesses and bringing fresh, high-quality groceries straight to your doorstep.
      </p>

      <div className="about__mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower local businesses and communities by offering a seamless shopping experience for consumers, 
          while ensuring that local merchants can thrive and grow. With a focus on sustainability, we provide fresh, locally sourced products.
        </p>
      </div>

      <div className="about__why-shop-local">
        <h2>Why Shop Local?</h2>
        <button className="about__toggle-btn" onClick={() => setShowBenefits(!showBenefits)}>
          {showBenefits ? 'Show Less' : 'Show More Benefits'}
        </button>

        {showBenefits && (
          <ul className="about__benefits-list">
            <li><strong>Support small businesses:</strong> Every purchase helps local shops thrive.</li>
            <li><strong>Better quality products:</strong> Fresh produce from nearby farms.</li>
            <li><strong>Community impact:</strong> Stimulate the local economy and create jobs.</li>
            <li><strong>Eco-friendly:</strong> Products with a smaller carbon footprint.</li>
          </ul>
        )}
      </div>

      <div className="about__how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Browse:</strong> Explore our easy-to-use website and find the products you need.</li>
          <li><strong>Add to Cart:</strong> Add your desired items to your shopping cart.</li>
          <li><strong>Checkout:</strong> Choose your payment method and enjoy fast delivery!</li>
        </ol>
      </div>

      <div className="about__promise">
        <h2>Our Promise to You</h2>
        <p>
          We promise to deliver the highest quality products at the best prices. We carefully select our local partners to ensure all products meet strict quality standards.
        </p>
      </div>

      <div className="about__cta">
        <h2>Ready to Start Shopping?</h2>
        <p>Join us today and start shopping from local shops near you. Make shopping local the new normal!</p>
        <button className="about__cta-btn" onClick={()=>navigate('/shops')}>Shop Now</button>
      </div>
    </div>
  );
}

export default About;
