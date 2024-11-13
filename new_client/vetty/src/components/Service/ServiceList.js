// src/components/Service/ServiceList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import './service.css';

function ServiceList() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.product.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  console.log('Services:', services); // Debugging line

  return (
    <div className="service-list">
      <h2 className="service-list-title">Our Services</h2>
      <div className="service-cards">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className="service-price">${service.price}</p>
            <Link to={`/services/${service.id}`} className="service-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceList;
