// src/components/Admin/ProductManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { deleteProduct } from '../../redux/actions/adminActions';

function ProductManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
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
      {/* Form for adding/updating products */}
    </div>
  );
}

export default ProductManagement;
