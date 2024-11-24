from flask import Blueprint, request, jsonify
from models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # Validate email and username
    if User.query.filter_by(email=data.get("email")).first():
        return jsonify({"message": "Email already registered"}), 400
    if User.query.filter_by(username=data.get("username")).first():
        return jsonify({"message": "Username already taken"}), 400

    # Create a new user
    user = User(
        username=data["username"],
        email=data["email"],
        role=data.get("role", "user")  # Default to "user" role
    )
    user.set_password(data["password"])  # Hash the password
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    # Search for user by username
    user = User.query.filter_by(username=data["username"]).first()
    if user and user.check_password(data["password"]):
        access_token = create_access_token(identity={"id": user.id, "role": user.role})
        return jsonify({
            "access_token": access_token,
            "role": user.role,
            "id": user.id,
            "username": user.username
        }), 200
    return jsonify({"message": "Invalid credentials"}), 401

@auth_bp.route("/users", methods=["GET"])
def get_all_users():
    """Endpoint to fetch all users (for admin use)."""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200
