from flask import Blueprint, request, jsonify
from models.order import Order, db
from models.order_product import OrderProduct
from models.order_service import OrderService
from flask_jwt_extended import jwt_required, get_jwt_identity

order_bp = Blueprint("order", __name__)

@order_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_orders():
    current_user = get_jwt_identity()
    if current_user["role"] == "admin":
        orders = Order.query.all()
    else:
        orders = Order.query.filter_by(user_id=current_user["id"]).all()
    return jsonify([order.to_dict() for order in orders])

@order_bp.route("/", methods=["POST"])
@jwt_required()
def create_order():
    current_user = get_jwt_identity()
    data = request.get_json()
    new_order = Order(
        user_id=current_user["id"],
        status="pending"
    )
    db.session.add(new_order)
    db.session.commit()

    # Add products to order
    for product_data in data.get("products", []):
        order_product = OrderProduct(
            order_id=new_order.id,
            product_id=product_data["product_id"],
            quantity=product_data["quantity"]
        )
        db.session.add(order_product)

    # Add services to order
    for service_data in data.get("services", []):
        order_service = OrderService(
            order_id=new_order.id,
            service_id=service_data["service_id"]
        )
        db.session.add(order_service)

    db.session.commit()
    return jsonify(new_order.to_dict()), 201

@order_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_order(id):
    current_user = get_jwt_identity()
    order = Order.query.get_or_404(id)

    if current_user["role"] != "admin" and order.user_id != current_user["id"]:
        return jsonify({"message": "Unauthorized"}), 403
    
    data = request.get_json()
    order.status = data.get("status", order.status)
    db.session.commit()
    return jsonify(order.to_dict())

@order_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_order(id):
    current_user = get_jwt_identity()
    order = Order.query.get_or_404(id)

    if current_user["role"] != "admin" and order.user_id != current_user["id"]:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted"})

