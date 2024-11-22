from models import db
from sqlalchemy_serializer import SerializerMixin

class WishlistItem(db.Model, SerializerMixin):
    __tablename__ = 'wishlist_items'
    serialize_rules = ('-user.wishlist', '-product.wishlist_items', '-service.wishlist_items')  # Avoid recursion

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)  # Allow nullable for mixed wishlist
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=True)

    # Relationships
    user = db.relationship("User", back_populates="wishlist")
    product = db.relationship("Product", back_populates="wishlist_items")
    service = db.relationship("Service", back_populates="wishlist_items")
