// src/components/Admin/ServiceManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/actions/productActions';
import { deleteService } from '../../redux/actions/adminActions';

function ServiceManagement() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.admin.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
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
