// src/components/Auth/Register.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../axiosConfig';
import './auth.css';

const Register = () => {
  // Define validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    role: Yup.string().required('Role is required')
  });

  // Define form submission handler
  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await api.post('/auth/register', values); // Send role with registration data
      alert('Registration successful! You can now log in.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error);

      // Extract backend error message
      if (error.response && error.response.data.message) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="register">
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', username: '', password: '', role: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register-form">
            <div className="form-group">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <Field as="select" name="role">
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="error" />
            </div>
            {errors.apiError && <div className="error">{errors.apiError}</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
