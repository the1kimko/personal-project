import unittest
from app import create_app, db
from models import Service
from flask import json

class TestServices(unittest.TestCase):

    def setUp(self):
        """Set up the app and create the test database"""
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()
        db.create_all()

        # Create a test service
        self.service = Service(name='Dog Grooming', description='Professional grooming for dogs', price=30.00)
        db.session.add(self.service)
        db.session.commit()

    def tearDown(self):
        """Clean up after each test"""
        db.session.remove()
        db.drop_all()
        self.app_ctx.pop()

    def test_add_service(self):
        """Test adding a new service"""
        response = self.client.post('/api/services', json={
            'name': 'Cat Vaccination',
            'description': 'Vaccination for cats',
            'price': 25.00
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Service added successfully', data['message'])

    def test_get_services(self):
        """Test fetching all services"""
        response = self.client.get('/api/services')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(data), 0)  # Check if services are returned

    def test_update_service(self):
        """Test updating an existing service"""
        response = self.client.put(f'/api/services/{self.service.id}', json={
            'name': 'Updated Dog Grooming',
            'description': 'Updated professional grooming for dogs',
            'price': 35.00
        })
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Service updated successfully', data['message'])

    def test_delete_service(self):
        """Test deleting a service"""
        response = self.client.delete(f'/api/services/{self.service.id}')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Service deleted successfully', data['message'])

if __name__ == '__main__':
    unittest.main()
