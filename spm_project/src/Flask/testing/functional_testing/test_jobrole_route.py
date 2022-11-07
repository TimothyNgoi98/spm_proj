from flask import Flask
from ljapi.routes.courseroute import viewAllCourse
from ljapi.application import create_app
from ljapi.models import db,Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
from flask_cors import CORS
import json
def test_course_view_all_jobroles(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/jobrole/view/alljobroles'
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]) == list
        assert response.status_code == 200

def test_jobrole_hraddjobrole(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "jobrole/hraddjobrole"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        mock_data = {"role_name": "role_name1", "role_dept":  "role_dept", "role_desc": "role_desc", "Active": "active"}
        print(mock_data)
        response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert data["message"] == "Job role has been added successfully!"
        assert response.status_code == 200
        # Prevent test case being created in the db
        jobroletesting = Jobrole.query.filter_by(jobrole_name=mock_data['role_name']).first()
        db.session.delete(jobroletesting)
        db.session.commit()

def test_jobrole_updateinformation(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "jobrole/updateinformation"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
        db.session.add(mockJobrole)
        db.session.commit()
        mock_data_update = {"role_id": 100, "role_name" : "input_name", "department" : "input_department", "role_description" : "input_description","current_role_name":"input_name"}        
        responseupdate= test_client.put(url,data=json.dumps(mock_data_update),headers=mock_headers)
        data = json.loads(responseupdate.get_data(as_text=True))
        print(data)
        db.session.delete(mockJobrole)
        db.session.commit()
        assert data["Message"] == "Role Information has been updated."
        assert responseupdate.status_code == 200

def test_jobrole_view_jobrolesmapped(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/jobrole/view/jobrolesmapped'
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]["jobroledetails"]) == list
        assert response.status_code == 200

def test_course_update_particular_course(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "jobrole/update/100"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
        db.session.add(mockJobrole)
        db.session.commit()
        mock_data = [{'skill_id': 4, 'skill_name': 'Conflict Management Skill', 'skill_desc': 'Able to handle team and customer conflict effectively.', 'skill_status': 'Retired '}]
        print(mock_data)
        response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        db.session.delete(mockJobrole)
        db.session.commit() 
        assert type(data["data"]["jobroledetails"]) == dict
        assert type(data["data"]["skills"]) == list
        assert response.status_code == 200      

def test_jobrole_viewskills_jobroleid(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/jobrole/Viewskills/100'
        mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
        db.session.add(mockJobrole)
        db.session.commit()
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        db.session.delete(mockJobrole)
        db.session.commit() 
        assert type(data["data"]["jobroledetails"]) == dict
        assert type(data["data"]["skills"]) == list
        assert response.status_code == 200      

def test_jobrole_removemapping_jobroleid(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/jobrole/Viewskills/100'
        mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
        db.session.add(mockJobrole)
        db.session.commit()
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        db.session.delete(mockJobrole)
        db.session.commit() 
        assert type(data["data"]["jobroledetails"]) == dict
        assert type(data["data"]["skills"]) == list
        assert response.status_code == 200      

def test_jobrole_jobrole(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/jobrole/jobrole/'
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]) == list
        assert response.status_code == 200

def test_jobrole_archive(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        url = '/jobrole/archivejobrole'
        mockJobrole = Jobrole(jobrole_id=100,jobrole_name="role_name1",department="test",jobrole_desc="testing desc", jobrole_status="Active")
        mockdata = {"jobrole_id": 100}
        db.session.add(mockJobrole)
        db.session.commit()
        response = test_client.put(url,data=json.dumps(mockdata),headers=mock_headers)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        db.session.delete(mockJobrole)
        db.session.commit() 
        assert data["message"] == "Role status has been changed to Retired. \n\nRole has been moved to archived list."
        assert response.status_code == 200

        