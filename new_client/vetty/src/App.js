// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ServiceList from './components/Service/ServiceList';
import ProductDetails from './components/Product/ProductDetails';
import ServiceDetails from './components/Service/ServiceDetails';
import Cart from './components/Cart/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <div className="app">
      {/* NavBar replaces the static header */}
      <NavBar />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} /> {/* New route for ProductList */}
          <Route path="/services" element={<ServiceList />} /> {/* New route for ServiceList */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Vetty. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
