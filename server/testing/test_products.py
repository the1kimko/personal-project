import unittest
from app import create_app, db
from models import Product
from flask import json

class TestProducts(unittest.TestCase):

    def setUp(self):
        """Set up the app and create the test database"""
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        db.create_all()

        # Create a test product
        self.product = Product(name='Fish Pellets', description='Pellets for fish feeding', price=15.99)
        db.session.add(self.product)
        db.session.commit()

    def tearDown(self):
        """Clean up after each test"""
        db.session.remove()
        db.drop_all()
        self.app_ctx.pop()

    def test_add_product(self):
        """Test adding a new product"""
        response = self.client.post('/api/products', json={
            'name': 'Dog Food',
            'description': 'Food for dogs',
            'price': 20.99
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Product added successfully', data['message'])

    def test_get_products(self):
        """Test fetching all products"""
        response = self.client.get('/api/products')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(data), 0)  # Check if products are returned

    def test_update_product(self):
        """Test updating an existing product"""
        response = self.client.put(f'/api/products/{self.product.id}', json={
            'name': 'Updated Fish Pellets',
            'description': 'Updated pellets for fish',
            'price': 18.99
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Product updated successfully', data['message'])

    def test_delete_product(self):
        """Test deleting a product"""
        response = self.client.delete(f'/api/products/{self.product.id}')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Product deleted successfully', data['message'])

if __name__ == '__main__':
    unittest.main()
