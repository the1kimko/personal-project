// src/components/Service/ServiceList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/actions/productActions';
import ServiceCard from './ServiceCard';
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
      <h2>Our Services</h2>
      {services.length > 0 ? (
        services.map((service) => <ServiceCard key={service.id} service={service} />)
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
}

export default ServiceList;
