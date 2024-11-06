from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from config import db
from models.user import User
from models.auth import AuthToken

auth_blueprint = Blueprint('auth_controller', __name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        auth_token = AuthToken(user_id=user.id)
        token = auth_token.encode_auth_token(user.id)
        auth_token.token = token
        db.session.add(auth_token)
        db.session.commit()
        return jsonify({'token': token, 'user': {'id': user.id, 'username': user.username, 'email': user.email}})
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201
