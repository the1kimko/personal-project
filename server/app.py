from flask import Flask
from flask_migrate import Migrate
from models import db
from flask_jwt_extended import JWTManager
from routes import register_blueprints
import os

# Initialize the Flask app
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vetty.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)

# Initialize JWT manager
jwt = JWTManager(app)

# Register blueprints
register_blueprints(app)

# Print all registered routes
for rule in app.url_map.iter_rules():
    print(f"Route: {rule} - Endpoint: {rule.endpoint}")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
