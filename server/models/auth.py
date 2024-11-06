from config import db
import jwt
import datetime
from flask import current_app

class AuthToken(db.Model):
    __tablename__ = 'auth_tokens'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    token = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def encode_auth_token(self, user_id):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(payload, current_app.config.get('SECRET_KEY'), algorithm='HS256')
    
    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'), algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
