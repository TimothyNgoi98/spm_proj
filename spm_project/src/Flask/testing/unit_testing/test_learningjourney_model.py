from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_learningjourney_intialisation(new_learningjourney):
    """
    GIVEN a LEARNINGJOURNEY model
    WHEN a new LEARNINGJOURNEY is being created
    THEN check whether the learningjourney_id, staff_id,jobrole_id,is_active are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_learningjourney.learningjourney_id == 1
        assert new_learningjourney.staff_id == 12345
        assert new_learningjourney.jobrole_id == 1
        assert new_learningjourney.is_active =="Active"

    except:
        raise Exception("Test case of test_learningjourney_intialisation failed")

def test_learningjourney_method(new_learningjourney):
    """
    GIVEN a LEARNINGJOURNEY model
    WHEN a new LEARNINGJOURNEY is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_learningjourney.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly

        assert convertedDictionary['learningjourney_id']  == 1
        assert convertedDictionary['staff_id']  == 12345
        assert convertedDictionary['jobrole_id'] == 1
        assert convertedDictionary['is_active'] == "Active"

    except:
        raise Exception("Test case of test_learningjourney_method failed")
    








