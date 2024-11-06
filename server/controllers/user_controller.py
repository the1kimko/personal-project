from flask import Blueprint, request, jsonify
from models.user import User
from config import db

user_blueprint = Blueprint('user_controller', __name__)

@user_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201
