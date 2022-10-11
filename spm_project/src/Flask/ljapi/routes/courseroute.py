from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

course = Blueprint('courseroute', __name__)
# TO CALL API, USE /course/<route>
# Replace and change this. This is just dummy data for you to follow the format

@course.route('/view/all')
def viewAllCourse():
    course = Course.query.all()
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


@course.route('/view/<string:courseid>')
def viewParticularCourse(courseid):
    course = Course.query.filter_by(course_id=courseid).first()

    if course:

        array = []

        for item in course.skill:
            array.append(
                item.to_dict()
            )
            
        return jsonify(
            {   
                "code": 200,
                "data": {
                    "coursedetails": course.to_dict(),
                    # .skill is referencing the backref from class Skill
                    "skills": array
                }
            }
        ),200

    else:
        return jsonify(
            {   
                "code": 404,
                "data": "Particular Course Not FOUND!"
            }
        ),200


@course.route('/update/<string:courseid>', methods=['POST'])
def UpdateParticularCourse(courseid):
    # Get relevant post request
    data = request.json['body']
    

    print(data)
    # course = Course.query.filter_by(course_id=courseid).first()

    # if course:
    #     return jsonify(
    #         {   
    #             "code": 200,
    #             "data": {
    #                 "coursedetails": course.to_dict(),
    #                 # .skill is referencing the backref from class Skill
    #                 "skills": course.skill
    #             }
    #         }
    #     ),200

    # else:
    return jsonify(
        {   
            "code": 404,
            "data": data
        }
    ),200