from config import db

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    
    cart_items = db.relationship('CartItem', backref='product', lazy=True)
    order_products = db.relationship('OrderProduct', backref='product', lazy=True)
