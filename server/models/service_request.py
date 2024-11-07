from models import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

class ServiceRequest(db.Model, SerializerMixin):
    __tablename__ = 'service_requests'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    request_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Relationships
    user = db.relationship("User", back_populates="service_requests")
    service = db.relationship("Service", back_populates="service_requests")
