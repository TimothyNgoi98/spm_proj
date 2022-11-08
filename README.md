# SPM - Learning Journey Planning System (LJPS)

With the inadequacy of LMS (Learning Management System), LJPS was built. LJPS is an online planning web based platform that enable employees to have a personal learning journmey tracker that could guide them on the courses they could take either from the LMS or in physical classes to prepare them for the next position or in a different area within the organisation.

The system would allow staff to set their learning goal by setting on a position that they are working towards. The system will then list out the skills required for those positions and the courses (internal/external) that correspond to those skills. They are then able to view the details of those courses. They are then able to add those courses to theri learning journey.

## Prerequisites

- Python 3.9 or later (https://www.python.org/downloads/)
- React.js (https://reactjs.org/docs/getting-started.html)
- WampServer (https://www.wampserver.com/en/)
- Visual Studio Code (https://code.visualstudio.com/download)

## Setting up and running the application 

### Setting up the database 

1. Ensure that WAMP/MAMP server is up and running
2. Import the 'databse.sql' SQL file in PhpMyAdmin to create the necessary tables and database. This file can be found in the following path: 'spm_proj/spm_project/database.sql'

### Install dependencies and requirements

1. [Frontend] Run the command “npm install” in the project directory (”spm_project”) to install all dependencies defined in package.json
2. [Frontend] Run the command “npm install” in the main directory (”spm_proj”) to install all dependencies defined in package.json
3. [Backend] Run the command pip install -r requirements.txt in the main directory ("spm_proj") to install required dependencies in requirements.txt

### Run the application locally

2. [Frontend] Run the command “npm start” in project directory (”spm_project”)
3. [Backend] Run the command “python appserver.py” in the project Flask directory (”spm_project/src/Flask”) for the backend

## Tools used the build the application 

1. ReactJS is frontend JavaScript library used to build our frontend page. It allows us to build reusable UI components. Furthermore, React offers a virtual DOM program and server-side rendering which allows for high performance
2. With the use of ReactJS, we are able to use redux to allow the different react compoenents to have access to our state data without having to passed down as props. It allows for global accessibility of variables. 
3. MySQL is a relational database management system used to store our data.
4. Flask is a backend web framework written in Python. It provides us the ability to create various endpoints for the frontend to make API calls to perform different operations.


## Core Functionalities of First Release
1. Users should be able to select a role they want and see a list of skills required
2. Users should be able to see the courses they can take to acquire those skills, and add/remove them on their learning journey
3. CRUD for Roles
4. CRUD for Skills
3. Assigning Skills to Roles; assigning Skills to Courses (Skill Mapping)


## Staff (User)
(Staff_ID = "140002")
1. Staff are able to view all job roles available in the organisaton 
2. Staff can select a job role 
3. Staff view all the skills related to the role
4. Staff pick a skill
5. Staff can view all the courses related to the skill
6. Staff picks all the courses they would like to take
7. Staff save these selections, and it will be saved as 1 learning journey
8. Staff can update the learning journey at any point with adding or removing the courses for tracking
9. Staff can create a new journey with any other role 

## Admin 
(Staff_ID = "130001")
1. CRUD of Courses
2. CRUD of Skills 
3. CRUD of Roles/Learning Journey 
4. All other functionalities of Staff

## Trainer 
(Staff_ID = "150065")
1. Trainers will have the same user route as Staff

## Manager 
(Staff_ID = "140001")
Not in current release



## Unit/Functional/Integration Testing
- To test the both Functional/Integration testing, locate the folder at which the folder Flask exists and do a python -m pytest (For windows)
- A total of 40 test cases will run, 20 of which are unit tests and 20 of which are functional tests.
- Functional/Integration testing has not been implemented and integrated into the CI pipeline. 

## CI Pipeline
- In our CI pipeline, unit testing has been integrated through GitHub Actions. The script can be found in .github\workflows\unit_testing_workflow.yaml
- Before merging into main branch, GitHub Actions will run, build and test the existing code merged with the unit test cases implemented by our team. This is to identify any underlying errors before merging into the main branch.

## Members/Authors of Project (G10T7) 
- Lau Wei Ting 
- Lim Yu Xuan 
- Song Yu Xiang 
- Timothy Ngoi 
- Too Min Jay 
- Wong Jie Peng