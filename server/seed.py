from app import create_app
from config import db
from models.user import User
from models.product import Product
from models.service import Service
from models.auth import AuthToken
from werkzeug.security import generate_password_hash

# Initialize app and database
app = create_app()

with app.app_context():
    # Clear any existing data
    db.drop_all()
    db.create_all()

    # Add Users
    user1 = User(
        username='john_doe',
        email='john@example.com',
        password=generate_password_hash('password123', method='sha256')
    )
    user2 = User(
        username='jane_doe',
        email='jane@example.com',
        password=generate_password_hash('password456', method='sha256')
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    # Add Products
    product1 = Product(name='Fish Pellets', description='Pellets for fish feeding', price=15.99)
    product2 = Product(name='Cat Food', description='Food for cats', price=10.49)

    db.session.add(product1)
    db.session.add(product2)
    db.session.commit()

    # Add Services
    service1 = Service(name='Dog Grooming', description='Groom your dog', price=30.00)
    service2 = Service(name='Cat Vaccination', description='Vaccination for cats', price=20.00)

    db.session.add(service1)
    db.session.add(service2)
    db.session.commit()

    print("Database seeded successfully!")
