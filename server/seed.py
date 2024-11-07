from faker import Faker
from app import app  # Ensure app is correctly initialized in app.py
from models import db
from models.user import User
from models.product import Product
from models.service import Service
from werkzeug.security import generate_password_hash

# Initialize Faker
fake = Faker()

# Populate the database with example data
with app.app_context():
    # Clear any existing data
    db.drop_all()
    db.create_all()

    # Create example users
    users = []
    for _ in range(5):  # Generate 5 users
        username = fake.user_name()
        user = User(
            username=username,
            password_hash=generate_password_hash(fake.password(length=10)),
            role=fake.random_element(elements=["user", "admin"])
        )
        users.append(user)
        db.session.add(user)
    db.session.commit()

    # Create example products (e.g., pet foods, accessories)
    products = [
        Product(name="Premium Cat Food", description="High-quality cat food with essential nutrients.", price=12.99, stock=100),
        Product(name="Dog Chew Toy", description="Durable chew toy for dogs of all sizes.", price=9.99, stock=50),
        Product(name="Fish Flakes", description="Flake food for aquarium fish.", price=5.49, stock=200),
        Product(name="Bird Seed Mix", description="Nutritious seed mix for pet birds.", price=7.99, stock=150),
        Product(name="Cat Litter", description="Odor-absorbing cat litter for easy cleanup.", price=14.99, stock=80)
    ]
    db.session.bulk_save_objects(products)
    db.session.commit()

    # Create example services (e.g., grooming, vaccination)
    services = [
        Service(name="Dog Grooming", description="Full grooming service for dogs.", price=40.00),
        Service(name="Cat Vaccination", description="Vaccination service for cats to prevent diseases.", price=25.00),
        Service(name="Bird Health Check", description="Routine checkup for pet birds.", price=30.00),
        Service(name="Fish Tank Cleaning", description="Professional cleaning service for fish tanks.", price=20.00),
        Service(name="Puppy Training", description="Basic obedience training for puppies.", price=50.00)
    ]
    db.session.bulk_save_objects(services)
    db.session.commit()

    print("Database seeded successfully with users, products, and services!")
