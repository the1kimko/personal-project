import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import axios from 'axios';
import api from '../../axiosConfig';
import './product.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => setProduct(response.data));
  }, [id]);

  const handleAddToCart = async () => {
    await api.post('/cart', { productId: id });
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
