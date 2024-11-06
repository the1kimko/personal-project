from config import db
from .cart_item import CartItem

class Cart(db.Model):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    items = db.relationship('CartItem', backref='cart', lazy=True)
    
    def get_total_price(self):
        return sum(item.product.price * item.quantity for item in self.items)
