import api from '../../axiosConfig';

// Action Types
export const FETCH_WISHLIST_REQUEST = "FETCH_WISHLIST_REQUEST";
export const FETCH_WISHLIST_SUCCESS = "FETCH_WISHLIST_SUCCESS";
export const FETCH_WISHLIST_FAILURE = "FETCH_WISHLIST_FAILURE";
export const ADD_TO_WISHLIST_SUCCESS = "ADD_TO_WISHLIST_SUCCESS";
export const REMOVE_FROM_WISHLIST_SUCCESS = "REMOVE_FROM_WISHLIST_SUCCESS";

// Fetch all wishlist items
export const fetchWishlist = () => async (dispatch) => {
  dispatch({ type: FETCH_WISHLIST_REQUEST });
  try {
    const response = await api.get("/wishlists");
    dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    dispatch({ type: FETCH_WISHLIST_FAILURE, payload: error.message });
  }
};

// Add a product or service to the wishlist
export const addToWishlist = (id, type) => async (dispatch) => {
  try {
    const endpoint = type === "product" ? `/wishlists/product/${id}` : `/wishlists/service/${id}`;
    const response = await api.post(endpoint);
    dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: response.data });
    alert(`${type === "product" ? "Product" : "Service"} added to wishlist!`);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    alert("Failed to add to wishlist.");
  }
};

// Remove an item from the wishlist
export const removeFromWishlist = (itemId) => async (dispatch) => {
  try {
    await api.delete(`/wishlist/${itemId}`);
    dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: itemId });
    alert("Item removed from wishlist!");
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    alert("Failed to remove from wishlist.");
  }
};
