// src/components/Admin/OrderManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/actions/adminActions';
import './admin.css'

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(order.id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusChange(order.id, 'disapproved')}>Disapprove</button>
                  <button onClick={() => handleStatusChange(order.id, 'completed')}>Mark as Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}

export default OrderManagement;
