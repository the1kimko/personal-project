// src/redux/reducers/productReducer.js
import { FETCH_PRODUCTS_SUCCESS, FETCH_SERVICES_SUCCESS } from '../actions/productActions';

const initialState = {
  products: [],
  services: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;

  