// src/redux/actions/cartActions.js
import api from '../../axiosConfig';

// Action types
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';

// Fetch all items in the cart with product and service details
export const fetchCartItems = () => async (dispatch) => {
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

      // Combine cart item with full details
      return fullDetails
        ? { 
            ...item, 
            name: fullDetails.name,
            description: fullDetails.description,
            price: fullDetails.price,
            image: fullDetails.image
          }
        : { ...item, name: 'Item name unavailable', description: 'No description available', price: 'N/A' };
    });

    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: populatedCartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

// Add to cart with quantity handling for both products and services
export const addToCart = (itemId, type = 'product') => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.items;
    
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => 
      (type === 'product' && item.productId === itemId) || 
      (type === 'service' && item.serviceId === itemId)
    );

    if (existingItem) {
      // Update the quantity of the existing item
      const updatedQuantity = existingItem.quantity + 1;
      dispatch(updateCartItem(existingItem.id, updatedQuantity));
      alert('Quantity updated in cart!');
    } else {
      // Add a new item to the cart with productId or serviceId based on type
      const newItem = { quantity: 1 };
      if (type === 'product') newItem.productId = itemId;
      if (type === 'service') newItem.serviceId = itemId;
      
      const response = await api.post('/cart', newItem);
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
      alert('Item added to cart!');
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
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};

export const clearCart = () => ({
  type: CLEAR_CART_SUCCESS,
});

export const checkoutCart = () => async (dispatch) => {
  try {
    await api.post('/checkout'); // Mock checkout request to API
    dispatch(clearCart()); // Clear cart in the Redux store
    alert('Checkout successful! Your cart has been cleared.');
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};