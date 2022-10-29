from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

learningjourney = Blueprint('learningjourneyroute', __name__)
# TO CALL API, USE /learningjourney/<route>
# Replace and change this. This is just dummy data for you to follow the format
@learningjourney.route('/display/')
def route1():
    learningjourney = Learningjourney.query.first()
    array = []
    for item in learningjourney.course:
        array.append(
            item.to_dict()
        )
    return jsonify(
        {   
            "jobrole" : learningjourney.to_dict(),
            "skillassociated": array
        }
    )

@learningjourney.route("/displaymain", methods=['POST'])
def displaymain():
    frontend_input = request.get_json()

    staff_id = frontend_input['staff_id']
    # print("This is from Learning: ",staff_id)
    # Success! 
    learning_journey_database = Learningjourney.query.filter_by(staff_id=staff_id).all()
    result_arr = []

    for item in learning_journey_database:
        result_arr.append(item.to_dict())

    print(learning_journey_database)
    return jsonify(
        {
            "code" : 200,
            "data" : result_arr
        }
    )