// src/pages/CartPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart } from '../features/productSlice'; // Correct import

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const handleRemoveProduct = (product) => {
    dispatch(removeProductFromCart(product)); // Dispatch remove product from cart
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => handleRemoveProduct(product)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
