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
    print("Hello!")
    data = request.get_json()
    # const result = {"skill_name": skill_name, "skill_desc": skill_desc, "active": activity}
    # print(data['skill_name'])
    # print(data['skill_desc'])
    # print(data['active'])
    skill_name = data['skill_name']
    skill_desc = data['skill_desc']
    skill_active = data['active']

    if Skill.query.filter_by(skill_name=skill_name).first():
        return jsonify({
            "code":404,
            "message": "There exist such a Skill Name in the Database. Please check your input fields."
        })
    heehaw = Skill(skill_name=skill_name, skill_desc=skill_desc, skill_status=skill_active)
    try:
        print("adding session")
        db.session.add(heehaw)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Skills has been added successfully!"
        })
    except:
        print("Error")
        return jsonify({
            "code":500,
            "message": "There is error with creating a new skill."
        })

# Created by Yu Xiang, it is used to change the retired field
# TO CALL API, USE /skill/<archiveskill/
@skill.route('/archiveskill/', methods= ['PUT'])
def archiveSkill():
    frontend_input = request.get_json()
    # skill_database = Skill.query.filter_by(skill_id=skill_name)

    return {}
