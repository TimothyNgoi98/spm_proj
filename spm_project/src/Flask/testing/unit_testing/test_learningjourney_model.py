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
    
def test_learningjourney_relationship_many_to_many_courses(new_learningjourney):
    try:
        # Many to Many: Skill
        # Initialisation of random skills
        course1 = Course(course_id=1,course_name="testing_course_name",course_desc="Testing desc",course_status="Active",course_type="Internal",course_category="Core")
        course2 = Course(course_id=2,course_name="testing_course_name2",course_desc="Testing desc2",course_status="Retired",course_type="External",course_category="Finance")
        # Append many to many relationship
        new_learningjourney.course.append(course1)
        new_learningjourney.course.append(course2)
        # For loop appended skills
        assert new_learningjourney.course[0].course_id ==1
        assert new_learningjourney.course[0].course_name =="testing_course_name"
        assert new_learningjourney.course[0].course_desc =="Testing desc"
        assert new_learningjourney.course[0].course_status =="Active"
        assert new_learningjourney.course[0].course_type =="Internal"
        assert new_learningjourney.course[0].course_category =="Core"

        assert new_learningjourney.course[1].course_id ==2
        assert new_learningjourney.course[1].course_name =="testing_course_name2"
        assert new_learningjourney.course[1].course_desc =="Testing desc2"
        assert new_learningjourney.course[1].course_status =="Retired"
        assert new_learningjourney.course[1].course_type =="External"
        assert new_learningjourney.course[1].course_category =="Finance"
    except:
        raise Exception("Test case of test_learningjourney_relationship_many_to_many_courses failed")

def test_learningjourney_relationship_one_to_many_staff(new_staff):
    try:
        # One staff can have many learning journeys
        learningjourneytest = Learningjourney(learningjourney_id=1,staff_id=12345, jobrole_id=1, is_active="Active",staff=new_staff)       
        staffmapped = learningjourneytest.staff
        assert staffmapped.staff_id == 1
        assert staffmapped.staff_fname == "Jie Peng"
        assert staffmapped.staff_lname == "Wong"
        assert staffmapped.dept== "Testing Dept"
        assert staffmapped.email== "test@test.com"
        assert staffmapped.role== 1
    except:
        raise Exception("Test case of test_learningjourney_relationship_one_to_many_staff failed")





