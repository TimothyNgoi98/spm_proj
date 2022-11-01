from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_role_intialisation(new_role):
    """
    GIVEN a ROLE model
    WHEN a new Role is being created
    THEN check whether the skill_id, skill_name, skill_desc and skill_status are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_role.role_id == 1
        assert new_role.role_name == "testing"
    except:
        raise Exception("Test case of test_role_intialisation failed")

def test_role_method(new_role):
    """
    GIVEN a ROLE model
    WHEN a new Role is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_role.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly
        assert convertedDictionary['role_id'] == 1
        assert convertedDictionary['role_name'] == "testing"
    
    except:
        raise Exception("Test case of test_role_method failed")










