from flask import Blueprint, request, jsonify
from models import Cart, CartItem, db
from models.product import Product
from models.service import Service
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/", methods=["GET"])
@jwt_required()
def get_cart():
    current_user = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=current_user["id"]).first()
    if not cart:
        return jsonify({"cart_items": []}), 200

    serialized_items = [
        {
            "id": item.id,
            "product": item.product.to_dict() if item.product else None,
            "service": item.service.to_dict() if item.service else None,
            "quantity": item.quantity,
        }
        for item in cart.cart_items
    ]
    return jsonify({"cart_items": serialized_items}), 200

@cart_bp.route("/", methods=["POST"])
@jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    data = request.get_json()

    cart = Cart.query.filter_by(user_id=current_user["id"]).first()
    if not cart:
        cart = Cart(user_id=current_user["id"])
        db.session.add(cart)
        db.session.commit()

    if "product_id" in data:
        product = Product.query.get(data["product_id"])
        if not product:
            return jsonify({"error": "Product not found"}), 404

        existing_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product.id).first()
        if existing_item:
            existing_item.quantity += data["quantity"]
        else:
            new_cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=data["quantity"])
            db.session.add(new_cart_item)

    if "service_id" in data:
        service = Service.query.get(data["service_id"])
        if not service:
            return jsonify({"error": "Service not found"}), 404

        existing_item = CartItem.query.filter_by(cart_id=cart.id, service_id=service.id).first()
        if existing_item:
            existing_item.quantity += data["quantity"]
        else:
            new_cart_item = CartItem(cart_id=cart.id, service_id=service.id, quantity=data["quantity"])
            db.session.add(new_cart_item)

    db.session.commit()
    return jsonify({"message": "Item(s) added to cart successfully"}), 201
