from datetime import datetime, timezone
from models import db
from sqlalchemy_serializer import SerializerMixin

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    serialize_rules = ('-order_products.product', '-cart_items.product')  # Avoid recursive fields

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    image_url = db.Column(db.String(255), nullable=True)

    cart_items = db.relationship("CartItem", back_populates="product", cascade="all, delete-orphan")
    order_products = db.relationship("OrderProduct", back_populates="product", cascade="all, delete-orphan")
    product_orders = db.relationship("ProductOrder", back_populates="product", cascade="all, delete-orphan")
    wishlist_items = db.relationship("WishlistItem", back_populates="product", cascade="all, delete-orphan")

    # Check stock availability
    def check_stock(self, quantity):
        if self.stock < quantity:
            raise ValueError(f"Insufficient stock for {self.name}. Available: {self.stock}, Requested: {quantity}")



