from flask import Blueprint, request, jsonify
from models.service import Service
from config import db

service_blueprint = Blueprint('service_controller', __name__)

@service_blueprint.route('/add', methods=['POST'])
def add_service():
    data = request.get_json()
    new_service = Service(name=data['name'], description=data['description'], price=data['price'])
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Service added successfully"}), 201
