// src/redux/reducers/cartReducer.js
import {
  FETCH_CART_ITEMS_SUCCESS,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_SUCCESS,
  CLEAR_CART_SUCCESS,
} from '../actions/cartActions';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.map(item => ({
          ...item,
          quantity: item.quantity ?? 1 // Ensure quantity defaults to 1 if null
        })),
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items, 
          { ...action.payload, quantity: action.payload.quantity ?? 1}
        ],
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id 
            ? { ...action.payload, quantity: action.payload.quantity ?? 1 } 
            : item
        ),
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
