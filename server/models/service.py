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
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    image_url = db.Column(db.String(255), nullable=True)
    wishlist_items = db.relationship("WishlistItem", back_populates="service", cascade="all, delete-orphan")

    order_services = db.relationship("OrderService", back_populates="service", cascade="all, delete-orphan")
    service_requests = db.relationship("ServiceRequest", back_populates="service", cascade="all, delete-orphan")
    cart_items = db.relationship("CartItem", back_populates="service", cascade="all, delete-orphan")


    # Toggle availability
    def toggle_availability(self, is_available):
        self.available = is_available
