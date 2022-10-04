"""
application.py
- creates a Flask app instance and registers the database object
"""

from flask import Flask
from flask_cors import CORS

def create_app(app_name='LJ_API'):
    app = Flask(app_name)
    CORS(app)
    app.config.from_object('ljapi.config.BaseConfig')

    from ljapi.api import api
    app.register_blueprint(api, url_prefix="/api")

    # courseroute
    from ljapi.routes.courseroute import course
    app.register_blueprint(course,url_prefix="/course")

    # jobroleroute
    from ljapi.routes.jobroleroute import jobrole
    app.register_blueprint(jobrole,url_prefix="/jobrole")

    # learningjourneyroute
    from ljapi.routes.learningjourneyroute import learningjourney
    app.register_blueprint(learningjourney,url_prefix="/learningjourney")

    # loginroute
    from ljapi.routes.loginroute import login
    app.register_blueprint(login,url_prefix="/login")

    # registrationroute
    from ljapi.routes.registrationroute import registration
    app.register_blueprint(registration,url_prefix="/registration")

    # roleroute
    from ljapi.routes.roleroute import role
    app.register_blueprint(role,url_prefix="/role")

    # skillroute
    from ljapi.routes.skillroute import skill
    app.register_blueprint(skill,url_prefix="/skill")

    # staffroute
    from ljapi.routes.staffroute import staff
    app.register_blueprint(staff,url_prefix="/skill")



    # from ljapi.api import role
    # app.register_blueprint(role, url_prefix="/api")
    
    from ljapi.models import db
    db.init_app(app)

    return app

