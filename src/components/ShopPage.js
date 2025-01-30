import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const shops = [
  {
    name: "Veg Shop A",
    seller: "Seller A",
    location: "Location A",
    image: require("../assets/images/shopping.jpg"),
    discount: "10% Off",
    category: "Veg",
  },
  {
    name: "Veg Shop B",
    seller: "Seller B",
    location: "Location B",
    image: require("../assets/images/shopping.jpg"),
    discount: "15% Off",
    category: "Veg",
  },
  {
    name: "Veg Shop C",
    seller: "Seller C",
    location: "Location C",
    image: require("../assets/images/shopping.jpg"),
    discount: "20% Off",
    category: "Veg",
  },
  {
    name: "Meat Shop A",
    seller: "Seller D",
    location: "Location D",
    image: require("../assets/images/shopping.jpg"),
    discount: "10% Off",
    category: "Meat",
  },
  {
    name: "Meat Shop B",
    seller: "Seller E",
    location: "Location E",
    image: require("../assets/images/shopping.jpg"),
    discount: "25% Off",
    category: "Meat",
  },
  {
    name: "Meat Shop C",
    seller: "Seller F",
    location: "Location F",
    image: require("../assets/images/shopping.jpg"),
    discount: "30% Off",
    category: "Meat",
  },
  {
    name: "Egg Shop A",
    seller: "Seller G",
    location: "Location G",
    image: require("../assets/images/shopping.jpg"),
    discount: "5% Off",
    category: "Egg",
  },
  {
    name: "Egg Shop B",
    seller: "Seller H",
    location: "Location H",
    image: require("../assets/images/shopping.jpg"),
    discount: "12% Off",
    category: "Egg",
  },
  {
    name: "Egg Shop C",
    seller: "Seller I",
    location: "Location I",
    image: require("../assets/images/shopping.jpg"),
    discount: "10% Off",
    category: "Egg",
  },
  {
    name: "Fruit Shop A",
    seller: "Seller J",
    location: "Location J",
    image: require("../assets/images/shopping.jpg"),
    discount: "20% Off",
    category: "Fruit",
  },
  {
    name: "Fruit Shop B",
    seller: "Seller K",
    location: "Location K",
    image: require("../assets/images/shopping.jpg"),
    discount: "18% Off",
    category: "Fruit",
  },
  {
    name: "Fruit Shop C",
    seller: "Seller L",
    location: "Location L",
    image: require("../assets/images/shopping.jpg"),
    discount: "22% Off",
    category: "Fruit",
  },
];

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const [activeSetting, setActiveSetting] = useState(null);
  const [isDarkMode] = useState(false);

  const navigate = useNavigate();
  // Toggle dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Filter shops based on search term and category
  const filteredShops = shops.filter(
    (shop) =>
      (shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory ? shop.category === selectedCategory : true)
  );

  return (
    <div className="shop-page">
      <main className="main-content">
        <header className="header">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search for shops, sellers, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="filters">
          <button className="filter-btn" onClick={() => setSelectedCategory("")}>All</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Veg")}>Veg</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Meat")}>Meat</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Egg")}>Egg</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Fruit")}>Fruit</button>
        </div>

        <div className="shop-list">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, index) => (
              <div className="shop-card" key={index}>
                <img src={shop.image} alt={shop.name} className="shop-image" />
                <div className="shop-details" onClick={()=> navigate("/products")}>
                  <h3>{shop.name}</h3>
                  <p>Seller: {shop.seller}</p>
                  <p>Location: {shop.location}</p>
                  <span className="discount">{shop.discount}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No shops match your search.</p>
          )}
        </div>
      </main>

      {/* <div className="right-icons">
        <button className="icon-btn">
          <FaUser className="icon" /> Profile
        </button>
        <button className="icon-btn" onClick={() => setIsSettingsOpen(true)}>
          <FaCog className="icon" />
        </button>
      </div> */}

      {/* {isSettingsOpen && (
        <div className="settings-modal">
          <div className="settings-modal-content">
            <h2>Settings</h2>
            <div className="settings-options">
              <button className="settings-button" onClick={() => setActiveSetting("Dark Mode")}>Dark Mode</button>
              <button className="settings-button" onClick={() => setActiveSetting("Language")}>Language</button>
              <button className="settings-button" onClick={() => setActiveSetting("Notification Preferences")}>Notification Preferences</button>
              <button className="settings-button" onClick={() => setActiveSetting("Privacy Settings")}>Privacy Settings</button>
              <button className="settings-button" onClick={() => setActiveSetting("Account Management")}>Account Management</button>
            </div>

            <div className="settings-details">
             
            </div>

            <button className="settings-close" onClick={() => setIsSettingsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ShopPage;
