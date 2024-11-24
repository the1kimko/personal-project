from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, WishlistItem, Product, Service, User

wishlist_bp = Blueprint('wishlist', __name__)

@wishlist_bp.route("/", methods=["GET"])
@jwt_required()
def get_wishlist():
    current_user = get_jwt_identity()
    wishlist_items = WishlistItem.query.filter_by(user_id=current_user["id"]).all()
    results = []
    for item in wishlist_items:
        if item.product_id:
            product = Product.query.get(item.product_id)
            results.append({
                "id": item.id,
                "type": "product",
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "image": product.image_url
            })
        elif item.service_id:
            service = Service.query.get(item.service_id)
            results.append({
                "id": item.id,
                "type": "service",
                "name": service.name,
                "description": service.description,
                "price": service.price,
                "image": service.image_url
            })
    return jsonify(results), 200

@wishlist_bp.route('/product/<int:product_id>', methods=['POST'])
@jwt_required()
def add_product_to_wishlist(product_id):
    """Add a product to the user's wishlist."""
    current_user = get_jwt_identity()
    user_id = current_user["id"]
    
    # Check if product already in wishlist
    existing_item = WishlistItem.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing_item:
        return jsonify({"message": "Product already in wishlist"}), 400
    
    # Add to wishlist
    wishlist_item = WishlistItem(user_id=user_id, product_id=product_id)
    db.session.add(wishlist_item)
    db.session.commit()
    return jsonify(wishlist_item.to_dict()), 201

@wishlist_bp.route('/service/<int:service_id>', methods=['POST'])
@jwt_required()
def add_service_to_wishlist(service_id):
    """Add a service to the user's wishlist."""
    current_user = get_jwt_identity()
    user_id = current_user["id"]
    
    # Check if service already in wishlist
    existing_item = WishlistItem.query.filter_by(user_id=user_id, service_id=service_id).first()
    if existing_item:
        return jsonify({"message": "Service already in wishlist"}), 400

    # Add to wishlist
    wishlist_item = WishlistItem(user_id=user_id, service_id=service_id)
    db.session.add(wishlist_item)
    db.session.commit()
    return jsonify(wishlist_item.to_dict()), 201

@wishlist_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_wishlist(item_id):
    """Remove an item from the user's wishlist."""
    wishlist_item = WishlistItem.query.get_or_404(item_id)
    db.session.delete(wishlist_item)
    db.session.commit()
    return '', 204
