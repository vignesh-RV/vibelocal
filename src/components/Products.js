import React, { useState, useEffect, useContext } from 'react';
import './ShopPage.css';
import { FaSearch } from 'react-icons/fa';
import { CartContext, useEvent } from './CartContext';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [setSelectedCategory] = useState("");

  const { addToCart } = useContext(CartContext);
  const { eventTriggered } = useEvent();

  const generateProducts = () => {
    return Array.from({ length: 100 }, (_, index) => ({
        product_id: index + 1,
        name: "Product - "+ index + 1,
        sellerId: "Product A"+ index + 1,
        price: Math.floor(Math.random() * 100) + 1,
        available: 10,
        selected: 0,
        image: require("../assets/images/shopping.jpg"),
        discount: "10% Off",
        offer: 10,
        category: "Veg",
      }));
  };

  const [products, setProducts] = useState(generateProducts());

  // Toggle dark mode effect
  useEffect(() => {
    if (eventTriggered) {
      let ind =products.findIndex(p => p.product_id === eventTriggered.product_id);
      if(ind !== -1){
        eventTriggered.available += eventTriggered.selected;
        eventTriggered.selected = 0;
        products[ind] = eventTriggered;
        setProducts(products.map(d => d));
      }
    }
  }, [eventTriggered]);

  const addProductToCart = (product) =>{
    if(product.available <= 0) return;
    
    // updateAvailableQuantity(product.product_id, 1);
    addToCart(product);
  }

  const updateAvailableQuantity = (product_id, count) => {
    setProducts(products.map((product) => {
        if(product.product_id === product_id){
          if(product.selected <= 0 && count===-1) return product;
          if(product.available <= 0 && count===1) return product;
          let available = product.available + (-1*count);
          let selected = product.selected + count;

          product.available = available <= 0 ? 0 : available;
          product.selected = selected <= 0 ? 0 : selected;
          return product;
        } else {
          return product;
        }
      }));
  };

  
  // Filter shops based on search term and category
  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
              placeholder="Search for product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="filters">
          <button className="filter-btn" onClick={() => setSelectedCategory("")}>All</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Veg")}>Price 100</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Meat")}>Price 100 - 1000</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Egg")}>Offer 10%</button>
          <button className="filter-btn" onClick={() => setSelectedCategory("Fruit")}>Offer 20%</button>
        </div>

        <div className="shop-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((shop, index) => (
              <div className="shop-card" key={index}>
                <img src={shop.image} alt={shop.name} className="shop-image" />
                <div className="shop-details">
                  <h3>{shop.name}</h3>
                  <p>Price: ₹ <span className='bold'>{shop.price}</span></p>
                  <p>Available: <span className='bold'>{shop.available}</span></p>
                  <span className="discount product-discount">{shop.discount}</span>
                  <div className='cart-control'>
                    <span className="reduce-qty" onClick={() => updateAvailableQuantity(shop.product_id,-1)}>-</span><input readOnly disabled value={shop.selected} type='number' /><span className="add-qty" onClick={() => updateAvailableQuantity(shop.product_id,1)}>+</span>
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
