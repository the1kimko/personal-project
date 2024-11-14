// src/components/Cart/Cart.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/actions/cartActions';
import { checkoutCart } from '../../redux/actions/cartActions';
import './cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkoutCart());
    navigate('/order-confirmation');
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Use fallback image if no image exists */}
            <img 
              src={item.image || 'https://via.placeholder.com/150'} 
              alt={item.name || 'Product Image'} 
              className="cart-item-image"
            />
            <h3>{item.name || 'Item name unavailable'}</h3>
            <p>{item.description || 'No description available'}</p>
            <p>Price: ${item.price || 'N/A'}</p>
            <p>Quantity: {item.quantity || 1}</p>
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
