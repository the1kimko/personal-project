import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../redux/actions/adminActions';
import './pages.css';

function OrderHistory() {
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orders.orderHistory);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div className="order-history">
      <h2 className="order-title">Order History</h2>
      {orderHistory.length > 0 ? (
        orderHistory.map((order) => (
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
