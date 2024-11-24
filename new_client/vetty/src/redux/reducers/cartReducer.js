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
        items: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
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
