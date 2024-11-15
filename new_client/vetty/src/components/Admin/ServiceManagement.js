// src/components/Admin/ServiceManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/actions/productActions';
import { addService, updateService, deleteService } from '../../redux/actions/adminActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './admin.css';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.admin.services || []);

  console.log(services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const initialValues = { name: '', description: '', price: '', image: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive(),
    image: Yup.string().required('Required'),
  });

  const handleAddService = (values, { resetForm }) => {
    dispatch(addService(values));
    resetForm();
  };

  const handleUpdateService = (service) => {
    dispatch(updateService(service.id, service));
  };

  const handleDeleteService = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  return (
    <div>
      <h2>Service Management</h2>
      <h3>Add Service</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddService}>
        <Form className="form">
          <Field name="name" placeholder="Service Name" />
          <ErrorMessage name="name" component="div" className="error" />
          <Field name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" className="error" />
          <Field name="price" placeholder="Price" type="number" />
          <ErrorMessage name="price" component="div" className="error" />
          <Field name="image" placeholder="Image URL" />
          <ErrorMessage name="image" component="div" className="error" />
          <button type="submit">Add Service</button>
        </Form>
      </Formik>

      <h3>Existing Services</h3>
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} className="service-item">
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <button onClick={() => handleUpdateService(service)}>Update</button>
            <button onClick={() => handleDeleteService(service.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
}

export default ServiceManagement;
