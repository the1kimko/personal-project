import api from '../../axiosConfig';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_SERVICE_SUCCESS = 'ADD_SERVICE_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_SERVICE_SUCCESS = 'UPDATE_SERVICE_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const APPROVE_ORDER_SUCCESS = 'APPROVE_ORDER_SUCCESS';
export const FETCH_ORDER_HISTORY_SUCCESS = 'FETCH_ORDER_HISTORY_SUCCESS';

export const addProduct = (productData) => async (dispatch) => {
  try {
      const response = await api.post('/products', productData);
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
      console.error('Error adding product:', error);
  }
};

export const addService = (serviceData) => async (dispatch) => {
  try {
      const response = await api.post('/services', serviceData);
      dispatch({ type: ADD_SERVICE_SUCCESS, payload: response.data });
  } catch (error) {
      console.error('Error adding service:', error);
  }
};

export const updateProduct = (productId, updatedData) => async (dispatch) => {
  try {
      const response = await api.put(`/products/${productId}`, updatedData);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
      console.error('Error updating product:', error);
  }
};

export const updateService = (serviceId, updatedData) => async (dispatch) => {
  try {
      const response = await api.put(`/services/${serviceId}`, updatedData);
      dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: response.data });
  } catch (error) {
      console.error('Error updating service:', error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        await api.delete(`/products/${productId}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
      } catch (error) {
        console.error('Error deleting products:', error);
    }
};
  
  export const deleteService = (serviceId) => async (dispatch) => {
    try {
        await api.delete(`/services/${serviceId}`);
        dispatch({ type: DELETE_SERVICE_SUCCESS, payload: serviceId });
    } catch (error) {
        console.error('Error deleting services:', error);
    }
};

// Fetch orders
  export const fetchOrders = () => async (dispatch) => {
    try {
      const response = await api.get('/orders');
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Update order status
  export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  export const approveOrder = (orderId, status) => async (dispatch) => {
    try {
        const response = await api.put(`/orders/${orderId}`, { status });
        dispatch({ type: APPROVE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error approving orders:', error);
    }
  };

  export const fetchOrderHistory = () => async (dispatch) => {
    try {
      const response = await api.get('/orders');
      dispatch({ type: FETCH_ORDER_HISTORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };