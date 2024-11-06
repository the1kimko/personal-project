import unittest
from app import create_app, db
from models import User, Product, Cart, Order
from flask import json

class TestOrders(unittest.TestCase):

    def setUp(self):
        """Set up the app and create the test database"""
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        db.create_all()

        # Create a test user and product
        self.user = User(username='john_doe', email='john@example.com', password='password123')
        self.product = Product(name='Fish Pellets', description='Pellets for fish feeding', price=15.99)
        db.session.add(self.user)
        db.session.add(self.product)
        db.session.commit()

    def tearDown(self):
        """Clean up after each test"""
        db.session.remove()
        db.drop_all()
        self.app_ctx.pop()

    def test_checkout(self):
        """Test the checkout process"""
        # Add the product to the cart first
        self.client.post('/api/cart/add_to_cart', json={
            'user_id': self.user.id,
            'product_id': self.product.id,
            'quantity': 2
        })
        response = self.client.post('/api/orders/checkout', json={
            'user_id': self.user.id
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Order placed successfully', data['message'])

if __name__ == '__main__':
    unittest.main()
