import React, { useEffect, useState } from 'react';
import './header.css';
import { toast } from 'react-toastify';

function OrdersPage() {
  
  const [ orders, setOrders ] = useState([]);

  const getAllOrders = async () => {
      try {
        let loggedInUserData = JSON.parse(localStorage.getItem("user_data"));
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${loggedInUserData.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          toast.error(`Error on create order : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on create order : ${error}`);
      }
    }

    useEffect(() => {
      getAllOrders();
    }, []);
  
  let getDiscountPrice = () => {
    return orders.reduce((total, item)=> total + item.discount_price , 0);
  };
  
  let getTotalPrice = () => {
    return orders.reduce((total, item)=> total + item.final_price , 0);
  };

  return (
    <>
      
        <div className="cart-popup main-page">

        {orders ? (
              <div className='cart-container'>
              <h2>Your Orders</h2>
              {orders.length === 0 ? (
                <p>No orders found..</p>
              ) : (
                <div className='orders-page-table-container'>
                  <table>
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Ordered Date</th>
                        <th>Discount Amount (₹)</th>
                        <th>Final Price (₹)</th>
                        <th>Payment Details</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map((item, ind) => (
                      <tr>
                        <td>{ind+1}</td>
                        <td>{item.created_date}</td>
                        <td>{item.discount_price}</td>
                        <td>{(item.final_price||1)}</td>
                        <td>{item.payment_details}</td>
                        <td></td>
                        </tr>
                    ))}
                    <tr>
                      <td colSpan='8' className='final-total-price'>
                      <span>total spent: </span>
                      <span className='total-cart-amount'>₹{getTotalPrice()}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='8' className='final-total-price'>
                      <span>total saved: </span>
                      <span className='total-cart-amount'>₹{getDiscountPrice()}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                
                </div>
              )}
              </div>
        ): ('')}
            </div>
    </>
  );
}

export default OrdersPage;
