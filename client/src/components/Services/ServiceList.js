// src/components/Services/ServiceList.js
import React from 'react';
import { useSelector } from 'react-redux';
import ServiceCard from './ServiceCard'; // Make sure you have ServiceCard similar to ProductCard

const ServiceList = () => {
  const services = useSelector((state) => state.services.services);

  return (
    <div>
      <h2>Our Services</h2>
      <div className="service-list">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
