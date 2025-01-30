import React, { useState } from "react";
import "./ProfilePage.css"; // Move the CSS styles into a separate CSS file

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length > 10 || isNaN(value)) return; // Restrict length to 10 and allow only numeric values
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
    console.log("Form Data:", formData);
  };

  const navigateToNextPage = () => {
    alert("Navigating to the next page...");
    // Implement navigation logic here, e.g., using React Router
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <h1>BUYER PROFILE</h1>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone No:</label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <textarea
              id="location"
              name="location"
              placeholder="Enter your location"
              rows="3"
              value={formData.location}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <p>Follow us: Instagram | WhatsApp | Facebook</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={navigateToNextPage}>
            Next Page →
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
