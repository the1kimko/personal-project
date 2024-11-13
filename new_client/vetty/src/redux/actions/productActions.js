//import axios from 'axios';
import api from '../../axiosConfig';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';

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