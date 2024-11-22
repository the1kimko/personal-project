from faker import Faker
from app import app
from models import db
from models.user import User
from models.product import Product
from models.service import Service
from werkzeug.security import generate_password_hash

# Initialize Faker
fake = Faker()

# Populate the database
with app.app_context():
    # Clear any existing data
    db.drop_all()
    db.create_all()

    # Create example users
    users = [
        User(
            username=fake.user_name(),
            password_hash=generate_password_hash(fake.password(length=10)),
            email=fake.email(),  # Add email
            role=fake.random_element(elements=["user", "admin"]),
        )
        for _ in range(5)
    ]
    db.session.bulk_save_objects(users)
    db.session.commit()

    # Create example products with image_url
    products = [
        Product(
            name="Premium Cat Food",
            description="High-quality cat food with essential nutrients.",
            price=12.99,
            stock=100,
            image_url="https://example.com/cat-food.jpg",
        ),
        Product(
            name="Dog Chew Toy",
            description="Durable chew toy for dogs of all sizes.",
            price=9.99,
            stock=50,
            image_url="https://m.media-amazon.com/images/I/71YOifgQNML.jpg",
        ),
        Product(
            name="Fish Flakes",
            description="Flake food for aquarium fish.",
            price=5.49,
            stock=200,
            image_url="https://alzufeeds.co.za/wp-content/uploads/2021/10/MG_1604-A-min-1.jpg",
        ),
        Product(
            name="Bird Seed Mix",
            description="Nutritious seed mix for pet birds.",
            price=7.99,
            stock=150,
            image_url="https://www.thompson-morgan.com/product_images/100/G2535-3.jpg",
        ),
        Product(
            name="Cat Litter",
            description="Odor-absorbing cat litter for easy cleanup.",
            price=14.99,
            stock=80,
            image_url="https://ishtarcompany.com/wp-content/uploads/2024/04/CAT-LITTER-product.jpg",
        ),
    ]
    db.session.bulk_save_objects(products)
    db.session.commit()

    # Create example services with image_url
    services = [
        Service(
            name="Dog Grooming",
            description="Full grooming service for dogs.",
            price=40.00,
            image_url="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147569900/images/8a0f66d-c653-c22-a52b-fb3b3c3f4717_dog-groomer-pomeranian-GettyImages-1383177683.jpg",
        ),
        Service(
            name="Cat Vaccination",
            description="Vaccination service for cats to prevent diseases.",
            price=25.00,
            image_url="https://d2zp5xs5cp8zlg.cloudfront.net/image-52999-800.jpg",
        ),
        Service(
            name="Bird Health Check",
            description="Routine checkup for pet birds.",
            price=30.00,
            image_url="https://www.kaytee.com/-/media/Project/OneWeb/Kaytee/US/learn-care/pet-birds/bird-health/bird-health-png.jpg?h=314&w=500&hash=C42E577F1FE18F7E2BA9592FB964E830",
        ),
        Service(
            name="Fish Tank Cleaning",
            description="Professional cleaning service for fish tanks.",
            price=20.00,
            image_url="https://m.media-amazon.com/images/I/81TUiqEyO5L._AC_UF894,1000_QL80_.jpg",
        ),
        Service(
            name="Puppy Training",
            description="Basic obedience training for puppies.",
            price=50.00,
            image_url="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/14154017/Australian-Shepherd-being-trained-by-a-dog-trainer-outdoors.jpg",
        ),
    ]
    db.session.bulk_save_objects(services)
    db.session.commit()

    print("Database seeded successfully!")
