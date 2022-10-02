from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from ljapi.application import create_app
from ljapi.models import db, Role, Jobrole,Skill,Staff,Learningjourney,Registration

# This page would just be for debugging purposes
app = create_app()
migrate = Migrate(app, db)
manager = Manager(app)

# provide a migration utility command
manager.add_command('db', MigrateCommand)

# enable python shell with application context
@manager.shell
def shell_ctx():
    return dict(app=app,
                db=db,
                Role=Role,
                Jobrole=Jobrole,
                Course=Course,
                Skill=Skill,
                Staff=Staff,
                Learningjourney=Learningjourney,
                Registration=Registration)

if __name__ == '__main__':
    manager.run()