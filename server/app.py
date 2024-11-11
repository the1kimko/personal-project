from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from routes import register_blueprints
from models import db
import os
#from sqlalchemy.exc import SQLAlchemyError

# Initialize the Flask app
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vetty.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['JWT_SECRET_KEY'] = 'your_secret_key'

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_secret_key')

# Initialize database and migration
#db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)

# Initialize JWT manager
jwt = JWTManager(app)

# Register blueprints
register_blueprints(app)

# Error handling
# @app.errorhandler(SQLAlchemyError)
# def handle_database_error(error):
#     db.session.rollback()
#     return jsonify({'message': 'Database error occurred'}), 500

# @app.errorhandler(404)
# def handle_not_found(error):
#     return jsonify({'message': 'Resource not found'}), 404

# @app.errorhandler(403)
# def handle_forbidden(error):
#     return jsonify({'message': 'Forbidden'}), 403

# @app.errorhandler(401)
# def handle_unauthorized(error):
#     return jsonify({'message': 'Unauthorized'}), 401

if __name__ == "__main__":
    app.run(port=5555, debug=True)