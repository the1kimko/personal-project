from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Naming convention for foreign keys and other constraints
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Initialize SQLAlchemy with metadata
db = SQLAlchemy(metadata=metadata)

# Import models to ensure they're registered with SQLAlchemy and available for migrations
from models.user import User
from models.product import Product
from models.service import Service
from models.cart import Cart
from models.cart_item import CartItem
from models.order import Order
from models.order_product import OrderProduct
from models.order_service import OrderService
from models.service_request import ServiceRequest
from models.product_order import ProductOrder
from models.wishlist_item import WishlistItem

