import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
// Create Context
export const CartContext = createContext();

// Create a custom hook to use the context
export const useEvent = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
//   const { triggerEvent } = useEvent()
  const [eventTriggered, setEventTriggered] = useState(false);

  const addToCart = async (product) => {
    let oldItemIndex = cartItems.findIndex(p => p.product_id === product.product_id);
    if(oldItemIndex !== -1){
        
        let updated = await updateCart(product);
        product.cart_item_id = updated.cart_item_id;
        cartItems[oldItemIndex] = product;
        setCartItems(cartItems.map(i=>i));
    }else{
        
        let updated = await updateCart(product);
        product.cart_item_id = updated.cart_item_id;
        setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  const removeFromCart = async (product) => {
    await removeFromCartOnDB(product);
    triggerEvent(product);
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product.product_id));
  };

  const updateCart = async (product) => {
      try {
        let loggedInUserData = JSON.parse(localStorage.getItem("user_data"));
        let price_details = {
          price: product.price,
          offer_percentage: product.offer,
          offer_price: product.price * (product.offer/100),
          final_price: product.price - (product.price * (product.offer/100))
        };
        let reqdata = {
          user_id: loggedInUserData['user_id'],
          product_id: product["product_id"],
          quantity: product["selected"],
          price_details: JSON.stringify(price_details),
          created_by: loggedInUserData['user_id'],
          last_modified_by: loggedInUserData['user_id']
        };
        let url = !product.cart_item_id ? 'cart_items' : `cart_items/id/${product.cart_item_id}`;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
          method: product.cart_item_id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqdata),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log("Product added on cart..");
        } else {
          toast.error(`Error: ${data.message}`);
        }
        return data;
      } catch (error) {
        toast.error(`Exception: ${error}`);
        return {};
      }
    }

  const removeFromCartOnDB = async (product) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart_items/id/${product.cart_item_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log("Product added on cart..");
        } else {
          toast.error(`Error: ${data.message}`);
        }
        return data;
      } catch (error) {
        toast.error(`Exception: ${error}`);
        return {};
      }
  }

  const fetchCartItemsForUser = async () => {
    try {
      let loggedInUserData = JSON.parse(localStorage.getItem("user_data"));
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/cart/byuser/${loggedInUserData.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        console.log("fetched all cart items..");
        setCartItems(data);
      } else {
        toast.error(`Error: ${data.message}`);
      }
      return data;
    } catch (error) {
      toast.error(`Exception: ${error}`);
      return {};
    }
  }

  const clearCart = () => {
    setCartItems([]);
  };

  // Function to trigger the event
  const triggerEvent = (product) => {
    setEventTriggered(product);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, eventTriggered, triggerEvent, fetchCartItemsForUser }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;