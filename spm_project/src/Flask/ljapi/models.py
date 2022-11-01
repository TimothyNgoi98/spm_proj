# from tokenize import blank_re
# from flask import Flask,request,jsonify,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# import json

# app = Flask(__name__)
# # For MAC
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/book'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/shoe'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Initialisation of the db
db = SQLAlchemy()
CORS()


# ======= Association table ========
# Association table Skills to course (Apparently have to put this infront first)
skill_to_course = db.Table('skill_to_course',
    db.Column('skill_id',db.Integer,db.ForeignKey('skill.skill_id')),
    db.Column('course_id',db.String(20),db.ForeignKey('course.course_id'))
)

# Association table job role to skill
job_role_to_skill = db.Table('job_role_to_skill',
    db.Column('skill_id',db.Integer,db.ForeignKey('skill.skill_id')),
    db.Column('jobrole_id',db.Integer,db.ForeignKey('job_role.jobrole_id'))
)

# Multivalue table for course_id in learningjourney
learning_journey_detailed = db.Table('learning_journey_detailed',
    db.Column('learningjourney_id',db.Integer,db.ForeignKey('learning_journey.learningjourney_id')),
    db.Column('course_id',db.String(20),db.ForeignKey('course.course_id'))
)


# ======= Base Table only PK ========
# class Role (From the LMS side)
class Role(db.Model):
    __tablename__="role"
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(20), nullable=False)
    # Specify the one to many relationship of  the staff

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


    # def json(self):
    #     return {"role_id": self.role_id, "role_name": self.role_name}

# Class Jobrole (LJPS)
class Jobrole(db.Model):
    __tablename__="job_role"
    jobrole_id = db.Column(db.Integer, primary_key=True)
    jobrole_name = db.Column(db.String(20), nullable=False)
    jobrole_desc = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(50),nullable=False)
    jobrole_status = db.Column(db.String(15), nullable=False)

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result

# Class Course LMS
class Course(db.Model):
    __tablename__="course"
    course_id = db.Column(db.String(20), primary_key=True)
    course_name = db.Column(db.String(50), nullable=False)
    course_desc = db.Column(db.String(255), nullable=False)
    course_status = db.Column(db.String(15), nullable=False)
    course_type = db.Column(db.String(10), nullable=False)
    course_category = db.Column(db.String(50), nullable=False)
    registrations = db.relationship('Registration', backref='course',lazy="select", uselist=False)
    learning_journey_detailed = db.relationship('Learningjourney',secondary="learning_journey_detailed",backref="course")

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result

# Class Skill
class Skill(db.Model):
    __tablename__= "skill"
    skill_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50), nullable=False)
    skill_desc = db.Column(db.String(255), nullable=False)
    skill_status = db.Column(db.String(15), nullable=False)
    skills_to_course = db.relationship('Course', secondary="skill_to_course",backref="skill")
    skills_to_jobrole = db.relationship('Jobrole', secondary="job_role_to_skill", backref ="skill")

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


# ======= Tables with PK but also with FK ========

# Class Staff
class Staff(db.Model):
    __tablename__= "staff"
    staff_id = db.Column(db.Integer, primary_key=True)
    staff_fname = db.Column(db.String(50), nullable=False)
    staff_lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    role = db.Column(db.Integer, db.ForeignKey("role.role_id"))
    registrations = db.relationship('Registration', backref='staff',lazy="select", uselist=False)
    learningjourneys = db.relationship('Learningjourney',backref='staff')

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result

# Class Learning Journey
class Learningjourney(db.Model):
    __tablename__= "learning_journey"
    learningjourney_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey("staff.staff_id"))
    jobrole_id = db.Column(db.Integer, db.ForeignKey("job_role.jobrole_id"))
    is_active = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


# Class Registration
class Registration(db.Model):
    __tablename__= "registration"
    reg_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.String(20), db.ForeignKey("course.course_id"))
    staff_id = db.Column(db.Integer,db.ForeignKey("staff.staff_id"))
    reg_status = db.Column(db.String(20), nullable=False)
    completion_status = db.Column(db.String(20), nullable=False)
    
    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result

# ======= Tables with both FK  ========
# Class SkillToCourse
class SkillToCourse(db.Model):
    __tablename__= "skill_to_course"
    __table_args__ = {'extend_existing': True}
    skill_id = db.Column(db.Integer, db.ForeignKey("skill.skill_id"), primary_key=True)
    course_id = db.Column(db.String(20), db.ForeignKey("course.course_id"), primary_key=True)
    
    # Need to account for the foreign keys here
    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result