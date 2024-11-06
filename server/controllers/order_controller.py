from flask import Blueprint, request, jsonify
from models.order import Order
from config import db

order_blueprint = Blueprint('order_controller', __name__)

@order_blueprint.route('/create', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(user_id=data['user_id'], total_price=data['total_price'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created successfully"}), 201
