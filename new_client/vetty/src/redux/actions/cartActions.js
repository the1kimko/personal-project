// src/redux/actions/cartActions.js
import api from '../../axiosConfig';

// Action types
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const CHECKOUT_CART_SUCCESS = 'CHECKOUT_CART_SUCCESS';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';

// Fetch all items in the cart with product and service details
export const fetchCartItems = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.auth.user;

    if (!user || !user.id) {
      console.error('User not logged in or user ID not found. Fetching cart items failed.');
      return;
    }

    const token = localStorage.getItem('authToken'); // Ensure the token is available
    if (!token) {
      console.error('No auth token found. Fetching cart items failed.');
      return;
    }

    const response = await api.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
    });
    console.log("Fetched Cart Items:", response.data);

    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};



// Add to cart with quantity handling for both products and services
export const addToCart = (itemId, type) => async (dispatch, getState) => {
  try {
    const state = getState();
    console.log('Current State:', state);
    console.log("Auth state:", getState().auth);
    
    const user = state.auth.user; // Ensure user is loaded from Redux

    if (!user || !user.id) {
      console.error("User is null or ID is missing:", user);
      alert('User not logged in. Please log in to add items to your cart.');
      return;
    }

    const token = localStorage.getItem('authToken'); // Get token from localStorage
    console.log("Token:", localStorage.getItem("authToken"));
    if (!token) {
      console.error("No auth token found in localStorage.");
      alert('You must be logged in to perform this action.');
      return;
    }
    
    const newItem = { quantity: 1 };
    if (type === 'product') newItem.product_id = itemId;
    if (type === 'service') newItem.service_id = itemId;

    console.log("Adding item to cart:", newItem);

    const response = await api.post('/cart', newItem, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
    });

    console.log("Item added to cart successfully:", response.data);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
    alert('Item added to cart!');
  } catch (error) {
    console.error('Error adding item to cart:', error);
    alert('Failed to add item to cart.');
  }
};

// Update the quantity of an item in the cart
export const updateCartItem = (itemId, quantity) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No auth token found.');
      return;
    }
    const response = await api.put(`/cart/item/${itemId}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

// Remove an item from the cart
export const removeCartItem = (itemId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No auth token found.');
      return;
    }
    await api.delete(`/cart/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: itemId });
    alert('Item removed from cart.');
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};

// Checkout cart
export const checkoutCart = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const cartItems = state.cart.items;

    // Simulate adding to orders
    const addToOrdersPromises = cartItems.map(async (item) => {
      const order = {
        ...item,
        date: new Date().toISOString(),
        status: 'pending',
      };
      return await api.post('/orders', order);
    });

    await Promise.all(addToOrdersPromises);

    // Clear the cart
    await Promise.all(
      cartItems.map(async (item) => api.delete(`/cart/${item.id}`))
    );

    dispatch(clearCart());
    alert('Checkout successful! Your cart has been cleared.');
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('Checkout failed. Please try again.');
  }
};

// Clear cart
export const clearCart = () => ({
  type: CLEAR_CART_SUCCESS, // Ensure this matches your reducer's type
});


