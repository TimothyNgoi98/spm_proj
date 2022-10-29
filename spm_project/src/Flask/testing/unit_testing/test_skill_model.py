from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_skill_intialisation():
    # GIVEN: Skill is initialised
    # WHEN: Skill object is being populated
    try:
        skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    # Then:
    # Check whether all the fields are correct
        assert skill.skill_id == 100
        assert skill.skill_name == "testing_skill"
        assert skill.skill_desc == "Testing desc"
        assert skill.skill_status == "Active"
    except:
        raise Exception("Test case of test_skill_intialisation failed")

def test_skill_method():
    # GIVEN: Skill is intialised
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    # WHEN: to_dict method is being called
    try: 
        convertedDictionary = skill.to_dict()
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










