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
export const fetchCartItems = () => async (dispatch) => {
  try {
    const [cartResponse, productsResponse, servicesResponse] = await Promise.all([
      api.get('/cart'),
      api.get('/products'),
      api.get('/services'),
    ]);

    const products = productsResponse.data;
    const services = servicesResponse.data;

    const populatedCartItems = cartResponse.data.map((item) => {
      const fullDetails = item.productId
        ? products.find((product) => product.id === item.productId)
        : services.find((service) => service.id === item.serviceId);

      return fullDetails
        ? { ...item, name: fullDetails.name, description: fullDetails.description, price: fullDetails.price, image: fullDetails.image }
        : { ...item, name: 'Item unavailable', description: 'No description available', price: 0 };
    });

    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: populatedCartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};


// Add to cart with quantity handling for both products and services
export const addToCart = (itemId, type) => async (dispatch, getState) => {
  try {
    // Validate type to ensure it's either 'product' or 'service'
    if (!['product', 'service'].includes(type)) {
      console.error(`Invalid type passed to addToCart: ${type}`);
      alert('Invalid item type. Please try again.');
      return;
    }

    console.log(`Adding item to cart: ${itemId}, type: ${type}`);

    const cartItems = getState().cart.items;

    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) =>
      (type === 'product' && item.productId === itemId) ||
      (type === 'service' && item.serviceId === itemId)
    );

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;
      dispatch(updateCartItem(existingItem.id, updatedQuantity));
      alert('Quantity updated in cart!');
    } else {
      const newItem = { quantity: 1 };
      if (type === 'product') newItem.productId = itemId;
      if (type === 'service') newItem.serviceId = itemId;

      console.log('New item to add:', newItem);

      const response = await api.post('/cart', newItem);
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
      alert(`${type === 'product' ? 'Product' : 'Service'} added to cart!`);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
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


