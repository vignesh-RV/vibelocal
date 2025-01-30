import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './header.css';
import { FaTrash } from 'react-icons/fa';

function CheckoutPage() {
  
  const [ isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  
  let getTotalPrice = () => {
    return cartItems.reduce((total, item)=> total + (item.price * item.selected) - ((item.price * item.selected) * (item.offer/100)) , 0);
  };

  let confirmPayment = () => {
    setIsOrderConfirmed(true);
    clearCart();
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
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.selected}</td>
                        <td>{item.offer}</td>
                        <td>{ (item.price * item.selected) * (item.offer/100)}</td>
                        <td className='text-right'>{ (item.price * item.selected) - ((item.price * item.selected) * (item.offer/100))}</td>
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
