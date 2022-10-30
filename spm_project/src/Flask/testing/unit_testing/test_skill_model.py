from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_skill_intialisation(new_skill):
    """
    GIVEN a SKILL model
    WHEN a new Skill is being created
    THEN check whether the skill_id, skill_name, skill_desc and skill_status are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_skill.skill_id == 100
        assert new_skill.skill_name == "testing_skill"
        assert new_skill.skill_desc == "Testing desc"
        assert new_skill.skill_status == "Active"
    except:
        raise Exception("Test case of test_skill_intialisation failed")

def test_skill_method(new_skill):
    """
    GIVEN a SKILL model
    WHEN a new Skill is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_skill.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly
        assert convertedDictionary['skill_id'] == 100
        assert convertedDictionary['skill_name'] == "testing_skill"
        assert convertedDictionary['skill_desc'] == "Testing desc"
        assert convertedDictionary['skill_status'] == "Active"
    
    except:
        raise Exception("Test case of test_skill_method failed")










