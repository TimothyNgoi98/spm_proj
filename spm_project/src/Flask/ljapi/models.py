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
    db.Column('course_id',db.Integer,db.ForeignKey('course.course_id'))
)

# Association table job role to skill
job_role_to_skill = db.Table('job_role_to_skill',
    db.Column('skill_id',db.Integer,db.ForeignKey('skill.skill_id')),
    db.Column('jobrole_id',db.Integer,db.ForeignKey('job_role.jobrole_id'))
)

# Multivalue table for course_id in learningjourney
learning_journey_detailed = db.Table('learning_journey_detailed',
    db.Column('learningjourney_id',db.Integer,db.ForeignKey('learning_journey.learningjourney_id')),
    db.Column('course_id',db.Integer,db.ForeignKey('course.course_id'))
)


# ======= Base Table only PK ========
# class Role (From the LMS side)
class Role(db.Model):
    __tablename__="role"
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(100), nullable=False)
    # Specify the one to many relationship of  the staff
    staffs = db.relationship('Staff',backref="role")


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
    jobrole_name = db.Column(db.String(100), nullable=False)
    jobrole_desc = db.Column(db.String(100), nullable=False)
    skills = db.relationship('Skill',secondary="job_role_to_skill", backref="jobrole" ,lazy="select")
    learningjourneys = db.relationship('Learningjourney',backref="jobrole", lazy="joined")
    # staffs = db.relationship('Staff',back_populates="staff")



    # def __init__(self, jobrole_id,jobrole_name):
    #     self.jobrole_id= jobrole_id
    #     self.jobrole_name = jobrole_name


    # def json(self):
    #     return {"jobrole_id": self.jobrole_id, "role_name": self.jobrole_name}

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
    course_id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_desc = db.Column(db.String(100), nullable=False)
    course_status = db.Column(db.Integer, nullable=False)
    course_type = db.Column(db.String(200), nullable=False)
    course_category = db.Column(db.String(100), nullable=False)
    registrations = db.relationship('Registration', backref='course',lazy="select", uselist=False)
    learningjourneys = db.relationship('Learningjourney',backref='course',lazy="select", uselist=False)
    # skills = db.relationship('Skill',secondary="skill_to_course", backref="course" ,lazy="select", uselist=False)


    


    # def __init__(self, course_id, course_name, course_desc,course_status,course_type,course_category):
    #     self.course_id = course_id
    #     self.course_name = course_name
    #     self.course_desc = course_desc
    #     self.course_status = course_status
    #     self.course_type = course_type
    #     self.course_category = course_category


    # def json(self):
    #     return {"course_id": self.course_id, "course_name": self.course_name, "course_desc": self.course_desc, "course_type": self.course_type,"course_category":self.course_category}

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
    skill_name = db.Column(db.String(100), nullable=False)
    skill_desc = db.Column(db.String(100), nullable=False)
    skills_status = db.Column(db.Integer, nullable=False)
    courses= db.relationship('Course', secondary="skill_to_course",backref="skill")

    # def __init__(self, skill_id, skill_name, skill_desc,skill_status):
    #     self.skill_id = skill_id
    #     self.skill_name = skill_name
    #     self.skill_desc = skill_desc
    #     self.skill_status = skill_status


    # def json(self):
    #     return {"skill_id": self.skill_id, "skill_name": self.skill_name, "skill_desc": self.skill_desc,"skill_status": self.skill_status}
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
    staff_fname = db.Column(db.String(100), nullable=False)
    staff_lname = db.Column(db.String(100), nullable=False)
    dept = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("role.role_id"))
    # One to many relationship with registration
    registrations = db.relationship('Registration', backref='staff',lazy="select", uselist=False)
    learningjourneys = db.relationship('Learningjourney',backref='staff')
    # staffs = db.relationship('Role',back_populates="staff")
    # def __init__(self, staff_id, staff_fname, staff_lname,dept,email,role_id):
    #     self.staff_id = staff_id
    #     self.staff_fname = staff_fname
    #     self.staff_lname = staff_lname
    #     self.dept = dept
    #     self.email = email
    #     self.role_id = role_id


    # def json(self):
    #     return {"staff_id": self.staff_id, "staff_fname": self.staff_fname,"staff_lname": self.staff_lname, "dept": self.dept,"email": self.email,'role_id':self.role_id}
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
    # Foreign key is based on the table name
    jobrole_id = db.Column(db.Integer, db.ForeignKey("job_role.jobrole_id"))
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"))
    courses_taken = db.relationship('Course',secondary="learning_journey_detailed",backref="course")
    is_active = db.Column(db.Integer, nullable=False)

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
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"))
    staff_id = db.Column(db.Integer,db.ForeignKey("staff.staff_id"))
    reg_status = db.Column(db.Integer, nullable=False)
    complete_status = db.Column(db.Integer, nullable=False)
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
