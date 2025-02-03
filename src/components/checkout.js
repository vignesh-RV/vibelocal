import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './header.css';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function CheckoutPage() {
  
  const [ isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  
  let getTotalPrice = () => {
    return cartItems.reduce((total, item)=> total + (item.price * (item.selected||1)) - ((item.price * (item.selected||1)) * (item.offer/100)) , 0);
  };

  let getDiscountPrice = () => {
    return cartItems.reduce((total, item)=> total + ((item.price * (item.selected||1)) * (item.offer/100)) , 0);
  };

  let confirmPayment = () => {
    confirmOrder();
  }

  const confirmOrder = async () => {
      try {
        let loggedInUserData = JSON.parse(localStorage.getItem("user_data"));
        let orderdata = {
          user_id: loggedInUserData.user_id,
          final_price: getTotalPrice(),
          discount_price: getDiscountPrice()
        }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderdata),
        });
  
        const data = await response.json();
        if (response.ok) {
          persistOrderProducts(data);
        } else {
          toast.error(`Error on create order : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on create order : ${error}`);
      }
    }
  
    const persistOrderProducts = async (order) => {
      try {
        
        let reqData = cartItems.map(d => {
          let price_details = {
            price: d.price,
            offer: d.offer,
            offer_price: (d.price * (d.offer/100)),
            final_price: d.price - (d.price * (d.offer/100)),
            total_offer_price: (d.price * (d.offer/100))*d.selected,
            total_final_price: (d.price - (d.price * (d.offer/100)))*d.selected
          }
          return {
            order_id: order.order_id,
            product_id: d.product_id,
            product_price_details: JSON.stringify(price_details),
            quantity: d.quantity
          }
        })
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/order_products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
  
        const data = await response.json();
        if (response.ok) {
          setIsOrderConfirmed(true);
          clearCartItems();
        } else {
          toast.error(`Error: ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception: ${error}`);
      }
    }

  const clearCartItems = async () => {
      try {
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart_items/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        });
  
        const data = await response.json();
        if (response.ok) {
          clearCart();
        } else {
          toast.error(`Error on clear carts : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on clear carts : ${error}`);
      }
  }

  return (
    <>
      
        <div className="cart-popup main-page">

        {isOrderConfirmed !== true ? (
              <div className='cart-container'>
              <h2>Your Cart</h2>
              {cartItems.length === 0 ? (
                <p>No items in the cart</p>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th className='product-name-col'>Product Name</th>
                        <th>Price (₹)</th>
                        <th>quantity</th>
                        <th>Offer (%)</th>
                        <th>Offer Price (₹)</th>
                        <th>Final Price (₹)</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, ind) => (
                      <tr>
                        <td>{ind+1}</td>
                        <td>{item.product_name}</td>
                        <td>{item.price}</td>
                        <td>{(item.selected||1)}</td>
                        <td>{item.offer}</td>
                        <td>{ (item.price * (item.selected||1)) * (item.offer/100)}</td>
                        <td className='text-right'>{ (item.price * (item.selected||1)) - ((item.price * (item.selected||1)) * (item.offer/100))}</td>
                        <td className='delet-icon'><button className='item-remove-icon' onClick={() => removeFromCart(item)}><FaTrash /></button></td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan='8' className='final-total-price'>
                      <span>total: </span>
                      <span className='total-cart-amount'>₹{getTotalPrice()}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                
                <label className='proceed-btn' onClick={()=> confirmPayment()}>Confirm Payment</label>
                </div>
              )}
              </div>
        ) : (
              <div className='order-confirmation'>
                 <label className="confirm-tick">✔️</label>
                <h2>Thanks for your order..</h2>
                <h3>Your order has been confirmed.</h3>
                <h4 className='bold'>Order id: VB_LOCAL___{new Date().getTime()}</h4>
              </div>
          )}
            </div>
    </>
  );
}

export default CheckoutPage;
