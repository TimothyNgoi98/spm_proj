from flask import Flask
from ljapi.routes.courseroute import viewAllCourse
from ljapi.application import create_app
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
from flask_cors import CORS
import json
def test_course_view_all_course(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/course/view/all'
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]) == list
        assert response.status_code == 200


def test_course_view_particular_course(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = '/course/view/COR001'
        response = test_client.get(url)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]["coursedetails"]) == dict
        assert type(data["data"]["skills"]) == list
        assert response.status_code == 200

def test_course_update_particular_course(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "course/update/COR001"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        mock_data = [{'skill_id': 3, 'skill_name': 'Conflict Management Skill', 'skill_desc': 'Able to handle team and customer conflict effectively.', 'skill_status': 'Retired '}]
        print(mock_data)
        response = test_client.post(url,data=json.dumps(mock_data),headers=mock_headers)
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]["coursedetails"]) == dict
        assert response.status_code == 200

def test_course_delete_particular_route(test_client):
    # app = create_app()
    # print(app)
    # Creating a test client based on the Flask application
        url = "course/removemapping/COR001"
        mock_headers =  {
        'Content-Type': 'application/json'
        }
        mock_data_post= [{'skill_id': 4}]
        mock_data_delete = ["COR001",4]
        # Post then delete 
        responsepost = test_client.post("course/update/COR001",data=json.dumps(mock_data_post),headers=mock_headers)
        responsedelete = test_client.delete(url,data=json.dumps(mock_data_delete),headers=mock_headers)
        data = json.loads(responsedelete.get_data(as_text=True))
        assert type(data["data"]["coursedetails"]) == dict
        assert responsedelete.status_code == 200


        