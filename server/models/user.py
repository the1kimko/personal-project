from datetime import datetime, timezone
from models import db
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-password_hash', '-orders.user', '-cart_items.user', '-service_requests.user')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False, default="user")  # Role can be 'admin' or 'user'
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Relationships
    orders = db.relationship('Order', back_populates='user', lazy=True, cascade="all, delete-orphan")
    cart = db.relationship('Cart', back_populates='user', uselist=False, cascade="all, delete-orphan")
    service_requests = db.relationship('ServiceRequest', back_populates='user', cascade="all, delete-orphan")
    product_orders = db.relationship("ProductOrder", back_populates="user", cascade="all, delete-orphan")

    wishlist = db.relationship('WishlistItem', back_populates='user', cascade="all, delete-orphan")

    # Password hashing and checking methods
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
