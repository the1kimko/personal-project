// src/redux/actions/cartActions.js
import api from '../../axiosConfig';

// Action types
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';

// Fetch all items in the cart
export const fetchCartItems = () => async (dispatch) => {
  try {
    const response = await api.get('/cart');
    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

// Add a product to the cart
export const addToCart = (productId) => async (dispatch) => {
  try {
    const response = await api.post('/cart', { productId });
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
    alert('Product added to cart!');
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

// Update the quantity of an item in the cart
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

// Remove an item from the cart
export const removeCartItem = (itemId) => async (dispatch) => {
  try {
    await api.delete(`/cart/${itemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};
