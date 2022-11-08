from flask import Flask
from ljapi.routes.courseroute import viewAllCourse
from ljapi.application import create_app
from ljapi.models import db,Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
from flask_cors import CORS
import json
def test_learningjourney_displaymain(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "learningjourney/displaymain"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        # Create learning journey instance
        mock_data = {"staff_id":130001}
        print(mock_data)
        response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]) == list
        assert response.status_code == 200

def test_learningjourney_jobrole_name(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
    url = "learningjourney/jobrole_name"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    mock_data = {"jobrole":1}
    print(mock_data)
    response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    print(data)
    assert type(data["data"]) == dict
    assert response.status_code == 200

def test_learningjourney_viewcourselearningjourney(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
    url = "learningjourney/viewcourselearningjourney"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    newlearningjourney = Learningjourney(learningjourney_id=1001, staff_id=130001,jobrole_id=1,is_active='Active')
    db.session.add(newlearningjourney)
    db.session.commit()

    mock_data = {"jobroleid":1 , "learningjourneyid": 1001, "staff_id":13001}
    print(mock_data)
    response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    print(data)
    print("I AM DELETED")
    db.session.delete(newlearningjourney)
    db.session.commit()
    assert type(data["data"]) == list
    assert response.status_code == 200

def test_learningjourney_deletecoursesinlearningjourney(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
    url = "learningjourney/deletecoursesinlearningjourney"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    mock_data = {'course_id':'COR001', 'learning_journey_id':1001}
    newlearningjourney = Learningjourney(learningjourney_id=1001, staff_id=130001,jobrole_id=1,is_active='Active')
    newCourse = Course.query.filter_by(course_id='COR001').first()
    db.session.add(newlearningjourney)
    newlearningjourney.course.append(newCourse)
    db.session.commit()
    response = test_client.delete(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    print(data)
    db.session.delete(newlearningjourney)
    db.session.commit()
    assert data["data"]== "Delete is successful!"
    assert response.status_code == 200

def test_learningjourney_addingcoursesinlearningjourney(test_client):
    url = "learningjourney/addingcoursesinlearningjourney"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    coursesdictionary = [{'course_id': 'COR001','course_name': "Systems Thinking and Design","course_desc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',"course_status":'Active', 'course_type': 'Internal', 'course_category': 'Core'}]
    mock_data = {'staff_id':'130001', 'jobrole_id': 1, 'is_active': 'Testing', 'coursemapped':coursesdictionary}
    # newlearningjourney = Learningjourney.query.filter_by.(is_active="(staff_id=130001,jobrole_id=1,is_active='Testing')
    response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    print(data)
    newlearningjourney = Learningjourney.query.filter_by(is_active="Testing").first()
    newlearningjourney.course = []
    db.session.commit()
    db.session.delete(newlearningjourney)
    db.session.commit()
    assert data["data"]== "Adding Course to Learning Journey is successful!"
    assert response.status_code == 200

def test_learningjourney_viewcoursesinjobrole(test_client):
    url = "learningjourney/viewcoursesinjobrole"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    coursesdictionary = [{'course_id': 'COR001','course_name': "Systems Thinking and Design","course_desc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',"course_status":'Active', 'course_type': 'Internal', 'course_category': 'Core'}]
    mock_data = {"jobrole_id": 1, "course_saved": coursesdictionary}
    response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    assert type(data["data"]) == list
    assert response.status_code == 200
    
def test_learningjourney_addcoursesinexistinglj(test_client):
    url = "learningjourney/addcoursesinexistinglj"
    mock_headers =  {
    'Content-Type': 'application/json'
    }
    newlearningjourney = Learningjourney(learningjourney_id=1001,staff_id=130001,jobrole_id=1,is_active='Testing')
    db.session.add(newlearningjourney)
    db.session.commit()
    mock_data = {'course_id':'COR001','learning_journey_id': 1001}
    response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
    data = json.loads(response.get_data(as_text=True))
    newlearningjourney.course = []
    db.session.commit()
    db.session.delete(newlearningjourney)
    db.session.commit()
    assert data["data"] == "Add Skill to learning journey is successful!"
    assert response.status_code == 200



# def test_learningjourney_deletecoursesinlearningjourney(test_client):
# # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#     url = "learningjourney/deletecoursesinlearningjourney"
#     mock_headers =  {
#     'Content-Type': 'application/json'
#     }
#     mock_data = {'course_id':'COR001', 'learning_journey_id':1001}

# def test_jobrole_hraddjobrole(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = "jobrole/hraddjobrole"
#         mock_headers =  {
#         'Content-Type': 'application/json'
#         }
#         mock_data = {"role_name": "role_name1", "role_dept":  "role_dept", "role_desc": "role_desc", "Active": "active"}
#         print(mock_data)
#         response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         assert data["message"] == "Job role has been added successfully!"
#         assert response.status_code == 200
#         # Prevent test case being created in the db
#         jobroletesting = Jobrole.query.filter_by(jobrole_name=mock_data['role_name']).first()
#         db.session.delete(jobroletesting)
#         db.session.commit()

# def test_jobrole_updateinformation(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = "jobrole/updateinformation"
#         mock_headers =  {
#         'Content-Type': 'application/json'
#         }
#         mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
#         db.session.add(mockJobrole)
#         db.session.commit()
#         mock_data_update = {"role_id": 100, "role_name" : "input_name", "department" : "input_department", "role_description" : "input_description","current_role_name":"input_name"}        
#         responseupdate= test_client.put(url,data=json.dumps(mock_data_update),headers=mock_headers)
#         data = json.loads(responseupdate.get_data(as_text=True))
#         print(data)
#         db.session.delete(mockJobrole)
#         db.session.commit()
#         assert data["Message"] == "Role Information has been updated."
#         assert responseupdate.status_code == 200

# def test_jobrole_view_jobrolesmapped(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = '/jobrole/view/jobrolesmapped'
#         response = test_client.get(url)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         assert type(data["data"]["jobroledetails"]) == list
#         assert response.status_code == 200

# def test_course_update_particular_course(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = "jobrole/update/100"
#         mock_headers =  {
#         'Content-Type': 'application/json'
#         }
#         mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
#         db.session.add(mockJobrole)
#         db.session.commit()
#         mock_data = [{'skill_id': 4, 'skill_name': 'Conflict Management Skill', 'skill_desc': 'Able to handle team and customer conflict effectively.', 'skill_status': 'Retired '}]
#         print(mock_data)
#         response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         db.session.delete(mockJobrole)
#         db.session.commit() 
#         assert type(data["data"]["jobroledetails"]) == dict
#         assert type(data["data"]["skills"]) == list
#         assert response.status_code == 200      

# def test_jobrole_viewskills_jobroleid(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = '/jobrole/Viewskills/100'
#         mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
#         db.session.add(mockJobrole)
#         db.session.commit()
#         response = test_client.get(url)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         db.session.delete(mockJobrole)
#         db.session.commit() 
#         assert type(data["data"]["jobroledetails"]) == dict
#         assert type(data["data"]["skills"]) == list
#         assert response.status_code == 200      

# def test_jobrole_removemapping_jobroleid(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = '/jobrole/Viewskills/100'
#         mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
#         db.session.add(mockJobrole)
#         db.session.commit()
#         response = test_client.get(url)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         db.session.delete(mockJobrole)
#         db.session.commit() 
#         assert type(data["data"]["jobroledetails"]) == dict
#         assert type(data["data"]["skills"]) == list
#         assert response.status_code == 200      

# def test_jobrole_jobrole(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         url = '/jobrole/jobrole/'
#         response = test_client.get(url)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         assert type(data["data"]) == list
#         assert response.status_code == 200

# def test_jobrole_archive(test_client):
#     # app = create_app()
#     # print(app)
#     # Creating a test client based on the Flask application
#         mock_headers =  {
#         'Content-Type': 'application/json'
#         }
#         url = '/jobrole/archivejobrole'
#         mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
#         mockdata = {"jobrole_id": 100}
#         db.session.add(mockJobrole)
#         db.session.commit()
#         response = test_client.put(url,data=json.dumps(mockdata),headers=mock_headers)
#         data = json.loads(response.get_data(as_text=True))
#         print(data)
#         db.session.delete(mockJobrole)
#         db.session.commit() 
#         assert data["message"] == "Role status has been changed to Retired. \n\nRole has been moved to archived list."
#         assert response.status_code == 200

        