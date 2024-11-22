from flask import Blueprint, request, jsonify
from models.product_order import ProductOrder, db
from flask_jwt_extended import jwt_required, get_jwt_identity

product_order_bp = Blueprint("product_order", __name__)

@product_order_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_product_orders():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    product_orders = ProductOrder.query.all()
    return jsonify([order.to_dict() for order in product_orders])

@product_order_bp.route("/<int:id>/approve", methods=["PUT"])
@jwt_required()
def approve_product_order(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    product_order = ProductOrder.query.get_or_404(id)
    product_order.approve()
    db.session.commit()
    return jsonify({"message": "Product order approved"})

@product_order_bp.route("/<int:id>/deny", methods=["PUT"])
@jwt_required()
def deny_product_order(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    product_order = ProductOrder.query.get_or_404(id)
    product_order.deny()
    db.session.commit()
    return jsonify({"message": "Product order denied"})
