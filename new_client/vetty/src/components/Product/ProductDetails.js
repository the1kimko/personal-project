// src/components/Product/ProductDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';
import './product.css';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.currentProduct);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(id, 'product'));
    alert('Product added to cart');
  };

  return product ? (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProductDetails;
