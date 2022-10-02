"""
api.py
- provides the API endpoints for consuming and producing
REST requests and responses
"""
from flask import Blueprint, jsonify, request
from .models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration


api = Blueprint('api', __name__)

@api.route('/role/')
def surveys():
    roles = Registration.query.all()

    return jsonify(
        {
            "data": [role.to_dict() for role in roles]
        }
    )
