"""
config.py
- settings for the flask application object
"""

class BaseConfig(object):
    DEBUG = True
    # Windows: 
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root@localhost:3306/spm_project'
    # MacBook Configurations: 
    # SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:root@localhost:3306/spm_project'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # used for encryption and session management
    # SECRET_KEY = 'mysecretkey'
