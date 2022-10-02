from tokenize import blank_re
from flask import Flask,request,jsonify,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
# For MAC
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/book'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialisation of the db
db = SQLAlchemy(app)
CORS(app)




if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)