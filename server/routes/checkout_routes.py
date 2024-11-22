from flask import Blueprint, jsonify, request
import requests
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, Cart, Product, Service

checkout_bp = Blueprint("checkout", __name__)

PESAPAL_BACKEND_URL = "https://pesapalapi.onrender.com"

@checkout_bp.route("/checkout", methods=["POST"])
@jwt_required()
def checkout():
    current_user = get_jwt_identity()
    user_id = current_user["id"]

    # Fetch user cart
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"error": "Your cart is empty!"}), 400

    # Prepare payment data
    product_items = []
    total_amount = 0

    for item in cart_items:
        if item.product_id:
            product = Product.query.get(item.product_id)
            product_items.append({"name": product.name, "quantity": item.quantity, "price": product.price})
            total_amount += product.price * item.quantity
        elif item.service_id:
            service = Service.query.get(item.service_id)
            product_items.append({"name": service.name, "quantity": item.quantity, "price": service.price})
            total_amount += service.price * item.quantity

    # Call Pesapal backend to process payment
    pesapal_payload = {
        "sessionToken": request.headers.get("Authorization"),
        "ipnId": "<ipn_id>",  # Ideally fetch this dynamically
        "amount": total_amount,
        "emailCust": current_user["email"],
        "phoneCust": current_user["phone"],
        "fname": current_user["first_name"],
        "lname": current_user["last_name"],
    }

    try:
        response = requests.post(f"{PESAPAL_BACKEND_URL}/submit-order", json=pesapal_payload)
        response.raise_for_status()
        pesapal_response = response.json()

        # Save order and clear cart
        new_order = Order(user_id=user_id, status="pending", total_cost=total_amount)
        db.session.add(new_order)
        db.session.commit()

        Cart.query.filter_by(user_id=user_id).delete()
        db.session.commit()

        return jsonify({
            "message": "Checkout successful!",
            "redirect_url": pesapal_response["redirect_url"],
            "order_tracking_id": pesapal_response["order_tracking_id"],
        }), 200
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
