from models import db
from sqlalchemy_serializer import SerializerMixin

class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'
    serialize_rules = ('-cart.cart_items', '-product.cart_items', '-service.cart_items')  # Avoid recursive fields

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)

    # Relationships to Cart and Product
    cart = db.relationship("Cart", back_populates="cart_items")
    product = db.relationship("Product", back_populates="cart_items")
    service = db.relationship("Service", back_populates="cart_items")
