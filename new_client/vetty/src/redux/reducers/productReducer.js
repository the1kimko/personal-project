// src/redux/reducers/productReducer.js
import { 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_SERVICES_SUCCESS, 
  FETCH_PRODUCT_DETAILS_SUCCESS, 
  FETCH_SERVICE_DETAILS_SUCCESS 
} from '../actions/productActions';

const initialState = {
  products: [],
  services: [],
  productDetails: null, // Added for storing details of a single product
  serviceDetails: null  // Added for storing details of a single service
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
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: action.payload // Set product details when fetched
      };
    case FETCH_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        serviceDetails: action.payload // Set service details when fetched
      };
    default:
      return state;
  }
};

export default productReducer;


  