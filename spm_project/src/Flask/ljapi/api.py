"""
api.py
- provides the API endpoints for consuming and producing
REST requests and responses
"""
from flask import Blueprint, jsonify, request
from sqlalchemy import true
from .models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration
from flask import Flask
from flask_cors import CORS

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
        role= server_side['role']
        server_role_query = Role.query.filter_by(role_id=role).first().to_dict()

        server_role_query = server_role_query['role_name'].rstrip("\r")  

        if int(received_id) == int(server_id):
            return jsonify({
                "code":200,
                "message" : "Login is successful",
                "data": server_side,
                "role": server_role_query
            })
        
        else:
            return jsonify({
                "code":404,
                "message": "Password is wrong.",
                "receivedid": received_id,
                "serverid": server_id
            })
# End of Authentication Function

# Viewing of Skills 
# Created by: Song Yu Xiang 
@api.route("/viewskills", methods=['GET'])
def viewskills():
    skills = Skill.query.all()

    print(type(skills))

    result_list = []

    for element in skills:
        result_list.append(element.to_dict())

    print(result_list)
    
    return jsonify({
        "data":result_list
    })

# End of Viewing of Skills 


# Weiting's Edits - DONT delete first 

@api.route('/jobrole')
def getjobroles():
    jobroles = Jobrole.query.all()
    return jsonify(
        {
            "data": [jobrole.to_dict() for jobrole in jobroles]
        }
    )

@api.route('/jobroleroute')
def getjobroletoskills():
    jobroletoskills = Jobrole.query.all()
    return jsonify(
        {
            "data": [jobrole.to_dict() for jobrole in jobroles]
        }
    )

@api.route("/allcourse", methods=['GET'])
def allcourse():
    allcourse = Course.query.all()

    print(type(allcourse))

    result = []

    for element in allcourse:
        result.append(element.to_dict())

    return jsonify({
        "data":result
    })
