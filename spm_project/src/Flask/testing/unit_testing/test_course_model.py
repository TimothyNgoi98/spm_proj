from logging import exception
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
import json
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_course_intialisation(new_course):
    """
    GIVEN a COURSE model
    WHEN a new COURSE is being created
    THEN check whether the course_id, course_name,jobrole_desc,course_status,course_desc,course_category are defined correctly
    """
    try:
    # Check whether all the fields are correct
        assert new_course.course_id == 1
        assert new_course.course_name == "testing_course_name"
        assert new_course.course_status == "Active"
        assert new_course.course_desc == "Testing desc"
        assert new_course.course_type == "Internal"
        assert new_course.course_category == "Core"

    except:
        raise Exception("Test case of test_jobrole_intialisation failed")

def test_course_method(new_course):
    """
    GIVEN a JOBROLE model
    WHEN a new JOBROLE is being created
    THEN check whether the methods are executed correctly
    """
    try: 
        convertedDictionary = new_course.to_dict()
        print(convertedDictionary)
        # THEN: Check for the following conditions
        assert type(convertedDictionary) == dict
        # check whether whether the convertedDictionary
        assert convertedDictionary is not None
        # Check whether the fields are populated correctly

        assert convertedDictionary['course_id']  == 1
        assert convertedDictionary['course_name']  == "testing_course_name"
        assert convertedDictionary['course_status'] == "Active"
        assert convertedDictionary['course_desc'] == "Testing desc"
        assert convertedDictionary['course_type'] == "Internal"
        assert convertedDictionary['course_category'] == "Core"

    except:
        raise Exception("Test case of test_course_method failed")
    

def test_course_relationship_many_to_many_skill(new_course):
    try:
        # Many to Many: Skill
        # Initialisation of random skills
        skill1 = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
        skill2 = Skill(skill_id=200,skill_name="testing_skill2",skill_desc="Testing desc2",skill_status="Retired")
        # Append many to many relationship
        new_course.skill.append(skill1)
        new_course.skill.append(skill2)
        # For loop appended skills
        assert new_course.skill[0].skill_id==100
        assert new_course.skill[0].skill_name=="testing_skill"
        assert new_course.skill[0].skill_desc=="Testing desc"
        assert new_course.skill[0].skill_status=="Active"

        assert new_course.skill[1].skill_id==200
        assert new_course.skill[1].skill_name=="testing_skill2"
        assert new_course.skill[1].skill_desc=="Testing desc2"
        assert new_course.skill[1].skill_status=="Retired"
    
    except:
        raise Exception("Test case of test_course_relationship_many_to_many_skill failed")









