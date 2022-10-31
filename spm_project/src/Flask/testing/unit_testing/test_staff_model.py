from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_staff_intialisation(new_staff):
    """
    GIVEN a STAFF model
    WHEN a new STAFF is being created
    THEN check whether the staff_id, staff_fname, staff_lname, dept, email and role are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_staff.staff_id == 1
        assert new_staff.staff_fname == "Jie Peng"
        assert new_staff.staff_lname == "Wong"
        assert new_staff.dept== "Testing Dept"
        assert new_staff.email== "test@test.com"
        assert new_staff.role== 1
    except:
        raise Exception("Test case of test_staff_intialisation failed")

def test_staff_method(new_staff):
    """
    GIVEN a STAFF model
    WHEN a new STAFF is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_staff.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly
        assert convertedDictionary['staff_id'] == 1
        assert convertedDictionary['staff_fname'] == "Jie Peng"
        assert convertedDictionary['staff_lname'] == "Wong"
        assert convertedDictionary['dept'] == "Testing Dept"
        assert convertedDictionary['email'] == "test@test.com"
        assert convertedDictionary['role'] == 1

    except:
        raise Exception("Test case of test_staff_method failed")











