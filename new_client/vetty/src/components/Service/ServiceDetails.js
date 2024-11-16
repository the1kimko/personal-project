// src/components/Service/ServiceDetails.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetails } from '../../redux/actions/productActions'; // Assuming this action exists
import { addToCart } from '../../redux/actions/cartActions';
import './service.css';

function ServiceDetails() {
  const { id } = useParams(); // Get the service ID from the URL
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.currentService); // Assuming this state is handled by Redux

  useEffect(() => {
    // Dispatch an action to fetch the service details by ID
    dispatch(fetchServiceDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(id, 'service'));
    alert('Service added to cart');
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div className="service-details">
      <h2 className="service-details-title">{service.name}</h2>
      <p className="service-description">{service.description}</p>
      <p className="service-price">Price: ${service.price}</p>
      {service.duration && <p className="service-duration">Duration: {service.duration}</p>}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ServiceDetails;
