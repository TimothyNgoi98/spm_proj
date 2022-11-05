# SPM - Learning Journey Planning System (LJPS)

With the inadequacy of LMS (Learning Management System), LJPS was built. LJPS is an online planning web based platform that enable employees to have a personal learning journmey tracker that could guide them on the courses they could take either from the LMS or in physical classes to prepare them for the next position or in a different area within the organisation.

The system would allow staff to set their learning goal by setting on a position that they are working towards. The system will then list out the skills required for those positions and the courses (internal/external) that correspond to those skills. They are then able to view the details of those courses. They are then able to add those courses to theri learning journey.

## Prerequisites

- Python 3.9 or later (https://www.python.org/downloads/)
- React.js (https://reactjs.org/docs/getting-started.html)
- WampServer (https://www.wampserver.com/en/)
- Visual Studio Code (https://code.visualstudio.com/download)

## Setting up and running the application 

Setting up the database 

1. Ensure that WAMP/MAMP server is up and running
2. Import the 'databse.sql' SQL file in PhpMyAdmin to create necessary databases. This file can be found in the following path: 'spm_proj/spm_project/database.sql'

How to run the application locally

1. Run the command “npm start” in project directory (”spm_project”)
2. Run the command “npm install” to install the relevant dependencies
3. Run the command “python appserver.py” in the project Flask directory (”spm_project/src/Flask”)

## Tools used the build the application 

1. ReactJS is frontend JavaScript library used to build our frontend page. It allows us to build reusable UI components. Furthermore, React offers a virtual DOM program and server-side rendering which allows for high performance
2. With the use of ReactJS, we are able to use redux to allow the different react compoenents to have access to our state data without having to passed down as props. It allows for global accessibility of variables. 
3. MySQL is a relational database management system used to store our data.
4. Flask is a backend web framework written in Python. It provides us the ability to create various endpoints for the frontend to make API calls to perform different operations.


## Functionalities of Release 1 
Main Functionalities 
1. CRUD of Roles
2. CRUD of Skills
3. Mapping of the skills to the Roles
4. Mapping of Skills to the courses imported

## Learner & Trainers (Trainers will have the same user route as Learners)
1. Learners are able to view all jobroles available in the organisaton 
2. Learners can select a job role 
3. Learners see all the skills related to the role
4. Learners pick a skill
5. Learners see all the courses related to the skill
6. Learners pick all the courses they would like to take
7. Learners save these selections, and it will be saved as 1 learning journey
8. Learners can update the journey at any point with adding or removing the courses for tracking
9. Learners can create a new journey with any other role 


## Manager 
NEXT RELEASE

## Admin
1. CRUD of Courses
2. CRUD of Skills 
3. CRUD of Roles/Learning Journey 
4. Update of Skills of staff 

## Members/Authors of Project
- Wong Jie Peng 
- Song Yu Xiang 
- Lau Wei Ting 
- Lim Yu Xuan 
- Too Min Jay 
- Timothy Ngoi  
