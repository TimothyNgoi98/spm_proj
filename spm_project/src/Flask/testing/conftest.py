# Import the relevant classes
from ljapi.models import Role,Jobrole,Course,Skill,Staff,Learningjourney,Registration
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
# =========================================================================================================
# For functional_testing (Individual Flask Routes)
# Setup test_client using fixtures
@pytest.fixture(scope='module')
def test_client():
    app = create_app()
    print(app)
    # Creating a test client based on the Flask application
    with app.test_client() as test_client:
        with app.app_context():
            yield test_client
