import React, { useState } from "react";
import "./SellerProfile.css";

const SellerProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    shopType: "",
    shopImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "phone" && (value.length > 10 || isNaN(value))) return;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile Saved!\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="page-heading">Seller Profile</h1> {/* Seller Page Heading */}
        <form onSubmit={handleSubmit}> 
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
          <div className="form-group">
            <label htmlFor="location">Location</label>
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
          <div className="form-group">
            <label htmlFor="shopType">Shop Type</label>
            <select
              id="shopType"
              name="shopType"
              value={formData.shopType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select shop type
              </option>
              <option value="vegetables">Vegetables</option>
              <option value="fish">Fish</option>
              <option value="meat">Meat</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="shopImage">Shop Image</label>
            <input
              type="file"
              id="shopImage"
              name="shopImage"
              onChange={handleChange}
            />
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://x.com/i/flow/login?lang=en">Twitter</a>
            <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F">Facebook</a>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => alert("Navigating to the next page...")}
            >
              Next Page →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
