// src/redux/reducers/adminReducer.js
import { FETCH_PRODUCTS_SUCCESS } from '../actions/productActions';
import { 
  ADD_PRODUCT_SUCCESS,
  ADD_SERVICE_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  FETCH_ORDERS_SUCCESS,
  UPDATE_ORDER_STATUS_SUCCESS,
  APPROVE_ORDER_SUCCESS,
  DISAPPROVE_ORDER_SUCCESS,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_SERVICE_REQUESTS_SUCCESS,
  UPDATE_SERVICE_REQUEST_STATUS_SUCCESS,
  FETCH_SERVICE_REQUEST_HISTORY_SUCCESS

} from '../actions/adminActions';
  
  const initialState = {
    products: [], // initialize products here
    services: [],
    orders: [],
    serviceRequests: [],
    orderHistory: [],
    serviceRequestHistory: []
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
        };
      case ADD_PRODUCT_SUCCESS:
          return { ...state, products: [...state.products, action.payload] };
      case ADD_SERVICE_SUCCESS:
          return { ...state, services: [...state.services, action.payload] };
      case UPDATE_PRODUCT_SUCCESS:
          return {
              ...state,
              products: state.products.map((prod) =>
                  prod.id === action.payload.id ? action.payload : prod
              ),
          };
      case UPDATE_SERVICE_SUCCESS:
          return {
              ...state,
              services: state.services.map((serv) =>
                  serv.id === action.payload.id ? action.payload : serv
              ),
          };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter((product) => product.id !== action.payload),
        };
      case DELETE_SERVICE_SUCCESS:
        return { ...state, services: state.services.filter((s) => s.id !== action.payload) };
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          orders: action.payload,
        };
      case UPDATE_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        };
      case APPROVE_ORDER_SUCCESS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        };
      case DISAPPROVE_ORDER_SUCCESS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        };
      case FETCH_ORDER_HISTORY_SUCCESS:
        return {
          ...state,
          orderHistory: action.payload,
        };
      case FETCH_SERVICE_REQUESTS_SUCCESS:
        return { ...state, serviceRequests: action.payload };
      case UPDATE_SERVICE_REQUEST_STATUS_SUCCESS:
        return {
          ...state,
          serviceRequests: state.serviceRequests.map(request =>
            request.id === action.payload.id ? action.payload : request
          )
        };
      case FETCH_SERVICE_REQUEST_HISTORY_SUCCESS:
        return { ...state, serviceRequestHistory: action.payload };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  