from flask import Blueprint
from .auth_routes import auth_bp
from .product_routes import product_bp
from .service_routes import service_bp
from .cart_routes import cart_bp
from .checkout_routes import checkout_bp
from .order_routes import order_bp
from .product_order_routes import product_order_bp
from .service_request_routes import service_request_bp
from .wishlist_routes import wishlist_bp

# Function to register all blueprints
def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(product_bp, url_prefix="/products")
    app.register_blueprint(service_bp, url_prefix="/services")
    app.register_blueprint(cart_bp, url_prefix="/cart")
    app.register_blueprint(checkout_bp, url_prefix="/checkout")
    app.register_blueprint(order_bp, url_prefix="/orders")
    app.register_blueprint(product_order_bp, url_prefix="/product_orders")
    app.register_blueprint(service_request_bp, url_prefix="/service_requests")
    app.register_blueprint(wishlist_bp, url_prefix="/wishlists")

