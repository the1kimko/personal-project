# tests/models/test_service_model.py
from models import Service, db
from sqlalchemy.exc import IntegrityError
import pytest

class TestServiceModel:
    '''Service model in models.py'''

    def test_has_attributes(self, app):
        '''has attributes name, description, and price.'''

        with app.app_context():
            Service.query.delete()
            db.session.commit()

            service = Service(
                name="Pet Grooming",
                description="Professional grooming services for pets",
                price=30.00
            )

            db.session.add(service)
            db.session.commit()

            created_service = Service.query.filter_by(name="Pet Grooming").first()

            assert created_service.name == "Pet Grooming"
            assert created_service.description == "Professional grooming services for pets"
            assert created_service.price == 30.00

    def test_requires_name(self, app):
        '''requires each service to have a name.'''

        with app.app_context():
            Service.query.delete()
            db.session.commit()

            service = Service(description="Test description", price=20.00)
            with pytest.raises(IntegrityError):
                db.session.add(service)
                db.session.commit()
