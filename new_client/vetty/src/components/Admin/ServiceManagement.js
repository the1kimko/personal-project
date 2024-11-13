import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import api from '../axiosConfig';
import './admin.css';

function ServiceManagement() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then((response) => setServices(response.data));
  }, []);

  const handleDelete = (serviceId) => {
    api.delete(`/services/${serviceId}`).then(() => {
      setServices((services) => services.filter((service) => service.id !== serviceId));
    });
  };

  return (
    <div>
      <h2>Service Management</h2>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>Price: {service.price}</p>
          <button onClick={() => handleDelete(service.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ServiceManagement;
