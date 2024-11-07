from models import db

class OrderService(db.Model):
    __tablename__ = 'order_services'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    
    # Relationships (optional, for easier access)
    order = db.relationship("Order", back_populates="order_services")
    service = db.relationship("Service", back_populates="order_services")
