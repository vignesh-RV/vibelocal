import React, { useState, useEffect, useContext } from 'react';  // Import useState and useEffect hooks
import { Link, useLocation } from 'react-router-dom';  // Import Link from react-router-dom
import { FaUser, FaCog, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { CartContext } from './CartContext';
import './header.css';
import { useNavigate } from "react-router-dom";

function Header() {
  // State to manage the visibility of the sign-up modal

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  
  
  let getTotalPrice = () => {
    return cartItems.reduce((total, item)=> total + (item.price * item.selected) , 0);
  };

  let doLogOut = () => {
    localStorage.clear();
    window.location.href = "./home";
  };

  let proceedToCheckout = () =>{
    setIsCartOpen(false);
    navigate("/checkout");
  }

  // Effect to prevent body scroll when modal is open
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsUserLoggedIn(true);
    }    

    // Cleanup function to reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto'; // Always reset to auto when modal closes or component unmounts
    };
  }, []);

  return (
    <>
      {/* Header always visible */}
      <header className="l-header">
        <nav className="nav bd-grid">
          {/* Logo */}
          <div className="nav__logo-container">
            <a href="/" className="nav__logo">Vibe Local</a>  {/* Set href to '/' for homepage */}
          </div>

          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item"><Link to="/home" className={`nav__link ${location.pathname === "/home" ? "active" : ""}`}>Home</Link></li>
              <li className="nav__item"><Link to="/about" className={`nav__link ${location.pathname === "/about" ? "active" : ""}`}>About</Link></li>
              <li className="nav__item"><Link to="/contact" className={`nav__link ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link></li>
              {!["/signup", "/signin"].includes(location.pathname) && (
                <li className="nav__item"><Link to="/shops" className={`nav__link ${location.pathname === "/shops" ? "active" : ""}`}>Shop</Link></li>
              )}
            </ul>
          </div>
           
          {!isUserLoggedIn && !["/signup", "/signin"].includes(location.pathname) && (
          <div className="nav__btns">
            
            {/* <button onClick={toggleModal} className="nav__btn">Sign Up</button> */}
            <li className="nav__item"><Link to="/signup" className={`nav__link ${location.pathname === "/signup" ? "active" : ""}`}>Sign Up</Link></li>
            <li className="nav__item nav__btn"><Link to="/signin" className={`nav__link ${location.pathname === "/signin" ? "active" : ""}`}>Log In</Link></li>
            {/* <a href="#log-in" className="nav__btn" onClick={() => setIsUserLoggedIn(true)}>Log In</a> */}
            {/* <a href="#settings" className="settings__icon"><i className="bx bx-cog"></i></a> */}
          
          </div>
          )}

          {isUserLoggedIn && (
          <div className="nav__btns">
            <button className="icon-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}> <FaUser className="icon" /> Profile </button>
            <button className="icon-btn" onClick={() => setIsCartOpen(!isCartOpen)}> <FaShoppingCart className="icon" size={20} />{cartItems.length}</button>
            <button className="icon-btn"> <FaCog className="icon" /> </button>
          </div>
          )}
        </nav>

        

      {isCartOpen && (
        <div className="cart-popup">
              <button onClick={() => setIsCartOpen(false)}>X</button>
              <h2>Your Cart</h2>
              {cartItems.length === 0 ? (
                <p>No items in the cart</p>
              ) : (
                <div>
                <ul className='cart-item-container'>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <span>
                        <span className='item-name'>{item.name}</span> - <span className='item-price bold'>₹{item.price}</span> x <span className='item-quantity bold'>{item.selected}</span>
                        = <span className='item-total bold'>₹{item.price * item.selected}</span>
                      </span>
                      <button className='item-remove-icon' onClick={() => removeFromCart(item)}><FaTrash /></button>
                    </li>
                  ))}
                  <li id='total-cart-row' key="total">
                      <span>total: </span>
                      <span className='total-cart-amount'>₹{getTotalPrice()}</span>
                    </li>
                </ul>
                <label className='proceed-btn' onClick={()=> proceedToCheckout()}>Proceed to payment</label>
                </div>
              )}
            </div>
            )}
      

      {isProfileOpen && (
        <div className="cart-popup">
              <button onClick={() => setIsProfileOpen(false)}>X</button>
              <h2>Vignesh</h2>
              
              <ul className='cart-item-container'>
                
                  <li>Orders</li>
                  <li>Products</li>
              </ul>
              <label className='proceed-btn' onClick={()=> doLogOut()}>Logout</label>
            </div>
            )}
      </header>
    </>
  );
}

export default Header;
