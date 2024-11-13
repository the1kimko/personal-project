// src/components/Home/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchServices } from '../../redux/actions/productActions';
import ProductCard from '../Product/ProductCard';
import ServiceCard from '../Service/ServiceCard';
import './home.css';

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const services = useSelector((state) => state.product.services);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Stylish Accessories For Your Pet</h1>
        <p>Discover the best products and services for your beloved pets!</p>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          We’re dedicated to offering the finest products and services for your pets. From food and accessories to grooming
          and healthcare, we provide everything you need to keep your pets happy and healthy.
        </p>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Our Products</h2>
        <div className="product-list">
          {products.slice(0, 4).map((product) => ( // Display only a few items as a preview
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products">
          <button className="view-more-button">View More Products</button>
        </Link>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="service-list">
          {services.slice(0, 4).map((service) => ( // Display only a few items as a preview
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <Link to="/services">
          <button className="view-more-button">View More Services</button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
