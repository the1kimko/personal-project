import api from '../../axiosConfig';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const APPROVE_ORDER_SUCCESS = 'APPROVE_ORDER_SUCCESS';

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