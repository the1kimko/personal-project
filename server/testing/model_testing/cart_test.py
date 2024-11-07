# tests/models/test_cart_model.py
from models import Cart, User, db
from sqlalchemy.exc import IntegrityError
import pytest

class TestCartModel:
    '''Cart model in models.py'''

    def test_create_cart(self, app):
        '''Cart can be created with a user_id.'''

        with app.app_context():
            User.query.delete()
            Cart.query.delete()
            db.session.commit()

            user = User(username="testuser", role="user")
            db.session.add(user)
            db.session.commit()

            cart = Cart(user_id=user.id)

            db.session.add(cart)
            db.session.commit()

            created_cart = Cart.query.filter_by(user_id=user.id).first()

            assert created_cart is not None
            assert created_cart.user_id == user.id

    def test_requires_user_id(self, app):
        '''Cart requires a user_id to be valid.'''

        with app.app_context():
            Cart.query.delete()
            db.session.commit()

            cart = Cart()
            with pytest.raises(IntegrityError):
                db.session.add(cart)
                db.session.commit()
