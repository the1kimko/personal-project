// src/components/Cart/Cart.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, checkoutCart, removeCartItem, clearCart } from '../../redux/actions/cartActions';
import './cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCheckout = () => {
    if (!user) {
      alert('You need to log in to proceed with checkout.');
      navigate('/login');
      return;
    }
    dispatch(checkoutCart());
    dispatch(clearCart());
    navigate('/order-confirmation');
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => {
          const isProduct = item.productId !== undefined;
          const isService = item.serviceId !== undefined;
          return (
            <div key={`${item.id}-${index}`} className="cart-item">
              <img 
                src={item.image || 'https://via.placeholder.com/150'} 
                alt={item.name || (isProduct ? 'Product Image' : 'Service Image')} 
                className="cart-item-image"
              />
              <h3>
                {item.name || (isProduct ? 'Product name unavailable' : isService ? 'Service name unavailable' : 'Item name unavailable')}
              </h3>
              <p>{item.description || 'No description available'}</p>
              <p>Price: ${item.price !== 'N/A' ? item.price : 'N/A'}</p>
              <p>Quantity: {item.quantity || 1}</p>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          );
        })
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
