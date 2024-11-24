//import api from '../../axiosConfig';

// src/redux/actions/authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// export const login = (credentials) => async (dispatch) => {
//   try {
//     const response = await api.post('/auth/login', credentials);
//     const { access_token, id, role, username } = response.data;

//     // Save token and user data in local storage
//     localStorage.setItem('authToken', access_token);
//     localStorage.setItem('user', JSON.stringify({ id, role, username }));

//     // Dispatch user info to Redux
//     dispatch(loginSuccess({ id, role, username }));
//   } catch (error) {
//     console.error('Login failed:', error);
//     alert('Invalid credentials');
//   }
// };

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

  