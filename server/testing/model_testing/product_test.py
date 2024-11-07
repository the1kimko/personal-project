# tests/models/test_product_model.py
from models import Product, db
from sqlalchemy.exc import IntegrityError
import pytest

class TestProductModel:
    '''Product model in models.py'''

    def test_has_attributes(self, app):
        '''has attributes name, description, price, and stock.'''

        with app.app_context():
            Product.query.delete()
            db.session.commit()

            product = Product(
                name="Cat Food",
                description="Nutritious food for cats",
                price=15.99,
                stock=50
            )

            db.session.add(product)
            db.session.commit()

            created_product = Product.query.filter_by(name="Cat Food").first()

            assert created_product.name == "Cat Food"
            assert created_product.description == "Nutritious food for cats"
            assert created_product.price == 15.99
            assert created_product.stock == 50

    def test_requires_name(self, app):
        '''requires each product to have a name.'''

        with app.app_context():
            Product.query.delete()
            db.session.commit()

            product = Product(description="Sample description", price=10.99, stock=10)
            with pytest.raises(IntegrityError):
                db.session.add(product)
                db.session.commit()

    def test_has_default_stock(self, app):
        '''defaults stock to 0 if not provided.'''

        with app.app_context():
            product = Product(name="Dog Food", description="Food for dogs", price=20.00)

            db.session.add(product)
            db.session.commit()

            created_product = Product.query.filter_by(name="Dog Food").first()
            assert created_product.stock == 0
