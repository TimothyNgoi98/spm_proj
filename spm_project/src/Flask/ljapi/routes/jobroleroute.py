from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

jobrole = Blueprint('jobroleroute', __name__)
# TO CALL API, USE /jobrole/<route>
# Replace and change this. This is just dummy data for you to follow the format
@jobrole.route('/jobroleroute/')
def route1():
    staff = Jobrole.query.first()
    #remove when jp push 
    skill1 = Skill(skill_id=4,skill_name= "Conflict Management Skill Advanced",skill_desc= "Able to handle team and customer conflict effectively.",skill_status=1)
    skill2 = Skill(skill_id=5,skill_name= "Conflict Management Skill Advanced 2",skill_desc= "Able to handle team and customer conflict effectively.",skill_status=1)
    # Simulate assigning and adding new skills
    staff.skills.append(skill1)
    staff.skills.append(skill2)

    
    array = []

    for item in staff.skills:
        array.append(
            item.to_dict()
        )
        

    return jsonify(
        {   
            "jobrole" : staff.to_dict(),
            "skillassociated": array
        }
    )


@jobrole.route('/jobrole/')
def route2():
    jobroles = Jobrole.query.all()
    return jsonify(
        {
            "data": [jobrole.to_dict() for jobrole in jobroles]
        }
    )


