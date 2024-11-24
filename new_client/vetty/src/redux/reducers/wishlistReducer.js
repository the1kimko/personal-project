import {
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_SUCCESS,
} from "../actions/wishlistActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_WISHLIST_SUCCESS:
      return { ...state, items: action.payload, loading: false };

    case FETCH_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_TO_WISHLIST_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default wishlistReducer;
