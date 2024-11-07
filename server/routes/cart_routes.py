from flask import Blueprint, request, jsonify
from models.cart import Cart, db
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/", methods=["GET"])
@jwt_required()
def get_cart():
    current_user = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=current_user["id"]).all()
    return jsonify([item.to_dict() for item in cart_items])

@cart_bp.route("/", methods=["POST"])
@jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    data = request.get_json()
    new_cart_item = Cart(
        user_id=current_user["id"], 
        product_id=data["product_id"], 
        quantity=data["quantity"]
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify(new_cart_item.to_dict()), 201

@cart_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_cart_item(id):
    cart_item = Cart.query.get_or_404(id)
    data = request.get_json()
    cart_item.quantity = data.get("quantity", cart_item.quantity)
    db.session.commit()
    return jsonify(cart_item.to_dict())

@cart_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(id):
    cart_item = Cart.query.get_or_404(id)
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Cart item deleted"})

