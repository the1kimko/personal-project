import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import api from '../axiosConfig';
import './pages.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then((response) => setOrders(response.data));
  }, []);

  return (
    <div className="order-history">
      <h2 className="order-title">Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3 className="order-id">Order ID: {order.id}</h3>
            <p className="order-date">Date: {order.date}</p>
            <p className="order-status">Status: {order.status}</p>
            <p className="order-total">Total Cost: ${order.totalCost}</p>
          </div>
        ))
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
}

export default OrderHistory;

