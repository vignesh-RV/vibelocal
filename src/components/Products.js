import React, { useState, useEffect, useContext } from 'react';
import './ShopPage.css';
import { FaSearch } from 'react-icons/fa';
import { CartContext, useEvent } from './CartContext';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const filters = [
  { id:1, label: "All" },
  { id:2, label: "Price < 100", key: "price", maxvalue: 100 },
  { id:3, label: "Price 100 - 1000", key: "price", minvalue: 100, maxvalue: 1000 },
  { id:4, label: "Offer 10%", key: "offer", maxvalue: 10 },
  { id:5, label: "Offer 10% - 20%", key: "offer", minvalue: 10, maxvalue: 20 },
  { id:6, label: "Offer > 20%", key: "offer", minvalue: 20 }
]

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(filters[0]);

  const { addToCart } = useContext(CartContext);
  const { eventTriggered } = useEvent();
  const { shop_id } = useParams();
  const [products, setProducts] = useState([]);


  // Toggle dark mode effect
  useEffect(() => {
    if (eventTriggered) {
      let ind =products.findIndex(p => p.product_id === eventTriggered.product_id);
      if(ind !== -1){
        eventTriggered.available_quantity += eventTriggered.selected;
        eventTriggered.selected = 0;
        products[ind] = eventTriggered;
        setProducts(products.map(d => d));
      }
    }

    fetchAllProducts(shop_id);
  }, [eventTriggered]);

  const addProductToCart = (product) =>{
    if(product.available_quantity <= 0) return;
    
    // updateAvailableQuantity(product.product_id, 1);
    addToCart(product);
  }

  const updateAvailableQuantity = (product_id, count) => {
    setProducts(products.map((product) => {
        if(product.product_id === product_id){
          if(product.selected === undefined) product.selected = 0;

          if(product.selected <= 0 && count===-1) return product;
          if(product.available_quantity <= 0 && count===1) return product;
          let available = product.available_quantity + (-1*count);
          let selected = product.selected + count;

          product.available_quantity = available <= 0 ? 0 : available;
          product.selected = selected <= 0 ? 0 : selected;
          return product;
        } else {
          return product;
        }
      }));
  };

  const checkCategoryCheck = (product) => {
    if(selectedCategory.id === 1) return true;
    return selectedCategory.maxvalue ? (product[selectedCategory.key] < selectedCategory.maxvalue)
      : (selectedCategory.minvalue ? product[selectedCategory.key] > selectedCategory.minvalue : false);
  }
  
  // Filter shops based on search term and category
  const filteredProducts = products.filter( (product) => (product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) && checkCategoryCheck(product)) );


  const fetchAllProducts = async (shop_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/byshop/${shop_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Exception: ${error}`);
    }
  }

  const applyFilter = (fil) => {
    setSelectedCategory(fil)
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
              placeholder="Search for product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="filters">
        {filters.length > 0 ? (
            filters.map((fil, index) => (
              <button className={`filter-btn ${fil.id === selectedCategory.id ? "active" : ""}`} onClick={() => applyFilter(fil)}>{fil.label}</button>
            ))
          ):('')}
        </div>

        <div className="shop-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((shop, index) => (
              <div className="shop-card" key={index}>
                <img src={shop.product_image} alt={shop.name} className="shop-image" />
                <div className="shop-details">
                  <h3>{shop.product_name}</h3>
                  <p>Price: ₹ <span className='bold'>{shop.price}</span></p>
                  <p>Available: <span className='bold'>{shop.available_quantity}</span></p>
                  <span className="discount product-discount">{shop.offer} %</span>
                  <div className='cart-control'>
                    <span className="reduce-qty" onClick={() => updateAvailableQuantity(shop.product_id,-1)}>-</span><input readOnly disabled value={shop.selected} /><span className="add-qty" onClick={() => updateAvailableQuantity(shop.product_id,1)}>+</span>
                    <button disabled={shop.selected <= 0}  className="filter-btn add2cart-btn" onClick={() => addProductToCart(shop)}>Add to cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No products match your search.</p>
          )}
        </div>
      </main>

      
    </div>
  );
};

export default ProductsPage;
