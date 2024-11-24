// src/components/Admin/ProductManagement.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { addProduct, updateProduct, deleteProduct } from '../../redux/actions/adminActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './admin.css';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);

  const [editingProduct, setEditingProduct] = useState(null); // To track the product being edited

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const initialValues = { name: '', description: '', price: '', stock: '', image: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive(),
    stock: Yup.number().required('Required').positive().integer(),
    image: Yup.string().required('Required'),
  });

  const handleAddProduct = (values, { resetForm }) => {
    dispatch(addProduct(values));
    resetForm();
  };

  const handleEditClick = (product) => {
    setEditingProduct(product); // Set the product being edited
  };

  const handleUpdateProduct = (values, { resetForm }) => {
    const { id, ...updatedData } = values; // Extract the product ID and updated fields
    dispatch(updateProduct(id, updatedData));
    setEditingProduct(null); // Exit edit mode
    resetForm();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <h3>Add Product</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddProduct}>
        <Form className="form">
          <Field name="name" placeholder="Product Name" />
          <ErrorMessage name="name" component="div" className="error" />
          <Field name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" className="error" />
          <Field name="price" placeholder="Price" type="number" />
          <ErrorMessage name="price" component="div" className="error" />
          <Field name="stock" placeholder="Stock" type="number" />
          <ErrorMessage name="stock" component="div" className="error" />
          <Field name="image" placeholder="Image URL" />
          <ErrorMessage name="image" component="div" className="error" />
          <button type="submit">Add Product</button>
        </Form>
      </Formik>

      <h3>Existing Products</h3>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          {editingProduct?.id === product.id ? (
            // Edit Form
            <Formik
              initialValues={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdateProduct}
            >
              <Form className="form">
                <Field name="name" placeholder="Product Name" />
                <ErrorMessage name="name" component="div" className="error" />
                <Field name="description" placeholder="Description" />
                <ErrorMessage name="description" component="div" className="error" />
                <Field name="price" placeholder="Price" type="number" />
                <ErrorMessage name="price" component="div" className="error" />
                <Field name="stock" placeholder="Stock" type="number" />
                <ErrorMessage name="stock" component="div" className="error" />
                <Field name="image" placeholder="Image URL" />
                <ErrorMessage name="image" component="div" className="error" />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              </Form>
            </Formik>
          ) : (
            // Display Product Details
            <>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleEditClick(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductManagement;
