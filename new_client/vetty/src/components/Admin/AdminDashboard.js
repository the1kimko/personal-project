import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './admin.css';

function AdminDashboard() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />; // Redirect to homepage if not admin
  }
  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/products" className="admin-link">
          Manage Products
        </Link>
        <Link to="/admin/services" className="admin-link">
          Manage Services
        </Link>
        <Link to="/admin/orders" className="admin-link">
          Manage Orders
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;


