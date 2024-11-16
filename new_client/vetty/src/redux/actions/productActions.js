//import axios from 'axios';
import api from '../../axiosConfig';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_SERVICE_DETAILS_SUCCESS = 'FETCH_SERVICE_DETAILS_SUCCESS';

// Fetch products from API and dispatch to Redux store
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await api.get('/products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Fetch services from API and dispatch to Redux store
export const fetchServices = () => async (dispatch) => {
  try {
    const response = await api.get('/services');
    dispatch({ type: FETCH_SERVICES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

// Fetch product details by ID
export const fetchProductDetails = (productId) => async (dispatch) => {
  try {
    const response = await api.get(`/products/${productId}`);
    dispatch({ type: FETCH_PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

// Action creator to fetch service details by ID
export const fetchServiceDetails = (serviceId) => async (dispatch) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    dispatch({ type: FETCH_SERVICE_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching service details:', error);
  }
};