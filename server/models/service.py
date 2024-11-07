from datetime import datetime, timezone
from models import db
from sqlalchemy_serializer import SerializerMixin

class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'
    serialize_rules = ('-order_services.service', '-service_requests.service')  # Avoid recursive fields

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    order_services = db.relationship("OrderService", back_populates="service", cascade="all, delete-orphan")
    service_requests = db.relationship("ServiceRequest", back_populates="service", cascade="all, delete-orphan")
