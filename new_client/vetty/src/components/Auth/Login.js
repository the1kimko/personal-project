import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("Login attempt with values:", values); // Debugging login input values

      const response = await api.post("/auth/login", values); // API request for login
      console.log("Login response data:", response.data); // Debugging API response data

      const { access_token, role, id, username } = response.data; // Extract token, role, and ID from API response

      if (access_token && role) {
        console.log("Token and role received:", { access_token, role }); // Debugging token and role

        // Save token and role in local storage
        localStorage.setItem("authToken", access_token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", id); // Persist user ID for other requests

        // Dispatch login success to Redux
        dispatch(
          loginSuccess({
            username,
            role,
            id,
          })
        );

        console.log("Token and role received:", { access_token, role, id });

        alert("Login successful!");

        // Redirect based on role
        navigate(role === "admin" ? "/admin" : "/");
      } else {
        console.error("Invalid response structure:", response.data); // Debugging unexpected response
        setErrors({ apiError: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Login failed error:", error); // Debugging error details

      // Handle API-specific or network-related errors
      if (error.response) {
        console.error("API Error:", error.response.data); // Server error details
        setErrors({ apiError: error.response.data.message || "Login failed." });
      } else if (error.request) {
        console.error("Network Error:", error.request); // Network-related issue
        setErrors({ apiError: "Network error. Please check your connection." });
      } else {
        console.error("Unexpected Error:", error.message); // Unexpected error
        setErrors({ apiError: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setSubmitting(false); // End form submission state
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
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
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
