from flask import Blueprint, request, jsonify
from models.product import Product, db
from flask_jwt_extended import jwt_required, get_jwt_identity

product_bp = Blueprint("product", __name__)

@product_bp.route("/", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@product_bp.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@product_bp.route("/", methods=["POST"])
@jwt_required()
def create_product():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    data = request.get_json()
    new_product = Product(
        name=data["name"], 
        description=data["description"], 
        price=data["price"], 
        stock=data["stock"]
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@product_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.stock = data.get("stock", product.stock)
    db.session.commit()
    return jsonify(product.to_dict())

@product_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})

