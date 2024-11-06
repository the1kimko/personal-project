from .user_routes import user_routes
from .product_routes import product_routes
from .service_routes import service_routes
from .order_routes import order_routes

def initialize_routes(app):
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(product_routes, url_prefix='/api/products')
    app.register_blueprint(service_routes, url_prefix='/api/services')
    app.register_blueprint(order_routes, url_prefix='/api/orders')
