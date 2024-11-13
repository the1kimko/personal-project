// src/components/Service/ServiceDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import axios from 'axios';
import api from '../../axiosConfig';
import './service.css';

function ServiceDetails() {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch the details of a single service by its ID
    api.get(`/services/${id}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
      });
  }, [id]);

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div className="service-details">
      <h2 className="service-details-title">{service.name}</h2>
      <p className="service-description">{service.description}</p>
      <p className="service-price">Price: ${service.price}</p>
      <p className="service-duration">Duration: {service.duration}</p>
    </div>
  );
}

export default ServiceDetails;
