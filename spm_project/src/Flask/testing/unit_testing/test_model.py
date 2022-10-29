from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
# Test on Model
# In each model, we will test the following:
# 1. whether the object is being initialised properly
# 2. Whether the methods are to_dict is return successfully
def test_skill_model():
    # Check initialisation of skill
    skillid = 1 
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    assert skill.skill_id == 100
    assert skill.skill_name == "testing_skill"

    
def test__model():
    # Check initialisation of skill
    skillid = 1 
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    assert skill.skill_id == 100


def test_skill_model():
    # Check initialisation of skill
    skillid = 1 
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    assert skill.skill_id == 100


def test_skill_model():
    # Check initialisation of skill
    skillid = 1 
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    assert skill.skill_id == 100





