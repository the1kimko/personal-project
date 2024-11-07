# tests/models/test_user_model.py
from models import User, db
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError
import pytest

class TestUserModel:
    '''Tests for the User model'''

    def test_has_attributes(self, app):
        '''User model has attributes: username, password_hash, role, created_at.'''

        with app.app_context():
            # Clear any existing data
            User.query.delete()
            db.session.commit()

            user = User(
                username="john_doe",
                role="user"
            )
            user.set_password("secure_password")

            db.session.add(user)
            db.session.commit()

            # Retrieve the created user
            created_user = User.query.filter_by(username="john_doe").first()

            # Check basic attributes
            assert created_user.username == "john_doe"
            assert created_user.role == "user"
            assert created_user.created_at <= datetime.now(timezone.utc)
            # Password hash should not be directly accessible
            with pytest.raises(AttributeError):
                created_user.password_hash

    def test_password_hashing(self, app):
        '''User model can hash passwords and check them correctly.'''

        with app.app_context():
            user = User(username="testuser")
            user.set_password("my_secure_password")
            
            # Check if password is hashed and stored
            assert user.check_password("my_secure_password") is True
            assert user.check_password("wrong_password") is False

    def test_requires_username(self, app):
        '''User model requires a username to be set.'''

        with app.app_context():
            User.query.delete()
            db.session.commit()

            user = User()
            with pytest.raises(IntegrityError):
                db.session.add(user)
                db.session.commit()

    def test_requires_unique_username(self, app):
        '''User model requires username to be unique.'''

        with app.app_context():
            User.query.delete()
            db.session.commit()

            user1 = User(username="uniqueuser")
            user1.set_password("password123")
            db.session.add(user1)
            db.session.commit()

            user2 = User(username="uniqueuser")
            user2.set_password("password123")
            
            with pytest.raises(IntegrityError):
                db.session.add(user2)
                db.session.commit()

    def test_user_role_default(self, app):
        '''User model defaults role to "user" if not provided.'''

        with app.app_context():
            user = User(username="default_role_user")
            user.set_password("password")
            db.session.add(user)
            db.session.commit()

            created_user = User.query.filter_by(username="default_role_user").first()
            assert created_user.role == "user"

    def test_relationships(self, app):
        '''User model has relationships with orders, cart, and service_requests.'''

        with app.app_context():
            User.query.delete()
            db.session.commit()

            user = User(username="relationshipuser")
            user.set_password("password")
            db.session.add(user)
            db.session.commit()

            # Check if relationships are correctly initialized as empty or None
            assert user.orders == []
            assert user.cart is None
            assert user.service_requests == []
