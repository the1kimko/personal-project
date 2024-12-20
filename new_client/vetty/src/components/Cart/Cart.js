// src/components/Cart/Cart.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeCartItem } from '../../redux/actions/cartActions';
import './cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCheckout = async () => {
    if (!user) {
      alert('You need to log in to proceed with checkout.');
      navigate('/login');
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken"); // JWT token from login
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass JWT for auth
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const redirectUrl = data.redirect_url;
        window.location.href = redirectUrl; // Redirect to Pesapal payment page
      } else {
        const error = await response.json();
        alert(error.error || "Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred during checkout. Please try again.");
    }
  };
  

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => ( // Removed extra {}
          <div key={item.id || `cart-item-${index}`} className="cart-item">
            <img 
              src={item.image || 'https://via.placeholder.com/150'} 
              alt={item.name || 'Unnamed Item'} 
              className="cart-item-image"
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>
      )}
    </div>
  );
  
}

export default Cart;
