from datetime import datetime, timezone
from models import db
from sqlalchemy_serializer import SerializerMixin

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    serialize_rules = ('-user.orders', '-order_products.order', '-order_services.order')  # Avoid recursive fields

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    status = db.Column(db.String(50), default="pending")  # e.g., 'pending', 'shipped', 'completed'

    user = db.relationship("User", back_populates="orders")
    order_products = db.relationship("OrderProduct", back_populates="order", cascade="all, delete-orphan")
    order_services = db.relationship("OrderService", back_populates="order", cascade="all, delete-orphan")
