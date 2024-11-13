// src/components/Product/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from './ProductCard';
import './product.css';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('Products:', products); // Debugging line

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default ProductList;

