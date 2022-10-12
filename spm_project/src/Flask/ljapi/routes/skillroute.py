from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

skill = Blueprint('skillroute', __name__)
# TO CALL API, USE /skill/<route>
# Replace and change this. This is just dummy data for you to follow the format
@skill.route('/display/')
def viewAllSkill():
    course = Skill.query.all()
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

# Created by Yu Xiang, It is used to Add Skills
# TO CALL API, USE /skill/<hraddskills/
@skill.route('/hraddskills/', methods= ['POST'])
def hraddskills():
    data = request.get_json()
    print(data)

