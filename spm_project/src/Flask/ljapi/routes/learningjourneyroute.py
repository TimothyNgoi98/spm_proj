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

@learningjourney.route("/jobrole_name", methods=['POST'])
def displayjobname():
    frontend_input = request.get_json()

    jobrole_id = frontend_input['jobrole']
    print("This is the jobrole id", jobrole_id)
    # print("This is from Learning: ",staff_id)
    # Success! 
    jobroledatabase = Jobrole.query.filter_by(jobrole_id=jobrole_id).first().to_dict()

    return jsonify(
        {
            "code" : 200,
            "data" : jobroledatabase
        }
    )


@learningjourney.route("/viewcourselearningjourney", methods=['POST'])
def viewcourselearningjourney():
    frontend_input = request.get_json()

    jobrole_id = frontend_input['jobroleid']
    learningjourney_id = frontend_input['learningjourneyid']
    # print("This is from Learning: ",staff_id)
    # Success! 
    jobroledatabase = Learningjourney.query.filter_by(learningjourney_id=learningjourney_id)
    jobroledatabase.course
    print("This is the jobroledatabase", jobroledatabase.courses)

    return jsonify(
        {
            "code" : 200,
            "data" : jobroledatabase
        }
    )