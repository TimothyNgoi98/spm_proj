from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration, skill_to_course

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
    array = []
    for item in course.skill:
        array.append(item.to_dict())


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

@course.route('/view/coursesmapped')
def viewCoursesMapped():
    courses = Course.query.all()
    mappedCourseArray = []
    for course in courses:
        if not not course.skill:
            courseDict = course.to_dict()
            course_skill = []
            for skill in course.skill:
                course_skill.append(skill.to_dict())
            courseDict['skills'] = course_skill
                # if skill not in courseDict:
                #     courseDict['skills'] = [skill.to_dict()]
                # else:
                #     courseDict['skills'].append(skill.to_dict())
            mappedCourseArray.append(courseDict)

    return jsonify(
        {   
            "code": 200,
            "data": {
                "coursedetails": mappedCourseArray,
            }

        }
    ),200

    # else:
    #     return jsonify(
    #         {   
    #             "code": 404,
    #             "data": "Error!"
    #         }
    #     ),200





@course.route('/update/<string:courseid>', methods=['POST'])
def UpdateParticularCourse(courseid):
    # Get relevant post request
    data = request.get_json()
    # Testing purposes
    # return data[0]

    # print(data)
    course = Course.query.filter_by(course_id=courseid).first()
    if course:
        for item in data:
            # Find the skill and append it to course
            skillid = item['skill_id']
            skillFrontend = Skill.query.filter_by(skill_id=skillid).first()
            course.skill.append(skillFrontend)

        # Initialise a data array
        array = []

        for skill in course.skill:
            array.append(
                skill.to_dict()
            )
        db.session.commit()


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
                "data": data
            }
        ),200