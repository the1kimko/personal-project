// src/components/Auth/Login.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.get('/users', values);
      const user = response.data.find(
        (u) => u.username === values.username && u.password === values.password
      );
      
      // Ensure the user exists and has a role before proceeding
      if (user && user.role) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', user.role); // Save userRole in localStorage
        dispatch(loginSuccess(user)); // Update Redux state with user data
        alert('Login successful!');

        // Redirect based on role
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        setErrors({ apiError: 'Invalid username or password' });
      }
  } catch (error) {
    console.error('Login failed:', error);
    setErrors({ apiError: 'Unable to log in' });
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
