from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

role= Blueprint('roleroute', __name__)
# TO CALL API, USE /role/<route>Z
# Replace and change this. This is just dummy data for you to follow the format
@role.route('/displayroles/')
def viewAllRoles():
    course = Role.query.all()
    coursearray = []
    for item in course:
        coursearray.append(
        item.to_dict()
    )

    if course:
        return jsonify(
            {   
                "code": 200,
                "data": coursearray
            }
        ),200

    else:
        return jsonify(
            {   
                "code": 404,
                "data": "Error!"
            }
        ),200