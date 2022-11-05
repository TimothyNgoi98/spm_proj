from tabnanny import check
from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

jobrole = Blueprint('jobroleroute', __name__)
# TO CALL API, USE /jobrole/<route>
# Replace and change this. This is just dummy data for you to follow the format
@jobrole.route('/view/alljobroles')
def viewAllJobroles():
    course = Jobrole.query.all()
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


@jobrole.route('/hraddjobrole',methods=['POST'])
def hraddrole():
    print("Hello!")
    data = request.get_json()
    jobrole_name = data['role_name']
    department = data['role_dept']
    jobrole_desc = data['role_desc']
    jobrole_status = data['Active']


    if Jobrole.query.filter_by(jobrole_name=jobrole_name).first():
        return jsonify({
            "code":404,
            "message": "There is an existing Role Name in the Database. Please check your input fields."
        })
    newjobrole = Jobrole( jobrole_name=jobrole_name,department=department,jobrole_desc=jobrole_desc,jobrole_status=jobrole_status)
    try:
        print("adding session")
        db.session.add(newjobrole)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Job role has been added successfully!"
        })
    
    except:
        print("Error")
        return jsonify({
            "code":500,
            "message": "There is error with creating a new jobrole."
        })

@jobrole.route('/updateinformation', methods= ['PUT'])
def updateDescription():
    frontend_input = request.get_json()
    
    print(frontend_input)
    # Inputs from the frontend
    # {"role_id": update, "role_name" : input_name, "department" : input_department, "role_description" : input_description } 
    input_role_id = frontend_input["role_id"]
    input_role_name = frontend_input["role_name"]
    input_department = frontend_input["department"]
    input_role_description = frontend_input["role_description"]
    current_name = frontend_input["current_role_name"]

    # Check Database of the current ID 
    jobrole_database = Jobrole.query.filter_by(jobrole_id=input_role_id).first()
    # Check if there is an existing Role_Name already inside the database
    # Logic: If Role ID is different from the current role_id, if different then flag return
    checked_name = Jobrole.query.filter_by(jobrole_name=input_role_name).first()
    # print(checked_name.to_dict())
    # if None Type is true, means there is no duplicate Name inside
    if checked_name == None or checked_name.jobrole_name == current_name:
        
        jobrole_database.jobrole_name = input_role_name
        jobrole_database.department = input_department
        jobrole_database.jobrole_desc = input_role_description

        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "Message": "Role Information has been updated."
            })
        except:

            return jsonify({
                "code":404,
                "Message": "There is something wrong with updating the database. Please try again."
            })

    else:
        return jsonify({
            "code": 404,
            "Message" : "There is a similar role name in the database, role information is not updated!"
        })



@jobrole.route('view/jobrolesmapped', methods = ['GET'])
def viewJobRolesMapped():
    jobroles = Jobrole.query.all()
    mappedJobroleArray = []
    if jobroles:
        for jobrole in jobroles:
            if not not jobrole.skill:
                jobroleDict = jobrole.to_dict()
                jobroleSkill = []
                for skill in jobrole.skill:
                    jobroleSkill.append(skill.to_dict())
                jobroleDict["skills"] = jobroleSkill
                mappedJobroleArray.append(jobroleDict)

        return jsonify(
            {
                "code": 200,
                "data": {
                    "jobroledetails": mappedJobroleArray
                }
            }
        ), 200
    else:
        return jsonify(
            {
                "code": 404,
                "data": "Error!"
            }
        )

@jobrole.route('/update/<string:jobroleid>', methods = ['POST'])
def updateParticularJobrole(jobroleid):
    data = request.get_json()
    jobrole = Jobrole.query.filter_by(jobrole_id=jobroleid).first()
    if jobrole:
        for item in data:
            skillid = item['skill_id']
            skillFrontend = Skill.query.filter_by(skill_id=skillid).first()
            jobrole.skill.append(skillFrontend)
        db.session.commit()

        array = []
        for skill in jobrole.skill:
            array.append(skill.to_dict())
        
        return jsonify(
            {
                "code": 200,
                "data": {
                    "jobroledetails": jobrole.to_dict(),
                    "skills": array
                }
            }
        ), 200
    
    else:
        return jsonify(
            {
                "code": 404,
                "data": data
            }
        ),200

@jobrole.route('/Viewskills/<string:jobroleid>')
def getSKillsOfParticularJobrole(jobroleid):
    # data = request.get_json()
    jobrole = Jobrole.query.filter_by(jobrole_id=jobroleid).first()
    array = []
    if jobrole:
        for item in jobrole.skill:
            array.append(item.to_dict())
        
        return jsonify(
            {
                "code": 200,
                "data": {
                    "jobroledetails": jobrole.to_dict(),
                    "skills": array
                }
            }
        ), 200
    
    else:
        return jsonify(
            {
                "code": 404,
                "data": 'Jobrole Id not found'
            }
        ),200

@jobrole.route('/removemapping/<string:jobroleid>', methods= ['DELETE'])
def removeSkill(jobroleid):
    data = request.get_json()
    jobroleID = data[0]
    skillID = data[1]
    jobrole = Jobrole.query.filter_by(jobrole_id=jobroleID).first()
    if jobrole:
        skillFrontend = Skill.query.filter_by(skill_id=skillID).first()
        jobrole.skill.remove(skillFrontend)
        db.session.commit()

        array = []
        for skill in jobrole.skill:
            array.append(skill.to_dict())

        return jsonify(
            {
                "code": 200,
                "data": {
                    "jobroledetails": jobrole.to_dict(),
                    "skills": array
                }
            }
        ), 200
    
    else:
        return jsonify(
            {
                "code": 404,
                "data": data
            }
        ),200



@jobrole.route('/jobroleroute')
def route1():
    staff = Jobrole.query.first()
    print(staff)
    #remove when jp push 
    skill1 = Skill(skill_id=1,
        skill_name= "Conflict Management Skill Advanced",
        skill_desc= "Able to handle team and customer conflict effectively.",
        skill_status=1
        )

    skill2 = Skill(skill_id=2,
        skill_name= "Conflict Management Skill Advanced 2",
        skill_desc= "Able to handle team and customer conflict effectively.",
        skill_status=1)

    # Simulate assigning and adding new skills
    staff.skill.append(skill1)
    staff.skill.append(skill2)

    array = []

    for item in staff.skill:
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

# archivejobrole (Comment out after minjay input his shit)
@jobrole.route('/archivejobrole/', methods= ['PUT'])
def archiveSkill():
    # print("Soft Delete Skill Received -----")
    frontend_input = request.get_json()
    print(frontend_input)
    jobrole_id = frontend_input['jobrole_id']
    jobrole_database = Jobrole.query.filter_by(jobrole_id=jobrole_id).first()
    print(jobrole_database)

    if jobrole_database.jobrole_status == "Active":
        jobrole_database.jobrole_status = "Retired"
        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "message": "Jobrole has been changed to Retired."
            })
        except:
            return jsonify({
                "code":404,
                "message": "There has been an error with changing from Active to Retired."
            })

    else:
        jobrole_database.jobrole_status = "Active"
        try:
            db.session.commit()
            return jsonify({
                "code":200,
                "message": "Jobrole has been changed to Active."
            })
        except:
            return jsonify({
                "code":404,
                "message": "There has been an error with changing from Retired to Active."
            })
