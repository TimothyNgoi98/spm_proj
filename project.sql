Drop Schema if Exists SPM_Project;

CREATE DATABASE IF NOT EXISTS `SPM_Project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `SPM_Project`;


create Table Role
(
    Role_ID int not null,
    Role_Name varchar(20) not null,
    CONSTRAINT PRIMARY KEY (Role_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Mock up Data for Role
INSERT INTO Role (Role_ID, Role_Name )VALUES (1, "User");
INSERT INTO Role (Role_ID, Role_Name )VALUES (2, "Human Resource");
INSERT INTO Role (Role_ID, Role_Name )VALUES (3, "Manager");
-- End of Mock Up Data Insertion

create Table Job_Role
(
    JobRole_ID int not null,
    JobRole_Name varchar(20) not null,
    JobRole_Desc varchar(250) not null,
    CONSTRAINT  primary key (JobRole_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Mock up Data for Job_Role
INSERT INTO Job_Role (JobRole_ID, JobRole_Name,JobRole_Desc )VALUES (1, "System Analyst", "Analysis and design techniques to solve business problems using information technology");
INSERT INTO Job_Role (JobRole_ID, JobRole_Name,JobRole_Desc )VALUES (2, "Software Developer", "Use programming and design knowledge to build software that meets the needs of users");
INSERT INTO Job_Role (JobRole_ID, JobRole_Name,JobRole_Desc )VALUES (3, "UX UX Designer", "Create user-friendly interfaces that enable users to understand how to use complex technical products");
-- End of Mock Up Data Insertion

create Table Course
(
    Course_ID int not null,
    Course_Name varchar(50) not null,
    Course_Desc varchar(250) not null,
    Course_Status int not null,
    Course_Type varchar(50),
    Course_Category varchar(50),
    CONSTRAINT  primary key(Course_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Mock Up Data for Courses  
INSERT INTO Course (Course_ID, Course_Name,Course_Desc, Course_Status,Course_Type,Course_Category) 
VALUES (1, "Intro to Machine Learning", "the use and development of computer systems that are able to learn and adapt without following explicit instructions", 1, "Internal", "Technical");

INSERT INTO Course (Course_ID, Course_Name,Course_Desc, Course_Status,Course_Type,Course_Category) 
VALUES (2, "Intro to AdobeXD", "Adobe XD is a vector design tool for web and mobile applications, developed and published by Adobe Inc", 1, "Internal", "Design");

INSERT INTO Course (Course_ID, Course_Name,Course_Desc, Course_Status,Course_Type,Course_Category) 
VALUES (3, "Intro to Object Oriented Programming", "A style of programming characterized by the identification of classes of objects closely linked with the methods (functions) with which they are associated", 1, "Internal", "Technical");

INSERT INTO Course (Course_ID, Course_Name,Course_Desc, Course_Status,Course_Type,Course_Category) 
VALUES (4, "Project Management and Agile Concept", "Agile simply means continuous incremental improvement through small and frequent releases.", 1, "Internal", "Management");

INSERT INTO Course (Course_ID, Course_Name,Course_Desc, Course_Status,Course_Type,Course_Category) 
VALUES (5, "Customer Relations", "to engage with its customers and improve the customer experience. This includes providing answers to short-term roadblocks as well as proactively creating long-term solutions that are geared towards customer success.", 1, "Internal", "Management");
-- End of Mock Up Data for Courses.  

create Table Skill
(
    Skill_ID int not null,
    Skill_Name varchar(50) not null,
    Skill_Desc varchar(250) not null,
    Skills_Status int not null,
    CONSTRAINT  primary key (Skill_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Mock up Data for Skills.
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skills_Status )
VALUES (1, "Mobile Design Architecture Skill", "Able to create Prototyping frameworks, user flows, mockups.",1);
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skills_Status )
VALUES (2, "Conflict Management Skill", "Able to handle team and customer conflict effectively.",1);
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skills_Status )
VALUES (3, "Info technology Skill", "Able to design system architecture and code out websites.",1);
-- End of Mock up Data for Skills. 


-- Layer 1: Role, Job_Role, Course , Skills 
-- Layer 2: Staff, Skill_To_Course, JobRole_To_Skill

create Table Staff
(
    Staff_ID varchar(20) not null,
    Staff_FName varchar(50) not null,
    Staff_LName varchar(50) not null,
    Dept varchar(50) not null,
    Email varchar(50) not null,
    Role_ID int not null,
    CONSTRAINT  primary key (Staff_ID),
    CONSTRAINT Staff_fk foreign key (Role_ID) References Role(Role_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Mock up Data for Staff 
INSERT INTO Staff (Staff_ID,Staff_FName,Staff_LName,Dept,Email,Role_ID)
VALUES ("Staff_01", "Song Yu Xiang", "Song", "Mobile Team", "Yuxiang@email.com", 1);

INSERT INTO Staff (Staff_ID,Staff_FName,Staff_LName,Dept,Email,Role_ID)
VALUES ("Staff_02", "Lau Wei Ting", "Lau", "Human Resource", "Weiting@email.com", 2);

INSERT INTO Staff (Staff_ID,Staff_FName,Staff_LName,Dept,Email,Role_ID)
VALUES ("Staff_03", "Wong Jie Peng", "Wong", "Mobile Team", "jiepeng@email.com", 3);


create Table Skill_To_Course
(
    Skill_ID int not null,
    Course_ID int not null,
    CONSTRAINT  primary key (Skill_ID,Course_ID),
    CONSTRAINT Skill_To_Course_fk foreign key (Skill_ID) References Skill(Skill_ID),
    CONSTRAINT Skill_To_Course_fk2 foreign key (Course_ID) References Course(Course_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create Table Job_Role_To_Skill 
(
    JobRole_ID int not null,
    Skill_ID int not null,
    CONSTRAINT  primary key (JobRole_ID,Skill_ID),
    CONSTRAINT Job_Role_To_Skill_fk foreign key (JobRole_ID) References Job_Role(JobRole_ID),
    CONSTRAINT Job_Role_To_Skill_fk2 foreign key (Skill_ID) References Skill(Skill_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Layer 1: Role, Job_Role, Course , Skills 
-- Layer 2: Staff, Skill_To_Course, JobRole_To_Skill
-- Layer 3: Learning Journey, Registration 

create Table Learning_Journey
(
    LearningJourney_ID int not null,
    Staff_ID varchar(20) not null,
    JobRole_ID int not null,
    Course_ID int not null,
    Is_Active int not null,
    CONSTRAINT  primary key (LearningJourney_ID),
    CONSTRAINT Learning_Journey_fk foreign key (Staff_ID) References Staff(Staff_ID),
    CONSTRAINT Learning_Journey_fk2 foreign key (JobRole_ID) References Job_Role(JobRole_ID),
    CONSTRAINT Learning_Journey_fk3 foreign key (Course_ID) References Course(Course_ID)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create Table Registration
(
    Reg_ID int not null,
    Course_ID int not null,
    Staff_ID varchar(20) not null,
    Reg_Status int,
    Complete_Status int,
    CONSTRAINT  primary key (Reg_ID),
    CONSTRAINT Registration_fk foreign key (Course_ID) References Course(Course_ID),
    CONSTRAINT Registration_fk2 foreign key (Staff_ID) References Staff(Staff_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Registration (Reg_ID,Course_ID,Staff_ID,Reg_Status,Complete_Status)
VALUES (1,1,"Staff_01",1,0);

INSERT INTO Registration (Reg_ID,Course_ID,Staff_ID,Reg_Status,Complete_Status)
VALUES (2,1,"Staff_02",1,0);


-- Layer 4: Learning_Journey_Detailed 

create Table Learning_Journey_Detailed
(
    LearningJourney_ID int not null,
    Course_ID int not null,
    CONSTRAINT  primary key (LearningJourney_ID,Course_ID),
    CONSTRAINT Learning_Journey_Detailed_fk1 foreign key (Course_ID) References Course(Course_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- Example Code for Loading of Data from LMS 
-- Load Data Infile 'C:/wamp64/tmp/G5T03/Data/item_request.txt' into Table Item_request Fields Terminated by '\t' Lines terminated by '\r\n' ignore 1 Lines;
