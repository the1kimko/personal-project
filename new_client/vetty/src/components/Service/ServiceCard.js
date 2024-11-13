import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import './service.css';

function ServiceCard({ service }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(service.id)); // Dispatch with product ID only
  };
  return (
    <div className="service-card">
      <img src={service.image} alt={service.name} className="product-image" />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p className="price">${service.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ServiceCard;


