import unittest
from app import create_app, db
from models import User
from flask import json

class TestAuth(unittest.TestCase):

    def setUp(self):
        """Set up the app and create the test database"""
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        db.create_all()

    def tearDown(self):
        """Clean up after each test"""
        db.session.remove()
        db.drop_all()
        self.app_ctx.pop()

    def test_register_user(self):
        """Test user registration"""
        response = self.client.post('/api/auth/register', json={
            'username': 'john_doe',
            'email': 'john@example.com',
            'password': 'password123'
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('User registered successfully', data['message'])

    def test_login_user(self):
        """Test user login and receiving JWT token"""
        # First, register the user
        self.client.post('/api/auth/register', json={
            'username': 'john_doe',
            'email': 'john@example.com',
            'password': 'password123'
        })
        # Now, login with the registered credentials
        response = self.client.post('/api/auth/login', json={
            'email': 'john@example.com',
            'password': 'password123'
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', data)

if __name__ == '__main__':
    unittest.main()
