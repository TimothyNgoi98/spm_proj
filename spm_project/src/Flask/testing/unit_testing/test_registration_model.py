from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_registration_intialisation(new_registration):
    """
    GIVEN a REGISTRATION model
    WHEN a new REGISTRATION is being created
    THEN check whether the course_id, course_name,jobrole_desc,course_status,course_desc,course_category are defined correctly
    """
    registration = Registration(reg_id=1,course_id="Testing course", staff_id=1, reg_status="Registered",completion_status="Completed" )

    try:
    # Check whether all the fields are correct
        assert new_registration.reg_id == 1
        assert new_registration.course_id =="Testing course"
        assert new_registration.staff_id == 1
        assert new_registration.reg_status == "Registered"
        assert new_registration.completion_status == "Completed"

    except:
        raise Exception("Test case of test_registration_intialisation failed")

def test_registration_method(new_registration):
    """
    GIVEN a REGISTRATION model
    WHEN a new REGISTRATION is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_registration.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly

        assert convertedDictionary['reg_id']  == 1
        assert convertedDictionary['course_id']  == "Testing course"
        assert convertedDictionary['staff_id'] == 1
        assert convertedDictionary['reg_status'] == "Registered"
        assert convertedDictionary['completion_status'] == "Completed"

    except:
        raise Exception("Test case of test_registration_method failed")
    
def test_registration_relationship_one_to_many_course(new_course):
    try:
        # One course can have many registrations
        registrationtest = Registration(reg_id=1,course_id="Testing course", staff_id=1, reg_status="Registered",completion_status="Completed",course=new_course)
        coursemapped = registrationtest.course

        assert coursemapped.course_id == 1
        assert coursemapped.course_name == "testing_course_name"
        assert coursemapped.course_status == "Active"
        assert coursemapped.course_desc == "Testing desc"
        assert coursemapped.course_type == "Internal"
        assert coursemapped.course_category == "Core" 
    
    except:
        raise Exception("Test case of test_registration_relationship_one_to_many_course failed")

def test_registration_relationship_one_to_many_staff(new_staff):
    try:
        # One staff can have many registrations
        registrationtest = Registration(reg_id=1,course_id="Testing course", staff_id=1, reg_status="Registered",completion_status="Completed",staff=new_staff)
        staffmapped = registrationtest.staff

        assert staffmapped.staff_id == 1
        assert staffmapped.staff_fname == "Jie Peng"
        assert staffmapped.staff_lname == "Wong"
        assert staffmapped.dept== "Testing Dept"
        assert staffmapped.email== "test@test.com"
        assert staffmapped.role== 1
    
    except:
        raise Exception("Test case of test_registration_relationship_one_to_many_staff failed")





