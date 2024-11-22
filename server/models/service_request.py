from models import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

class ServiceRequest(db.Model, SerializerMixin):
    __tablename__ = 'service_requests'
    serialize_rules = ('-user.service_requests', '-service.service_requests')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    status = db.Column(db.String(50), default="pending")
    request_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Relationships
    user = db.relationship("User", back_populates="service_requests")
    service = db.relationship("Service", back_populates="service_requests")

    # Methods to handle approval and denial
    def approve(self):
        """Approve the service request."""
        self.status = "approved"

    def deny(self):
        """Deny the service request."""
        self.status = "denied"
