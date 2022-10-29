from flask import Flask
from ljapi.routes.courseroute import viewAllCourse
from ljapi.application import create_app
from flask_cors import CORS
import json
def test_course_view_all_route():
    app = create_app()
    print(app)
    # Creating a test client based on the Flask application
    with app.test_client() as test_client:
        response = test_client.get("http://127.0.0.1:5000/course/view/all")
        data = json.loads(response.get_data(as_text=True))
        print(data)
        assert type(data["data"]) == list
        assert response.status_code == 200


