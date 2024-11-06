from config import db

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Pending")
    
    order_products = db.relationship('OrderProduct', backref='order', lazy=True)
    order_services = db.relationship('OrderService', backref='order', lazy=True)
