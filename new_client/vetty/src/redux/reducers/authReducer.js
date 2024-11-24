// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('user'); // Clear user from localStorage
      localStorage.removeItem('token');
      return { ...state, user: null };
      default:
        return state;
      }
  };
  
  export default authReducer;
  