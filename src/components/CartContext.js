import React, { createContext, useState, useContext } from 'react';

// Create Context
export const CartContext = createContext();
// // Create the context
// const EventContext = createContext();

// Create a custom hook to use the context
export const useEvent = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
//   const { triggerEvent } = useEvent()
    const [eventTriggered, setEventTriggered] = useState(false);

  const addToCart = (product) => {
    let oldItemIndex = cartItems.findIndex(p => p.product_id === product.product_id);
    if(oldItemIndex !== -1){
        cartItems[oldItemIndex] = product;
        setCartItems(cartItems.map(i=>i));
    }else{
        setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Function to trigger the event
  const triggerEvent = (product) => {
    setEventTriggered(product);
  };

  const removeFromCart = (product) => {
    triggerEvent(product);
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product.product_id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, eventTriggered, triggerEvent }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;




// // Provider component to wrap your app
// export const EventProvider = ({ children }) => {
//   const [eventTriggered, setEventTriggered] = useState(false);

//   // Function to trigger the event
//   const triggerEvent = (product) => {
//     setEventTriggered(product);
//   };

//   return (
//     <EventContext.Provider value={{ eventTriggered, triggerEvent }}>
//       {children}
//     </EventContext.Provider>
//   );
// };