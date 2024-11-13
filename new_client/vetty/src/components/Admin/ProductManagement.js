import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import api from '../axiosConfig';
import './admin.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((response) => setProducts(response.data));
  }, []);

  const handleDelete = (productId) => {
    api.delete(`/products/${productId}`).then(() => {
      setProducts((products) => products.filter((product) => product.id !== productId));
    });
  };

  return (
    <div>
      <h2>Product Management</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductManagement;
