import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Fetch cart, products, and services
        const [cartResponse, productsResponse, servicesResponse] = await Promise.all([
          api.get('/cart'),
          api.get('/products'),
          api.get('/services')
        ]);

        const products = productsResponse.data;
        const services = servicesResponse.data;

        // Populate each cart item with full details
        const populatedCartItems = cartResponse.data.map((item) => {
          let fullDetails = null;

          if (item.productId) {
            fullDetails = products.find((product) => product.id === item.productId);
          } else if (item.serviceId) {
            fullDetails = services.find((service) => service.id === item.serviceId);
          }

          // Combine cart item with full details and desired structure
          return fullDetails
            ? { 
                id: item.id, 
                quantity: item.quantity, 
                name: fullDetails.name,
                description: fullDetails.description,
                price: fullDetails.price,
                image: fullDetails.image,
                productId: item.productId,
                serviceId: item.serviceId
              }
            : item;
        });

        setCartItems(populatedCartItems);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    api.post('/checkout')
      .then(() => alert('Order placed successfully'))
      .catch((error) => console.error('Error during checkout:', error));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
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
