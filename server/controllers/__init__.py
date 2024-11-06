from .user_controller import user_blueprint
from .product_controller import product_blueprint
from .service_controller import service_blueprint
from .order_controller import order_blueprint

def initialize_controllers(app):
    app.register_blueprint(user_blueprint)
    app.register_blueprint(product_blueprint)
    app.register_blueprint(service_blueprint)
    app.register_blueprint(order_blueprint)
