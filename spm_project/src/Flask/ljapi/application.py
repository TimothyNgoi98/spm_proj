"""
application.py
- creates a Flask app instance and registers the database object
"""

from flask import Flask

def create_app(app_name='LJ_API'):
    app = Flask(app_name)
    app.config.from_object('ljapi.config.BaseConfig')

    from ljapi.api import api
    app.register_blueprint(api, url_prefix="/api")

    from ljapi.api import role
    app.register_blueprint(role, url_prefix="/api")
    
    from ljapi.models import db
    db.init_app(app)

    return app