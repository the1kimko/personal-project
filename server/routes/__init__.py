from flask import Blueprint
from .auth_routes import auth_bp
from .product_routes import product_bp
from .service_routes import service_bp
from .cart_routes import cart_bp
from .order_routes import order_bp

# Function to register all blueprints
def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(product_bp, url_prefix="/products")
    app.register_blueprint(service_bp, url_prefix="/services")
    app.register_blueprint(cart_bp, url_prefix="/cart")
    app.register_blueprint(order_bp, url_prefix="/orders")

