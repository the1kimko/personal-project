import React, { useEffect } from 'react';
import ProductList from '../components/Products/ProductList';
import ServiceList from '../components/Services/ServiceList';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../services/productService';
import { fetchServices } from '../services/serviceService';
import { setProducts } from '../features/productSlice';
import { setServices } from '../features/serviceSlice';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      dispatch(setProducts(products));
    };

    const getServices = async () => {
      const services = await fetchServices();
      dispatch(setServices(services));
    };

    getProducts();
    getServices();
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="container">
        <h1>Welcome to Vetty</h1>
        <ProductList />
        <ServiceList />
      </div>
    </div>
  );
};

export default HomePage;
