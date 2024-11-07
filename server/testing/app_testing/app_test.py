from datetime import datetime, timezone
from app import app
from models import db, User, Product, Service, Cart, Order

class TestApp:
    '''Tests for the Flask application in app.py'''

    # Setup: Clear out any test data from the database
    with app.app_context():
        db.drop_all()
        db.create_all()

    ### Auth Route Tests ###
    def test_register_user(self):
        '''Tests the /auth/register route for user registration.'''
        with app.app_context():
            response = app.test_client().post('/auth/register', json={
                'username': 'testuser',
                'password': 'password123'
            })
            assert response.status_code == 201
            assert 'User registered successfully' in response.json['message']

    def test_login_user(self):
        '''Tests the /auth/login route for user login.'''
        with app.app_context():
            # Register the user first
            app.test_client().post('/auth/register', json={
                'username': 'testuser',
                'password': 'password123'
            })
            # Now login
            response = app.test_client().post('/auth/login', json={
                'username': 'testuser',
                'password': 'password123'
            })
            assert response.status_code == 200
            assert 'access_token' in response.json

    ### Product Route Tests ###
    def test_create_product(self):
        '''Tests the /products route to create a new product.'''
        with app.app_context():
            response = app.test_client().post('/products', json={
                'name': 'Cat Food',
                'description': 'Nutritious cat food',
                'price': 10.99,
                'stock': 50
            })
            assert response.status_code == 201
            assert response.json['name'] == 'Cat Food'

    def test_get_products(self):
        '''Tests the /products route to retrieve all products.'''
        with app.app_context():
            product = Product(name="Dog Food", description="Healthy food for dogs", price=20.99, stock=30)
            db.session.add(product)
            db.session.commit()

            response = app.test_client().get('/products')
            assert response.status_code == 200
            assert any(p['name'] == "Dog Food" for p in response.json)

    ### Service Route Tests ###
    def test_create_service(self):
        '''Tests the /services route to create a new service.'''
        with app.app_context():
            response = app.test_client().post('/services', json={
                'name': 'Pet Grooming',
                'description': 'Grooming service for pets',
                'price': 30.00
            })
            assert response.status_code == 201
            assert response.json['name'] == 'Pet Grooming'

    def test_get_services(self):
        '''Tests the /services route to retrieve all services.'''
        with app.app_context():
            service = Service(name="Vaccination", description="Pet vaccination service", price=25.00)
            db.session.add(service)
            db.session.commit()

            response = app.test_client().get('/services')
            assert response.status_code == 200
            assert any(s['name'] == "Vaccination" for s in response.json)

    ### Cart Route Tests ###
    def test_add_to_cart(self):
        '''Tests adding a product to the cart.'''
        with app.app_context():
            user = User(username="cartuser", role="user")
            user.set_password("password")
            product = Product(name="Cat Toy", description="Fun toy for cats", price=5.99, stock=100)
            db.session.add_all([user, product])
            db.session.commit()

            # Add item to the cart
            response = app.test_client().post('/cart', json={
                'user_id': user.id,
                'product_id': product.id,
                'quantity': 2
            })
            assert response.status_code == 201
            assert response.json['quantity'] == 2

    def test_view_cart(self):
        '''Tests retrieving cart items for a user.'''
        with app.app_context():
            user = User(username="viewcartuser", role="user")
            product = Product(name="Dog Toy", description="Fun toy for dogs", price=7.99, stock=50)
            cart = Cart(user_id=user.id, product_id=product.id, quantity=1)
            db.session.add_all([user, product, cart])
            db.session.commit()

            response = app.test_client().get(f'/cart?user_id={user.id}')
            assert response.status_code == 200
            assert len(response.json) > 0
            assert response.json[0]['product_id'] == product.id

    ### Order Route Tests ###
    def test_place_order(self):
        '''Tests placing an order for a product.'''
        with app.app_context():
            user = User(username="orderuser", role="user")
            product = Product(name="Pet Shampoo", description="Shampoo for pets", price=9.99, stock=50)
            db.session.add_all([user, product])
            db.session.commit()

            response = app.test_client().post('/orders', json={
                'user_id': user.id,
                'product_id': product.id,
                'quantity': 1
            })
            assert response.status_code == 201
            assert response.json['status'] == 'pending'

    def test_get_order_history(self):
        '''Tests retrieving the order history for a user.'''
        with app.app_context():
            user = User(username="orderhistoryuser", role="user")
            product = Product(name="Pet Toy", description="A fun toy for pets", price=4.99, stock=50)
            order = Order(user_id=user.id, product_id=product.id, quantity=1, status="completed")
            db.session.add_all([user, product, order])
            db.session.commit()

            response = app.test_client().get(f'/orders?user_id={user.id}')
            assert response.status_code == 200
            assert len(response.json) > 0
            assert response.json[0]['status'] == 'completed'
