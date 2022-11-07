# Import the relevant classes
from ljapi.models import db, Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
from ljapi.application import create_app
import pytest

# Pytest fixtures, can think of it as the setup and teardown functions but not really sure whether this is needed but we can see
# Unittest will call the fixtures to automatically set up the Flask 

# For unit_testing (Models)
# Skills
@pytest.fixture(scope="module")
def new_skill():
    skill = Skill(skill_id=100,skill_name="testing_skill",skill_desc="Testing desc",skill_status="Active")
    return skill
@pytest.fixture(scope="module")
def new_jobrole():
    jobrole = Jobrole(jobrole_id=1,jobrole_name="testing_jobrole_name",jobrole_desc="Testing desc",department="Info Tech",jobrole_status="Active")
    return jobrole
@pytest.fixture(scope="module")
def new_course():
    course = Course(course_id=1,course_name="testing_course_name",course_desc="Testing desc",course_status="Active",course_type="Internal",course_category="Core")
    return course
@pytest.fixture(scope="module")
def new_staff():
    staff = Staff(staff_id=1,staff_fname="Jie Peng", staff_lname="Wong",dept="Testing Dept",email="test@test.com", role=1)
    return staff
@pytest.fixture(scope="module")
def new_learningjourney():
    learningjourney = Learningjourney(learningjourney_id=1,staff_id=12345, jobrole_id=1, is_active="Active" )
    return learningjourney
@pytest.fixture(scope="module")
def new_registration():
    registration = Registration(reg_id=1,course_id="Testing course", staff_id=1, reg_status="Registered",completion_status="Completed" )
    return registration
@pytest.fixture(scope="module")
def new_role():
    role = Role(role_id=1,role_name="testing" )
    return role
# =========================================================================================================
# For functional_testing (Individual Flask Routes)
# Setup test_client using fixtures
@pytest.fixture(scope='function')
def test_client():
    app = create_app()
    print(app)
    # Creating a test client based on the Flask application
    with app.test_client() as test_client:
        with app.app_context():
            yield test_client
