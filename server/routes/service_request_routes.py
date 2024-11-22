from flask import Blueprint, request, jsonify
from models.service_request import ServiceRequest, db
from flask_jwt_extended import jwt_required, get_jwt_identity

service_request_bp = Blueprint("service_request", __name__)

@service_request_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_service_requests():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    service_requests = ServiceRequest.query.all()
    return jsonify([request.to_dict() for request in service_requests])

@service_request_bp.route("/<int:id>/approve", methods=["PUT"])
@jwt_required()
def approve_service_request(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    service_request = ServiceRequest.query.get_or_404(id)
    service_request.approve()
    db.session.commit()
    return jsonify({"message": "Service request approved"})

@service_request_bp.route("/<int:id>/deny", methods=["PUT"])
@jwt_required()
def deny_service_request(id):
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    service_request = ServiceRequest.query.get_or_404(id)
    service_request.deny()
    db.session.commit()
    return jsonify({"message": "Service request denied"})
