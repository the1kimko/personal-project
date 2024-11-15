// src/pages/OrderConfirmation.js
import React from 'react';
import { useSelector } from 'react-redux';
import './pages.css';

const OrderConfirmation = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      {user ? (
        <p>
          Thank you, {user.username}! Your order has been successfully placed.
        </p>
      ) : (
        <p>Your order has been successfully placed.</p>
      )}
      <p>You will receive an email with the order details shortly.</p>
    </div>
  );
};

export default OrderConfirmation;
