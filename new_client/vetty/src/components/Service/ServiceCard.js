import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import './service.css';

function ServiceCard({ service }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(service.id, 'service')); // Dispatch with product ID only
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(service.id, "service"));
  };

  return (
    <div className="service-card">
      <img src={service.image} alt={service.name} className="product-image" />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p className="price">${service.price}</p>
      <button className='button add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
      <button className='button add-to-wishlist' onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
}

export default ServiceCard;


