from config import db

class Service(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    
    order_services = db.relationship('OrderService', backref='service', lazy=True)
