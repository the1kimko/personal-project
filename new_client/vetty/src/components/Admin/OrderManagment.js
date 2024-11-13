import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import api from '../axiosConfig';
import './admin.css';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then((response) => setOrders(response.data));
  }, []);

  const handleStatusChange = (orderId, status) => {
    api.put(`/orders/${orderId}`, { status }).then((response) => {
      setOrders((orders) =>
        orders.map((order) => (order.id === orderId ? response.data : order))
      );
    });
  };

  return (
    <div>
      <h2>Order Management</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Status: {order.status}</p>
          <button onClick={() => handleStatusChange(order.id, 'completed')}>Mark as Completed</button>
        </div>
      ))}
    </div>
  );
}

export default OrderManagement;
