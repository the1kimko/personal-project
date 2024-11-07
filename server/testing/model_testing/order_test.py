# tests/models/test_order_model.py
from models import Order, User, Product, db
from sqlalchemy.exc import IntegrityError
import pytest

class TestOrderModel:
    '''Order model in models.py'''

    def test_create_order(self, app):
        '''Order can be created with a user_id, product_id, and quantity.'''

        with app.app_context():
            User.query.delete()
            Product.query.delete()
            Order.query.delete()
            db.session.commit()

            user = User(username="testuser", role="user")
            product = Product(name="Cat Toy", description="A fun toy for cats", price=5.99, stock=20)

            db.session.add_all([user, product])
            db.session.commit()

            order = Order(user_id=user.id, product_id=product.id, quantity=3)

            db.session.add(order)
            db.session.commit()

            created_order = Order.query.filter_by(user_id=user.id, product_id=product.id).first()

            assert created_order is not None
            assert created_order.quantity == 3

    def test_requires_user_and_product(self, app):
        '''Order requires user_id and product_id to be valid.'''

        with app.app_context():
            Order.query.delete()
            db.session.commit()

            order = Order(quantity=1)
            with pytest.raises(IntegrityError):
                db.session.add(order)
                db.session.commit()
