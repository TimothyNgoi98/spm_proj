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

# Purpose of Function: Authentication
# Created by: Yu Xiang
@api.route("/signin/<string:LoginID>", methods=['POST'])
def signin(LoginID):
    if not Staff.query.filter_by(staff_id=LoginID).first():
        return jsonify({
            "code":404,
            "message": "There is no such Account, you have to log in first."
        })
    else:
        # Getting the data from the user request
        data = request.get_json()
        print(data)
        received_id = data['login']
        print(received_id)

        # Getting from the server side

        server_side = Staff.query.filter_by(staff_id=LoginID).first().to_dict()
        print(server_side)

        server_id = server_side['staff_id']

        # Get the Role name as well. 
        role_id = server_side['role_id']
        server_role_query = Role.query.filter_by(role_id=role_id).first().to_dict()

        if received_id == server_id:
            return jsonify({
                "code":200,
                "message" : "Login is successful",
                "data": server_side,
                "role": server_role_query
            })
        
        else:
            return jsonify({
                "code":404,
                "message": "Password is wrong."
            })
# End of Authentication Function


