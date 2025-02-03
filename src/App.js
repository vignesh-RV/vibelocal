import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ShopPage from './components/ShopPage'; // Import ShopPage
import './components/ShopPage.css'; // Correct CSS file import
import './components/WelcomePage.css'; // Your other CSS
import ProductsPage from './components/Products';
import CartProvider from './components/CartContext';
import CheckoutPage from './components/checkout';
import ProfilePage from './components/ProfilePage';
import SellerProfile from './components/SellerProfile';
import Signup from './components/signup';
import SignIn from './components/signin';
import OrdersPage from './components/orders';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageProducts from './components/manage-products';

function App() {
  useEffect(() => {
    document.title = "Vibe Local";
  }, []);

  return (
    <CartProvider>
    <div className="App">
      <Header /> {/* Navigation Header */}
      <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      />
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sprofile" element={<SellerProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:shop_id" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shops" element={<ShopPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/manage-products" element={<ManageProducts />} />
      </Routes>
    </div>
    </CartProvider>
  );
}

export default App;
