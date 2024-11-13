// src/components/Admin/OrderManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/actions/adminActions';

function OrderManagement() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
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
