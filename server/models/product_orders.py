from models import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

class ProductOrder(db.Model, SerializerMixin):
    __tablename__ = 'product_orders'
    serialize_rules = ('-user.product_orders', '-product.product_orders')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default="pending")
    order_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Relationships
    user = db.relationship("User", back_populates="product_orders")
    product = db.relationship("Product", back_populates="product_orders")

    # Methods to handle approval and denial
    def approve(self):
        """Approve the product order."""
        self.status = "approved"

    def deny(self):
        """Deny the product order."""
        self.status = "denied"
