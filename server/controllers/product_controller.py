from flask import Blueprint, request, jsonify
from models.product import Product
from config import db

product_blueprint = Blueprint('product_controller', __name__)

@product_blueprint.route('/add', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], description=data['description'], price=data['price'], stock=data['stock'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201
