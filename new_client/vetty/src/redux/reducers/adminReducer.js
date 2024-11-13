// src/redux/reducers/adminReducer.js
import {
    FETCH_PRODUCTS_SUCCESS } from '../actions/productActions';
    import { DELETE_PRODUCT_SUCCESS
    // other actions
  } from '../actions/adminActions';
  
  const initialState = {
    products: [], // initialize products here
    services: [],
    orders: [],
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter((product) => product.id !== action.payload),
        };
      // other cases
      default:
        return state;
    }
  };
  
  export default adminReducer;
  