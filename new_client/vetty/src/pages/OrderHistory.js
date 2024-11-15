import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory, approveOrder, disapproveOrder } from '../redux/actions/adminActions';
import './pages.css';

function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const userRole = useSelector((state) => state.auth.user?.role); // Assuming Redux stores user role

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  const handleApproveOrder = (orderId) => {
    dispatch(approveOrder(orderId));
  };

  const handleDisapproveOrder = (orderId) => {
    dispatch(disapproveOrder(orderId));
  };

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
            {/* Additional admin features */}
            {userRole === 'admin' && (
              <div className="admin-actions">
                <button onClick={() => handleApproveOrder(order.id)}>Approve</button>
                <button onClick={() => handleDisapproveOrder(order.id)}>Disapprove</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
}

export default OrderHistory;
