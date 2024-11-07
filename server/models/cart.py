from datetime import datetime, timezone
from models import db
from sqlalchemy_serializer import SerializerMixin

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'
    serialize_rules = ('-user.cart', '-cart_items.cart')  # Avoid recursive fields

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Relationship to user
    user = db.relationship("User", back_populates="cart")

    # Relationship to cart items (each item represents a product in the cart with quantity)
    cart_items = db.relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")
