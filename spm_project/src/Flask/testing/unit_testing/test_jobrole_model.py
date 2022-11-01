from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_jobrole_intialisation(new_jobrole):
    """
    GIVEN a JOBROLE model
    WHEN a new JOBROLE is being created
    THEN check whether the jobrole_id, jobrole_name,jobrole_desc, department and jobrole_status are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_jobrole.jobrole_id == 1
        assert new_jobrole.jobrole_name == "testing_jobrole_name"
        assert new_jobrole.jobrole_desc == "Testing desc"
        assert new_jobrole.department == "Info Tech"
        assert new_jobrole.jobrole_status == "Active"

    except:
        raise Exception("Test case of test_jobrole_intialisation failed")

def test_jobrole_method(new_jobrole):
    """
    GIVEN a JOBROLE model
    WHEN a new JOBROLE is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_jobrole.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly

        assert convertedDictionary['jobrole_id']  == 1
        assert convertedDictionary['jobrole_name']  == "testing_jobrole_name"
        assert convertedDictionary['jobrole_desc'] == "Testing desc"
        assert convertedDictionary['department'] == "Info Tech"
        assert convertedDictionary['jobrole_status'] == "Active"
    except:
        raise Exception("Test case of test_jobrole_method failed")

def test_jobrole_relationship_many_to_many_skill(new_jobrole):
    try:
        # Many to Many: Skill
        # Initialisation of random skills
        skill1 = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
        skill2 = Skill(skill_id=200,skill_name="testing_skill2",skill_desc="Testing desc2",skill_status="Retired")
        # Append many to many relationship
        new_jobrole.skill.append(skill1)
        new_jobrole.skill.append(skill2)
        # For loop appended skills
        assert new_jobrole.skill[0].skill_id==100
        assert new_jobrole.skill[0].skill_name=="testing_skill"
        assert new_jobrole.skill[0].skill_desc=="Testing desc"
        assert new_jobrole.skill[0].skill_status=="Active"

        assert new_jobrole.skill[1].skill_id==200
        assert new_jobrole.skill[1].skill_name=="testing_skill2"
        assert new_jobrole.skill[1].skill_desc=="Testing desc2"
        assert new_jobrole.skill[1].skill_status=="Retired"
    
    except:
        raise Exception("Test case of test_jobrole_relationship_many_to_many_skill failed")








