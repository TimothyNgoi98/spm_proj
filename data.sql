drop schema if exists SPM_Project;
create database if not exists `SPM_Project`;
use `SPM_Project`;

-- uncomment this line to check your secure_file_priv path
-- SHOW VARIABLES LIKE 'secure_file_priv';

-- creating 'role' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS role (
	Role_ID int not null,
	Role_Name varchar(20) not null,
    CONSTRAINT PRIMARY KEY(Role_ID)
);
-- loading role data
LOAD DATA INFILE 'c:\\wamp64\\tmp\\IS212\\role.csv' 
INTO TABLE role
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- SELECT * FROM role;
-- 'role' table and data loaded --------------------------------------------------

-- creating 'staff' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS staff (
	Staff_ID int not null,
	Staff_FName varchar(50) not null,
    Staff_LName varchar(50) not null,
    Dept varchar(50) not null,
    Email varchar(50) not null,
    Role int not null,
    CONSTRAINT PRIMARY KEY(Staff_ID),
    CONSTRAINT Staff_fk foreign key (Role) References role(Role_ID)
);
-- loading staff data
LOAD DATA INFILE 'c:\\wamp64\\tmp\\IS212\\staff.csv' 
INTO TABLE staff
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- SELECT * FROM staff;
-- 'staff' table and data loaded --------------------------------------------------

-- creating 'course' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS course (
	Course_ID varchar(20) not null,
	Course_Name varchar(50) not null,
    Course_Desc varchar(255) not null,
    Course_Status varchar(15) not null,
    Course_Type varchar(10),
    Course_Category varchar(50),
    CONSTRAINT PRIMARY KEY(Course_ID)
);
-- loading course data
LOAD DATA INFILE 'c:\\wamp64\\tmp\\IS212\\courses.csv' 
INTO TABLE course 
CHARACTER SET latin1
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- SELECT * FROM course;
-- 'course' table and data loaded --------------------------------------------------

-- creating 'registration' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS registration (
	Reg_ID int not null,
	Course_ID varchar(20) not null,
    Staff_ID int not null,
    Reg_Status varchar(20) not null, -- can be empty
    Completion_Status varchar(20) not null, -- can be empty
    CONSTRAINT PRIMARY KEY(Reg_ID),
	CONSTRAINT Registration_fk foreign key (Course_ID) References course(Course_ID),
    CONSTRAINT Registration_fk2 foreign key (Staff_ID) References staff(Staff_ID)
);
-- loading registration data
LOAD DATA INFILE 'c:\\wamp64\\tmp\\IS212\\registration.csv' 
INTO TABLE registration
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- SELECT * FROM registration;
-- 'registration' table and data loaded --------------------------------------------------

-- creating 'skill' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS skill (
	Skill_ID varchar(20) not null,
	Skill_Name varchar(50) not null,
    Skill_Desc varchar(255) not null,
    Skill_Status varchar(15) not null,
    CONSTRAINT PRIMARY KEY(Skill_ID)
);
-- 'skill' table created --------------------------------------------------

-- creating 'job_role' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS job_role (
	JobRole_ID int not null,
	JobRole_Name varchar(20) not null,
    JobRole_Desc varchar(255) not null,
    -- add department varchar(20)
    CONSTRAINT PRIMARY KEY(JobRole_ID)
);
-- 'job_role' table created --------------------------------------------------

-- creating 'learning_journey' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_journey (
	LearningJourney_ID varchar(20) not null,
    Staff_ID int not null,
    JobRole_ID int not null,
    Course_ID varchar(20) not null,
    Is_Active boolean not null,
    CONSTRAINT PRIMARY KEY(LearningJourney_ID),
    CONSTRAINT Learning_Journey_fk foreign key (Staff_ID) References staff(Staff_ID),
    CONSTRAINT Learning_Journey_fk2 foreign key (JobRole_ID) References job_role(JobRole_ID)
);
-- 'learning_journey' table created --------------------------------------------------

-- creating 'job_role_to_skill' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS job_role_to_skill (
	JobRole_ID int not null,
	Skill_ID varchar(20) not null,
    CONSTRAINT Job_Role_to_Skill_fk foreign key (JobRole_ID) References job_role(JobRole_ID),
    CONSTRAINT Job_Role_to_Skill_fk2 foreign key (Skill_ID) References skill(Skill_ID)
);
-- 'job_role_to_skill' table created --------------------------------------------------

-- creating 'skill_to_course' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS skill_to_course (
	Skill_ID varchar(20) not null,
	Course_ID varchar(20) not null,
    CONSTRAINT Skill_to_Course_fk foreign key (Skill_ID) References skill(Skill_ID),
    CONSTRAINT Skill_to_Course_fk2 foreign key (Course_ID) References course(Course_ID)
);
-- 'skill_to_course' table created --------------------------------------------------

-- creating 'learning_journey_detailed' table --------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_journey_detailed (
	LearningJourney_ID varchar(20) not null,
	Course_ID varchar(20) not null,
    CONSTRAINT Learning_Journey_Detailed_fk foreign key (LearningJourney_ID) References learning_journey(LearningJourney_ID),
    CONSTRAINT Learning_Journey_Detailed_fk2 foreign key (Course_ID) References course(Course_ID)
);
-- 'learning_journey_detailed' table created --------------------------------------------------