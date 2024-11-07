from flask import Blueprint, request, jsonify
from models.service import Service, db
from flask_jwt_extended import jwt_required, get_jwt_identity

service_bp = Blueprint("service", __name__)

@service_bp.route("/", methods=["GET"])
def get_all_services():
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services])

@service_bp.route("/<int:id>", methods=["GET"])
def get_service(id):
    service = Service.query.get_or_404(id)
    return jsonify(service.to_dict())

@service_bp.route("/", methods=["POST"])
@jwt_required()
def create_service():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    data = request.get_json()
    new_service = Service(
        name=data["name"], 
        description=data["description"], 
        price=data["price"]
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify(new_service.to_dict()), 201

@service_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_service(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    service = Service.query.get_or_404(id)
    data = request.get_json()
    service.name = data.get("name", service.name)
    service.description = data.get("description", service.description)
    service.price = data.get("price", service.price)
    db.session.commit()
    return jsonify(service.to_dict())

@service_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_service(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service deleted"})

