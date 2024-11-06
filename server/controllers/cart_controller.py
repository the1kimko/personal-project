from flask import Blueprint, request, jsonify
from config import db
from models.cart import Cart
from models.cart_item import CartItem
from models.product import Product

cart_blueprint = Blueprint('cart_controller', __name__)

@cart_blueprint.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data.get('quantity', 1)

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
    
    cart_item = CartItem(cart=cart, product_id=product_id, quantity=quantity)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Item added to cart"}), 201
