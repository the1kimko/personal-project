// src/components/Auth/Login.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';
import './auth.css';

const Login = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.post('/auth/login', values);
      const user = response.data.user;
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', user.role); // Save role in local storage for quick access
      dispatch(loginSuccess(user)); // Dispatch Redux action to store user data, including role

      if (user.role === 'admin') {
        window.location.href = '/admin'; // Redirect admins to the admin dashboard
      } else {
        window.location.href = '/'; // Redirect normal users to the home page
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ apiError: 'Invalid username or password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form className="login-form">
            <div className="form-group">
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {errors.apiError && <div className="error">{errors.apiError}</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
