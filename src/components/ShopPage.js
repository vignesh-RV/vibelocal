import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// const shops = [
//   {
//     name: "Veg Shop A",
//     seller: "Seller A",
//     location: "Location A",
//     image: require("../assets/images/shopping.jpg"),
//     discount: "10% Off",
//     category: "Veg",
//   }

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([]);
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

    fetchAllShops();
  }, [isDarkMode]);

  // Filter shops based on search term and category
  const filteredShops = shops.filter(
    (shop) =>
      (shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory ? shop.category === selectedCategory : true)
  );

  const fetchAllShops = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/shops`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          setShops(data);
        } else {
          toast.error(`Error: ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception: ${error}`);
      }
    }

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
              <div className="shop-card" key={index} onClick={()=> navigate(`/products/${shop.shop_id}`)}>
                <img src={shop.shop_logo} alt={shop.name} className="shop-image" />
                <div className="shop-details">
                  <h3>{shop.shop_name}</h3>
                  {/* <p>Seller: {shop.seller}</p> */}
                  <p>Location: {shop.location}</p>
                  <p>Offer: <span className="discount">{shop.offer}</span></p>
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
