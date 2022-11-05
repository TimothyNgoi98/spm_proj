from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration,SkillToCourse

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
    # print("Hello!")
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
            "message": "There is an existing Skill Name in the Database. Please check your input fields."
        })
    newskill = Skill(skill_name=skill_name, skill_desc=skill_desc, skill_status=skill_active)
    try:
        print("adding session")
        db.session.add(newskill)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Skills has been added successfully!"
        })
    except:
        # print("Error")
        return jsonify({
            "code":500,
            "message": "There is error with creating a new skill."
        })

# Created by Yu Xiang, it is used to change the retired field
# TO CALL API, USE /skill/<archiveskill/
@skill.route('/archiveskill/', methods= ['PUT'])
def archiveSkill():
    # print("Soft Delete Skill Received -----")
    frontend_input = request.get_json()
    skill_id = frontend_input['skill_id']
    skill_database = Skill.query.filter_by(skill_id=skill_id).first()

    if skill_database.skill_status == "Active":
        skill_database.skill_status = "Retired"
        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "message": "Skill status has been changed to Retired.\n\nSkill has been moved to archived list."
            })
        except:
            return jsonify({
                "code":404,
                "message": "There has been an error with changing the skill status from Active to Retired. \n\nPlease try again"
            })

    else:
        skill_database.skill_status = "Active"
        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "message": "Skill has been changed to Active."
            })
        except:
            return jsonify({
                "code":404,
                "message": "There has been an error with changing the skill status from Retired to Active."
            })


# Created by Yu Xiang, it is used to change the retired field
# TO CALL API, USE /skill/updatedescription/
@skill.route('/updatedescription/', methods= ['PUT'])
def updateDescription():
    # print("update description works -----")
    frontend_input = request.get_json()

    # Inputs from the frontend
    front_skill_id = frontend_input['skill_id']
    front_skill_name = frontend_input['skill_name']
    front_skill_description = frontend_input['skill_description']
    current_skill_name = frontend_input["current_skill_name"]
    # print("This is Skill Name from frotn End ",front_skill_name)
    # print("This is Skill Description from Front End: ",front_skill_description)

    # Check Database of the current ID 
    skill_database = Skill.query.filter_by(skill_id=front_skill_id).first()

    # Check if there is an existing Skill_Name already inside the database
    # Logic: If Skill ID is different from the current skill_id, if different then flag return
    checking_name = Skill.query.filter_by(skill_name=front_skill_name).first()

    # if None Type is true, means there is no duplicate Name inside
    if checking_name == None or checking_name.skill_name == current_skill_name:
        skill_database.skill_name = front_skill_name
        skill_database.skill_desc = front_skill_description

        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "Message": "Skill Information has been updated."
            })
        except:

            return jsonify({
                "code":404,
                "Message": "There is something wrong with updating the database. Please try again."
            })

    else:
        return jsonify({
            "code": 404,
            "Message" : "There is a similar skill name in the database, Skill Information is not updated!"
        })

# get ALL skill course map
@skill.route('/skilltocourse')
def viewCourseForSkill():
    skilltocourse = SkillToCourse.query.all()
    skilltocoursearray = []

    course = Course.query.all()
    coursearray = []

    skill = Skill.query.all()
    skillarray = []

    # skilltocourse.course.append(course)

    for item in skilltocourse:
        skilltocoursearray.append(item.to_dict())

    for item2 in course:
        coursearray.append(item2.to_dict())

    for item3 in skill:
        skillarray.append(item3.to_dict())

    x = range(len(skilltocoursearray))
    y = range(len(coursearray))
    z = range(len(skillarray))

    for i in x:
        for j in y:
            for k in z:
                if skilltocoursearray[i]["course_id"] == coursearray[j]["course_id"]:
                    skilltocoursearray[i]["course_name"] = coursearray[j]["course_name"]
                    skilltocoursearray[i]["course_desc"] = coursearray[j]["course_desc"]
                    skilltocoursearray[i]["course_status"] = coursearray[j]["course_status"]
                    skilltocoursearray[i]["skill_name"] = skillarray[k]["skill_name"]

    if skilltocourse:
        return jsonify({
            "code": 200,
            "data": skilltocoursearray
            }), 200
    else:
        return jsonify({   
            "code": 404,
            "data": "Error!"
            }),200

# get SPECIFIC skill course map
@skill.route('/skilltocourse/<string:skillid>')
def viewCourseForSpecificSkill(skillid):
    skilltocourse = SkillToCourse.query.filter_by(skill_id =skillid)
    skilltocoursearray = []

    course = Course.query.all()
    coursearray = []

    skill = Skill.query.all()
    skillarray = []

    # skilltocourse.course.append(course)

    for item in skilltocourse:
        skilltocoursearray.append(item.to_dict())

    for item2 in course:
        coursearray.append(item2.to_dict())

    for item3 in skill:
        skillarray.append(item3.to_dict())

    x = range(len(skilltocoursearray))
    y = range(len(coursearray))
    z = range(len(skillarray))

    for i in x:
        for j in y:
            for k in z:
                if skilltocoursearray[i]["course_id"] == coursearray[j]["course_id"]:
                    skilltocoursearray[i]["course_name"] = coursearray[j]["course_name"]
                    skilltocoursearray[i]["course_desc"] = coursearray[j]["course_desc"]
                    skilltocoursearray[i]["course_status"] = coursearray[j]["course_status"]
                    skilltocoursearray[i]["course_category"] = coursearray[j]["course_category"]
                    skilltocoursearray[i]["course_type"] = coursearray[j]["course_type"]
                    skilltocoursearray[i]["skill_name"] = skillarray[k]["skill_name"]

    if skilltocourse:
        return jsonify({
            "code": 200,
            "data": skilltocoursearray
            }), 200
    else:
        return jsonify({   
            "code": 404,
            "data": "Error!"
            }),200

# # get specific skill course map
# @skill.route('/skilltocourse/<string:skillid>')
# def viewCourseForSpecificSkill(skillid):
#     skilltocourse = SkillToCourse.query.filter_by(skill_id =skillid)
#     skilltocoursearray = []

#     course = Course.query.all()
#     coursearray = []

#     for item in skilltocourse:
#         skilltocoursearray.append(item.to_dict())

#     for item2 in course:
#         coursearray.append(item2.to_dict())

#     x = range(len(skilltocoursearray))
#     y = range(len(coursearray))
#     for i in x:
#         for j in y:
#             if skilltocoursearray[i]["course_id"] == coursearray[j]["course_id"]:
#                 skilltocoursearray[i]["course_name"] = coursearray[j]["course_name"]
#                 skilltocoursearray[i]["course_desc"] = coursearray[j]["course_desc"]
#                 skilltocoursearray[i]["course_status"] = coursearray[j]["course_status"]

#     if skilltocourse:
#         return jsonify({
#             "code": 200,
#             "data": skilltocoursearray
#             }), 200
#     else:
#         return jsonify({   
#             "code": 404,
#             "data": "Error!"
#             }),200






