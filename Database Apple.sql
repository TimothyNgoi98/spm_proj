-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 08, 2022 at 09:52 AM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

START TRANSACTION;
SET time_zone = "+00:00";
--
-- Database: `spm_project`
--
CREATE DATABASE IF NOT EXISTS `spm_project` DEFAULT CHARACTER SET utf8;
USE `spm_project`;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `Course_ID` varchar(20) NOT NULL,
  `Course_Name` varchar(50) NOT NULL,
  `Course_Desc` varchar(255) NOT NULL,
  `Course_Status` varchar(15) NOT NULL,
  `Course_Type` varchar(10) DEFAULT NULL,
  `Course_Category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Course_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--



-- --------------------------------------------------------

--
-- Table structure for table `job_role`
--

DROP TABLE IF EXISTS `job_role`;
CREATE TABLE IF NOT EXISTS `job_role` (
  `JobRole_ID` int NOT NULL AUTO_INCREMENT,
  `JobRole_Name` varchar(20) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `JobRole_Desc` varchar(255) NOT NULL,
  `JobRole_Status` varchar(15) NOT NULL,
  PRIMARY KEY (`JobRole_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `job_role_to_skill`
--

DROP TABLE IF EXISTS `job_role_to_skill`;
CREATE TABLE IF NOT EXISTS `job_role_to_skill` (
  `JobRole_ID` int NOT NULL,
  `Skill_ID` int NOT NULL,
  KEY `Job_Role_to_Skill_fk` (`JobRole_ID`),
  KEY `Job_Role_to_Skill_fk2` (`Skill_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- --------------------------------------------------------

--
-- Table structure for table `learning_journey`
--

DROP TABLE IF EXISTS `learning_journey`;
CREATE TABLE IF NOT EXISTS `learning_journey` (
  `LearningJourney_ID` int NOT NULL AUTO_INCREMENT,
  `Staff_ID` int NOT NULL,
  `JobRole_ID` int NOT NULL,
  `Course_ID` varchar(20) NOT NULL,
  `Is_Active` tinyint(1) NOT NULL,
  PRIMARY KEY (`LearningJourney_ID`),
  KEY `Learning_Journey_fk` (`Staff_ID`),
  KEY `Learning_Journey_fk2` (`JobRole_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `learning_journey_detailed`
--

DROP TABLE IF EXISTS `learning_journey_detailed`;
CREATE TABLE IF NOT EXISTS `learning_journey_detailed` (
  `LearningJourney_ID` int NOT NULL,
  `Course_ID` varchar(20) NOT NULL,
  KEY `Learning_Journey_Detailed_fk` (`LearningJourney_ID`),
  KEY `Learning_Journey_Detailed_fk2` (`Course_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration` (
  `Reg_ID` int NOT NULL AUTO_INCREMENT,
  `Course_ID` varchar(20) NOT NULL,
  `Staff_ID` int NOT NULL,
  `Reg_Status` varchar(20) NOT NULL,
  `Completion_Status` varchar(20) NOT NULL,
  PRIMARY KEY (`Reg_ID`),
  KEY `Registration_fk` (`Course_ID`),
  KEY `Registration_fk2` (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

--
-- Dumping data for table `registration`
--


-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `Role_ID` int NOT NULL ,
  `Role_Name` varchar(20) NOT NULL,
  PRIMARY KEY (`Role_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Role_ID`, `Role_Name`) VALUES
(1, 'Admin\r'),
(2, 'User'),
(3, 'Manager\r'),
(4, 'Trainer\r');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `Skill_ID` int NOT NULL AUTO_INCREMENT,
  `Skill_Name` varchar(50) NOT NULL,
  `Skill_Desc` varchar(255) NOT NULL,
  `Skill_Status` varchar(15) NOT NULL,
  PRIMARY KEY (`Skill_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `skill_to_course`
--
-- Mock up Data for Skills.
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skill_Status )
VALUES (1, "Mobile Design Architecture Skill", "Able to create Prototyping frameworks, user flows, mockups.","Active");
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skill_Status )
VALUES (2, "Conflict Management Skill", "Able to handle team and customer conflict effectively.","Retired ");
INSERT INTO Skill (Skill_ID, Skill_Name,Skill_Desc,Skill_Status )
VALUES (3, "Info technology Skill", "Able to design system architecture and code out websites.","Active");
-- End of Mock up Data for Skills. 


DROP TABLE IF EXISTS `skill_to_course`;
CREATE TABLE IF NOT EXISTS `skill_to_course` (
  `Skill_ID` int NOT NULL,
  `Course_ID` varchar(20) NOT NULL,
  KEY `Skill_to_Course_fk` (`Skill_ID`),
  KEY `Skill_to_Course_fk2` (`Course_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `Staff_ID` int NOT NULL AUTO_INCREMENT,
  `Staff_FName` varchar(50) NOT NULL,
  `Staff_LName` varchar(50) NOT NULL,
  `Dept` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Role` int NOT NULL,
  PRIMARY KEY (`Staff_ID`),
  KEY `Staff_fk` (`Role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


ALTER TABLE `job_role_to_skill`
  ADD CONSTRAINT `Job_Role_to_Skill_fk` FOREIGN KEY (`JobRole_ID`) REFERENCES `job_role` (`JobRole_ID`),
  ADD CONSTRAINT `Job_Role_to_Skill_fk2` FOREIGN KEY (`Skill_ID`) REFERENCES `skill` (`Skill_ID`);

--
-- Constraints for table `learning_journey`
--
ALTER TABLE `learning_journey`
  ADD CONSTRAINT `Learning_Journey_fk` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`),
  ADD CONSTRAINT `Learning_Journey_fk2` FOREIGN KEY (`JobRole_ID`) REFERENCES `job_role` (`JobRole_ID`);

--
-- Constraints for table `learning_journey_detailed`
--
ALTER TABLE `learning_journey_detailed`
  ADD CONSTRAINT `Learning_Journey_Detailed_fk` FOREIGN KEY (`LearningJourney_ID`) REFERENCES `learning_journey` (`LearningJourney_ID`),
  ADD CONSTRAINT `Learning_Journey_Detailed_fk2` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `Registration_fk` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`),
  ADD CONSTRAINT `Registration_fk2` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`);

--
-- Constraints for table `skill_to_course`
--
ALTER TABLE `skill_to_course`
  ADD CONSTRAINT `Skill_to_Course_fk` FOREIGN KEY (`Skill_ID`) REFERENCES `skill` (`Skill_ID`),
  ADD CONSTRAINT `Skill_to_Course_fk2` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `Staff_fk` FOREIGN KEY (`Role`) REFERENCES `role` (`Role_ID`);
COMMIT;

INSERT INTO `course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES
('COR001', 'Systems Thinking and Design', 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,', 'Active', 'Internal', 'Core\r'),
('COR002', 'Lean Six Sigma Green Belt Certification', 'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics', 'Active', 'Internal', 'Core\r'),
('COR004', 'Service Excellence', 'The programme provides the learner with the key foundations of what builds customer confidence in the service industr', 'Pending', 'Internal', 'Core\r'),
('COR006', 'Manage Change', 'Identify risks associated with change and develop risk mitigation plans.', 'Retired', 'External', 'Core\r'),
('FIN001', 'Data Collection and Analysis', 'Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ', 'Active', 'External', 'Finance\r'),
('FIN002', 'Risk and Compliance Reporting', 'Regulatory reporting is a requirement for businesses from highly regulated sectors to demonstrate compliance with the necessary regulatory provisions.', 'Active', 'External', 'Finance\r'),
('FIN003', 'Business Continuity Planning', 'Business continuity planning is essential in any business to minimise loss when faced with potential threats and disruptions.', 'Retired', 'External', 'Finance\r'),
('HRD001', 'Leading and Shaping a Culture in Learning', 'This training programme, delivered by the National Centre of Excellence (Workplace Learning), aims to equip participants with the skills and knowledge of the National workplace learning certification framework,', 'Active', 'External', 'HR\r'),
('MGT001', 'People Management', 'enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.', 'Active', 'Internal', 'Management\r'),
('MGT002', 'Workplace Conflict Management for Professionals', 'This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.', 'Active', 'External', 'Management\r'),
('MGT003', 'Enhance Team Performance Through Coaching', 'The course aims to upskill real estate team leaders in the area of service coaching for performance.', 'Pending', 'Internal', 'Management\r'),
('MGT004', 'Personal Effectiveness for Leaders', 'Learners will be able to acquire the skills and knowledge to undertake self-assessment in relation to one’s performance and leadership style', 'Active', 'External', 'Management\r'),
('MGT007', 'Supervisory Management Skills', 'Supervisors lead teams, manage tasks, solve problems, report up and down the hierarchy, and much more. ', 'Retired', 'External', 'Management\r'),
('SAL001', 'Risk Management for Smart Business', 'Apply risk management concepts to digital business', 'Retired', 'Internal', 'Sales\r'),
('SAL002', 'CoC in Smart Living Solutions', 'Participants will acquire the knowledge and skills in setting up a smart living solution', 'Pending', 'External', 'Sales\r'),
('SAL003', 'Optimising Your Brand For The Digital Spaces', 'Digital has fundamentally shifted communication between brands and their consumers from a one-way broadcast to a two-way dialogue. In a hastened bid to transform their businesses to be digital market-ready,', 'Active', 'External', 'Sales\r'),
('SAL004', 'Stakeholder Management', 'Develop a stakeholder engagement plan and negotiate with stakeholders to arrive at mutually-beneficial arrangements.', 'Active', 'Internal', 'Sales\r'),
('tch001', 'Print Server Setup', 'Setting up print server in enterprise environment', 'Retired', 'Internal', 'Technical\r'),
('tch002', 'Canon MFC Setup', 'Setting up Canon ImageRUNNER series of products', 'Retired', 'Internal', 'Technical\r'),
('tch003', 'Canon MFC Mainteance and Troubleshooting', 'Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products', 'Active', 'Internal', 'Technical\r'),
('tch004', 'Introduction to Open Platform Communications', 'This course provides the participants with a good in-depth understanding of the SS IEC 62541 standard', 'Pending', 'Internal', 'Technical\r'),
('tch005', 'An Introduction to Sustainability', 'The course provides learners with the multi-faceted basic knowledge of sustainability.', 'Active', 'External', 'Technical\r'),
('tch006', 'Machine Learning DevOps Engineer ', 'The Machine Learning DevOps Engineer Nanodegree program focuses on the software engineering fundamentals needed to successfully streamline the deployment of data and machine-learning models', 'Pending', 'Internal', 'Technical\r'),
('tch008', 'Technology Intelligence and Strategy', 'Participants will be able to gain knowledge and skills on: - establishing technology strategy with technology intelligence framework and tools', 'Active', 'External', 'Technical\r'),
('tch009', 'Smart Sensing Technology', 'This course introduces sensors and sensing systems. The 5G infrastructure enables the many fast-growing IoT applications equipped with sensors ', 'Pending', 'External', 'Technical\r'),
('tch012', 'Internet of Things', 'The Internet of Things (IoT) is integrating our digital and physical world, opening up new and exciting opportunities to deploy, automate, optimize and secure diverse use cases and applications. ', 'Active', 'Internal', 'Technical\r'),
('tch013', 'Managing Cybersecurity and Risks', 'Digital security is the core of our daily lives considering that our dependence on the digital world', 'Active', 'Internal', 'Technical\r'),
('tch014', 'Certified Information Privacy Professional', 'The Certified Information Privacy Professional/ Asia (CIPP/A) is the first publicly available privacy certification', 'Active', 'External', 'Technical\r'),
('tch015', 'Network Security', 'Understanding of the fundamental knowledge of network security including cryptography, authentication and key distribution. The security techniques at various layers of computer networks are examined.', 'Active', 'External', 'Technical\r'),
('tch018', 'Professional Project Management', 'solid foundation in the project management processes from initiating a project, through planning, execution, control,', 'Active', 'Internal', 'Technical\r'),
('tch019', 'Innovation and Change Management ', 'the organization that constantly reinvents itself to be relevant has a better chance of making progress', 'Active', 'External', 'Technical\r');


INSERT INTO `staff` (`Staff_ID`, `Staff_FName`, `Staff_LName`, `Dept`, `Email`, `Role`) VALUES
(130001, 'John', 'Sim', 'Chariman', 'jack.sim@allinone.com.sg', 1),
(130002, 'Jack', 'Sim', 'CEO', 'jack.sim@allinone.com.sg', 1),
(140001, 'Derek', 'Tan', 'Sales', 'Derek.Tan@allinone.com.sg', 3),
(140002, 'Susan', 'Goh', 'Sales', 'Susan.Goh@allinone.com.sg', 2),
(140003, 'Janice', 'Chan', 'Sales', 'Janice.Chan@allinone.com.sg', 2),
(140004, 'Mary', 'Teo', 'Sales', 'Mary.Teo@allinone.com.sg', 2),
(140008, 'Jaclyn', 'Lee', 'Sales', 'Jaclyn.Lee@allinone.com.sg', 2),
(140015, 'Oliva', 'Lim', 'Sales', 'Oliva.Lim@allinone.com.sg', 2),
(140025, 'Emma', 'Heng', 'Sales', 'Emma.Heng@allinone.com.sg', 2),
(140036, 'Charlotte', 'Wong', 'Sales', 'Charlotte.Wong@allinone.com.sg', 2),
(140078, 'Amelia', 'Ong', 'Sales', 'Amelia.Ong@allinone.com.sg', 2),
(140102, 'Eva', 'Yong', 'Sales', 'Eva.Yong@allinone.com.sg', 2),
(140103, 'Sophia', 'Toh', 'Sales', 'Sophia.Toh@allinone.com.sg', 2),
(140108, 'Liam', 'The', 'Sales', 'Liam.The@allinone.com.sg', 2),
(140115, 'Noah', 'Ng', 'Sales', 'Noah.Ng@allinone.com.sg', 2),
(140525, 'Oliver', 'Tan', 'Sales', 'Oliver.Tan@allinone.com.sg', 2),
(140736, 'William', 'Fu', 'Sales', 'William.Fu@allinone.com.sg', 2),
(140878, 'James', 'Tong', 'Sales', 'James.Tong@allinone.com.sg', 2),
(150008, 'Eric', 'Loh', 'Ops', 'Eric.Loh@allinone.com.sg', 3),
(150065, 'Noah', 'Goh', 'Ops', 'Noah.Goh@allinone.com.sg', 4),
(150075, 'Liam', 'Tan', 'Ops', 'Liam.Tan@allinone.com.sg', 4),
(150076, 'Oliver', 'Chan', 'Ops', 'Oliver.Chan@allinone.com.sg', 4),
(150085, 'Michael', 'Ng', 'Ops', 'Michael.Ng@allinone.com.sg', 4),
(150095, 'Alexander', 'The', 'Ops', 'Alexander.The@allinone.com.sg', 4),
(150096, 'Ethan', 'Tan', 'Ops', 'Ethan.Tan@allinone.com.sg', 4),
(150115, 'Jaclyn', 'Lee', 'Ops', 'Jaclyn.Lee@allinone.com.sg', 4),
(150118, 'William', 'Teo', 'Ops', 'William.Teo@allinone.com.sg', 4),
(150125, 'Mary', 'Teo', 'Ops', 'Mary.Teo@allinone.com.sg', 4),
(150126, 'Oliva', 'Lim', 'Ops', 'Oliva.Lim@allinone.com.sg', 2),
(150138, 'Daniel', 'Fu', 'Ops', 'Daniel.Fu@allinone.com.sg', 4),
(150142, 'James', 'Lee', 'Ops', 'James.Lee@allinone.com.sg', 4),
(150143, 'John', 'Lim', 'Ops', 'John.Lim@allinone.com.sg', 4),
(150148, 'Jack', 'Heng', 'Ops', 'Jack.Heng@allinone.com.sg', 4),
(150155, 'Derek', 'Wong', 'Ops', 'Derek.Wong@allinone.com.sg', 4),
(150162, 'Jacob', 'Tong', 'Ops', 'Jacob.Tong@allinone.com.sg', 4),
(150163, 'Logan', 'Loh', 'Ops', 'Logan.Loh@allinone.com.sg', 4),
(150165, 'Oliver', 'Tan', 'Ops', 'Oliver.Tan@allinone.com.sg', 2),
(150166, 'William', 'Fu', 'Ops', 'William.Fu@allinone.com.sg', 2),
(150168, 'Jackson', 'Tan', 'Ops', 'Jackson.Tan@allinone.com.sg', 4),
(150175, 'Aiden', 'Tan', 'Ops', 'Aiden.Tan@allinone.com.sg', 4),
(150192, 'Emma', 'Heng', 'Ops', 'Emma.Heng@allinone.com.sg', 2),
(150193, 'Charlotte', 'Wong', 'Ops', 'Charlotte.Wong@allinone.com.sg', 2),
(150198, 'Amelia', 'Ong', 'Ops', 'Amelia.Ong@allinone.com.sg', 2),
(150205, 'Eva', 'Yong', 'Ops', 'Eva.Yong@allinone.com.sg', 2),
(150208, 'James', 'Tong', 'Ops', 'James.Tong@allinone.com.sg', 2),
(150215, 'Michael', 'Lee', 'Ops', 'Michael.Lee@allinone.com.sg', 2),
(150216, 'Ethan', 'Lim', 'Ops', 'Ethan.Lim@allinone.com.sg', 2),
(150232, 'John', 'Loh', 'Ops', 'John.Loh@allinone.com.sg', 2),
(150233, 'Jack', 'Tan', 'Ops', 'Jack.Tan@allinone.com.sg', 2),
(150238, 'Derek', 'Tan', 'Ops', 'Derek.Tan@allinone.com.sg', 2),
(150245, 'Benjamin', 'Tan', 'Ops', 'Benjamin.Tan@allinone.com.sg', 2),
(150258, 'Daniel', 'Heng', 'Ops', 'Daniel.Heng@allinone.com.sg', 2),
(150265, 'Jaclyn', 'Tong', 'Ops', 'Jaclyn.Tong@allinone.com.sg', 2),
(150275, 'Mary', 'Fu', 'Ops', 'Mary.Fu@allinone.com.sg', 2),
(150276, 'Oliva', 'Loh', 'Ops', 'Oliva.Loh@allinone.com.sg', 2),
(150282, 'Jacob', 'Wong', 'Ops', 'Jacob.Wong@allinone.com.sg', 2),
(150283, 'Logan', 'Ong', 'Ops', 'Logan.Ong@allinone.com.sg', 2),
(150288, 'Jackson', 'Yong', 'Ops', 'Jackson.Yong@allinone.com.sg', 2),
(150295, 'Aiden', 'Toh', 'Ops', 'Aiden.Toh@allinone.com.sg', 2),
(150318, 'Emma', 'Tan', 'Ops', 'Emma.Tan@allinone.com.sg', 2),
(150342, 'Charlotte', 'Tan', 'Ops', 'Charlotte.Tan@allinone.com.sg', 2),
(150343, 'Amelia', 'Tan', 'Ops', 'Amelia.Tan@allinone.com.sg', 2),
(150345, 'William', 'Heng', 'Ops', 'William.Heng@allinone.com.sg', 2),
(150348, 'Eva', 'Goh', 'Ops', 'Eva.Goh@allinone.com.sg', 2),
(150355, 'Sophia', 'Chan', 'Ops', 'Sophia.Chan@allinone.com.sg', 2),
(150356, 'James', 'Wong', 'Ops', 'James.Wong@allinone.com.sg', 2),
(150398, 'John', 'Ong', 'Ops', 'John.Ong@allinone.com.sg', 2),
(150422, 'Jack', 'Yong', 'Ops', 'Jack.Yong@allinone.com.sg', 2),
(150423, 'Derek', 'Toh', 'Ops', 'Derek.Toh@allinone.com.sg', 2),
(150428, 'Benjamin', 'The', 'Ops', 'Benjamin.The@allinone.com.sg', 2),
(150435, 'Lucas', 'Ng', 'Ops', 'Lucas.Ng@allinone.com.sg', 2),
(150445, 'Ethan', 'Loh', 'Ops', 'Ethan.Loh@allinone.com.sg', 2),
(150446, 'Daniel', 'Tan', 'Ops', 'Daniel.Tan@allinone.com.sg', 2),
(150488, 'Jacob', 'Tan', 'Ops', 'Jacob.Tan@allinone.com.sg', 2),
(150512, 'Logan', 'Tan', 'Ops', 'Logan.Tan@allinone.com.sg', 2),
(150513, 'Jackson', 'Goh', 'Ops', 'Jackson.Goh@allinone.com.sg', 2),
(150518, 'Aiden', 'Chan', 'Ops', 'Aiden.Chan@allinone.com.sg', 2),
(150525, 'Samuel', 'Teo', 'Ops', 'Samuel.Teo@allinone.com.sg', 2),
(150555, 'Jaclyn', 'Wong', 'Ops', 'Jaclyn.Wong@allinone.com.sg', 2),
(150565, 'Benjamin', 'Ong', 'Ops', 'Benjamin.Ong@allinone.com.sg', 4),
(150566, 'Oliva', 'Ong', 'Ops', 'Oliva.Ong@allinone.com.sg', 2),
(150585, 'Samuel', 'Tan', 'Ops', 'Samuel.Tan@allinone.com.sg', 4),
(150608, 'Emma', 'Yong', 'Ops', 'Emma.Yong@allinone.com.sg', 2),
(150615, 'Sophia', 'Toh', 'Ops', 'Sophia.Toh@allinone.com.sg', 2),
(150632, 'Charlotte', 'Toh', 'Ops', 'Charlotte.Toh@allinone.com.sg', 2),
(150633, 'Amelia', 'The', 'Ops', 'Amelia.The@allinone.com.sg', 2),
(150638, 'Eva', 'Ng', 'Ops', 'Eva.Ng@allinone.com.sg', 2),
(150645, 'Sophia', 'Tan', 'Ops', 'Sophia.Tan@allinone.com.sg', 2),
(150655, 'Lucas', 'Goh', 'Ops', 'Lucas.Goh@allinone.com.sg', 2),
(150695, 'William', 'Tan', 'Ops', 'William.Tan@allinone.com.sg', 2),
(150705, 'Samuel', 'The', 'Ops', 'Samuel.The@allinone.com.sg', 2),
(150765, 'Liam', 'Teo', 'Ops', 'Liam.Teo@allinone.com.sg', 2),
(150776, 'Lucas', 'Yong', 'Ops', 'Lucas.Yong@allinone.com.sg', 4),
(150796, 'Susan', 'Goh', 'Ops', 'Susan.Goh@allinone.com.sg', 4),
(150826, 'Liam', 'The', 'Ops', 'Liam.The@allinone.com.sg', 2),
(150845, 'Henry', 'Tan', 'Ops', 'Henry.Tan@allinone.com.sg', 2),
(150866, 'Henry', 'Chan', 'Ops', 'Henry.Chan@allinone.com.sg', 2),
(150916, 'Susan', 'Ng', 'Ops', 'Susan.Ng@allinone.com.sg', 2),
(150918, 'Henry', 'Toh', 'Ops', 'Henry.Toh@allinone.com.sg', 4),
(150935, 'Susan', 'Lee', 'Ops', 'Susan.Lee@allinone.com.sg', 2),
(150938, 'Janice', 'Chan', 'Ops', 'Janice.Chan@allinone.com.sg', 4),
(150968, 'Noah', 'Ng', 'Ops', 'Noah.Ng@allinone.com.sg', 2),
(150976, 'Noah', 'Lee', 'Ops', 'Noah.Lee@allinone.com.sg', 2),
(151008, 'Alexander', 'Teo', 'Ops', 'Alexander.Teo@allinone.com.sg', 2),
(151055, 'Liam', 'Fu', 'Ops', 'Liam.Fu@allinone.com.sg', 2),
(151056, 'Alexander', 'Fu', 'Ops', 'Alexander.Fu@allinone.com.sg', 2),
(151058, 'Janice', 'Tan', 'Ops', 'Janice.Tan@allinone.com.sg', 2),
(151118, 'Oliver', 'Lim', 'Ops', 'Oliver.Lim@allinone.com.sg', 2),
(151146, 'Janice', 'Lim', 'Ops', 'Janice.Lim@allinone.com.sg', 2),
(151198, 'Michael', 'Tong', 'Ops', 'Michael.Tong@allinone.com.sg', 2),
(151266, 'Noah', 'Tong', 'Ops', 'Noah.Tong@allinone.com.sg', 2),
(151288, 'Mary', 'Heng', 'Ops', 'Mary.Heng@allinone.com.sg', 2),
(151408, 'Oliver', 'Loh', 'Ops', 'Oliver.Loh@allinone.com.sg', 2),
(160008, 'Sally', 'Loh', 'HR', 'Sally.Loh@allinone.com.sg', 1),
(160065, 'John', 'Tan', 'HR', 'John.Tan@allinone.com.sg', 1),
(160075, 'James', 'Tan', 'HR', 'James.Tan@allinone.com.sg', 1),
(160076, 'Jack', 'Goh', 'HR', 'Jack.Goh@allinone.com.sg', 1),
(160118, 'Derek', 'Chan', 'HR', 'Derek.Chan@allinone.com.sg', 1),
(160135, 'Jaclyn', 'Ong', 'HR', 'Jaclyn.Ong@allinone.com.sg', 2),
(160142, 'Benjamin', 'Teo', 'HR', 'Benjamin.Teo@allinone.com.sg', 1),
(160143, 'Lucas', 'Lee', 'HR', 'Lucas.Lee@allinone.com.sg', 1),
(160145, 'Mary', 'Wong', 'HR', 'Mary.Wong@allinone.com.sg', 2),
(160146, 'Oliva', 'Yong', 'HR', 'Oliva.Yong@allinone.com.sg', 2),
(160148, 'Henry', 'Lim', 'HR', 'Henry.Lim@allinone.com.sg', 1),
(160155, 'Alexander', 'Heng', 'HR', 'Alexander.Heng@allinone.com.sg', 1),
(160188, 'Emma', 'Toh', 'HR', 'Emma.Toh@allinone.com.sg', 2),
(160212, 'Charlotte', 'The', 'HR', 'Charlotte.The@allinone.com.sg', 2),
(160213, 'Amelia', 'Ng', 'HR', 'Amelia.Ng@allinone.com.sg', 2),
(160218, 'Eva', 'Tan', 'HR', 'Eva.Tan@allinone.com.sg', 2),
(160225, 'Sophia', 'Fu', 'HR', 'Sophia.Fu@allinone.com.sg', 2),
(160258, 'Michael', 'Tong', 'HR', 'Michael.Tong@allinone.com.sg', 2),
(160282, 'Ethan', 'Loh', 'HR', 'Ethan.Loh@allinone.com.sg', 2),
(170166, 'David', 'Yap', 'Finance', 'David.Yap@allinone.com.sg', 3),
(170208, 'Daniel', 'Tan', 'Finance', 'Daniel.Tan@allinone.com.sg', 2),
(170215, 'Mary', 'Wong', 'Finance', 'Mary.Wong@allinone.com.sg', 2),
(170216, 'Jaclyn', 'Ong', 'Finance', 'Jaclyn.Ong@allinone.com.sg', 2),
(170232, 'Jacob', 'Tan', 'Finance', 'Jacob.Tan@allinone.com.sg', 2),
(170233, 'Logan', 'Goh', 'Finance', 'Logan.Goh@allinone.com.sg', 2),
(170238, 'Jackson', 'Chan', 'Finance', 'Jackson.Chan@allinone.com.sg', 2),
(170245, 'Aiden', 'Teo', 'Finance', 'Aiden.Teo@allinone.com.sg', 2),
(170655, 'Samuel', 'Lee', 'Finance', 'Samuel.Lee@allinone.com.sg', 2),
(170866, 'Susan', 'Lim', 'Finance', 'Susan.Lim@allinone.com.sg', 2),
(171008, 'Janice', 'Heng', 'Finance', 'Janice.Heng@allinone.com.sg', 2);


INSERT INTO `registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES
(1, 'COR002', 130001, 'Registered', 'Completed\r'),
(2, 'COR002', 130002, 'Registered', 'Completed\r'),
(3, 'COR002', 140001, 'Registered', 'Completed\r'),
(4, 'COR002', 140002, 'Registered', 'Completed\r'),
(5, 'COR002', 140003, 'Rejected', '\r'),
(6, 'COR002', 140008, 'Registered', 'OnGoing\r'),
(7, 'COR002', 140025, 'Registered', 'OnGoing\r'),
(8, 'COR002', 140036, 'Waitlist', '\r'),
(9, 'COR002', 140078, 'Waitlist', '\r'),
(10, 'COR002', 140102, 'Registered', '\r'),
(11, 'COR002', 140103, 'Registered', '\r'),
(12, 'COR002', 140108, 'Registered', '\r'),
(13, 'COR002', 140115, 'Registered', 'Completed\r'),
(14, 'COR002', 140525, 'Rejected', '\r'),
(15, 'COR002', 140878, 'Registered', 'Completed\r'),
(16, 'COR002', 150075, 'Registered', 'Completed\r'),
(17, 'COR002', 150065, 'Waitlist', '\r'),
(18, 'COR002', 150076, 'Waitlist', '\r'),
(19, 'COR002', 150118, 'Registered', 'Completed\r'),
(20, 'COR002', 150142, 'Registered', 'OnGoing\r'),
(21, 'COR002', 150143, 'Registered', 'OnGoing\r'),
(22, 'COR002', 150148, 'Registered', '\r'),
(23, 'COR002', 150155, 'Rejected', '\r'),
(24, 'COR002', 150776, 'Registered', '\r'),
(25, 'COR002', 150095, 'Registered', '\r'),
(26, 'COR002', 150085, 'Waitlist', '\r'),
(27, 'COR002', 150096, 'Waitlist', '\r'),
(28, 'COR002', 150138, 'Registered', 'Completed\r'),
(29, 'COR002', 150162, 'Registered', 'Completed\r'),
(30, 'COR002', 150163, 'Registered', 'Completed\r'),
(31, 'COR002', 150168, 'Registered', 'Completed\r'),
(32, 'COR002', 150175, 'Rejected', '\r'),
(33, 'COR002', 150796, 'Registered', 'OnGoing\r'),
(34, 'COR002', 150125, 'Registered', 'OnGoing\r'),
(35, 'COR002', 150115, 'Waitlist', '\r'),
(36, 'COR002', 150126, 'Waitlist', '\r'),
(37, 'COR002', 150192, 'Registered', '\r'),
(38, 'COR002', 150193, 'Registered', '\r'),
(39, 'COR002', 150198, 'Registered', '\r'),
(40, 'COR002', 150205, 'Registered', 'Completed\r'),
(41, 'COR002', 150615, 'Rejected', '\r'),
(42, 'COR002', 150968, 'Registered', 'Completed\r'),
(43, 'COR002', 150166, 'Registered', 'Completed\r'),
(44, 'COR002', 150208, 'Waitlist', '\r'),
(45, 'COR002', 150232, 'Waitlist', '\r'),
(46, 'COR002', 150233, 'Registered', 'Completed\r'),
(47, 'COR002', 150238, 'Registered', 'OnGoing\r'),
(48, 'COR002', 150245, 'Registered', 'OnGoing\r'),
(49, 'COR002', 150655, 'Registered', '\r'),
(50, 'COR002', 150866, 'Rejected', '\r'),
(51, 'COR002', 150215, 'Registered', '\r'),
(52, 'COR002', 150258, 'Registered', '\r'),
(53, 'COR002', 150282, 'Waitlist', '\r'),
(54, 'COR002', 150283, 'Waitlist', '\r'),
(55, 'COR002', 150288, 'Registered', 'Completed\r'),
(56, 'COR002', 150295, 'Registered', 'Completed\r'),
(57, 'COR002', 150705, 'Registered', 'Completed\r'),
(58, 'COR002', 150916, 'Registered', 'Completed\r'),
(59, 'COR002', 151058, 'Rejected', '\r'),
(60, 'COR002', 150265, 'Registered', 'OnGoing\r'),
(61, 'COR002', 150318, 'Registered', 'OnGoing\r'),
(62, 'COR002', 150342, 'Waitlist', '\r'),
(63, 'COR002', 150343, 'Waitlist', '\r'),
(64, 'COR002', 150348, 'Registered', '\r'),
(65, 'COR002', 150355, 'Registered', '\r'),
(66, 'COR002', 150765, 'Registered', '\r'),
(67, 'COR002', 150976, 'Registered', 'Completed\r'),
(68, 'COR002', 151118, 'Rejected', '\r'),
(69, 'COR002', 150356, 'Registered', 'Completed\r'),
(70, 'COR002', 150422, 'Registered', 'Completed\r'),
(71, 'COR002', 150423, 'Waitlist', '\r'),
(72, 'COR002', 150428, 'Waitlist', '\r'),
(73, 'COR002', 150435, 'Registered', 'Completed\r'),
(74, 'COR002', 150845, 'Registered', 'OnGoing\r'),
(75, 'COR002', 151056, 'Registered', 'OnGoing\r'),
(76, 'COR002', 151198, 'Registered', '\r'),
(77, 'COR002', 150445, 'Rejected', '\r'),
(78, 'COR002', 150488, 'Registered', '\r'),
(79, 'COR002', 150513, 'Registered', 'Completed\r'),
(80, 'COR002', 150518, 'Waitlist', '\r'),
(81, 'COR002', 150525, 'Waitlist', '\r'),
(82, 'COR002', 150935, 'Registered', 'Completed\r'),
(83, 'COR002', 151146, 'Registered', 'Completed\r'),
(84, 'COR002', 151288, 'Registered', 'Completed\r'),
(85, 'COR002', 150555, 'Registered', 'OnGoing\r'),
(86, 'COR002', 150566, 'Rejected', '\r'),
(87, 'COR002', 150632, 'Registered', 'OnGoing\r'),
(88, 'COR002', 150638, 'Registered', '\r'),
(89, 'COR002', 150645, 'Waitlist', '\r'),
(90, 'COR002', 151055, 'Waitlist', '\r'),
(91, 'COR002', 151266, 'Registered', '\r'),
(92, 'COR002', 151408, 'Registered', '\r'),
(93, 'COR002', 150695, 'Registered', 'Completed\r'),
(94, 'COR002', 160008, 'Registered', 'Completed\r'),
(95, 'COR002', 160075, 'Rejected', '\r'),
(96, 'COR002', 160076, 'Registered', 'Completed\r'),
(97, 'COR002', 160142, 'Registered', 'Completed\r'),
(98, 'COR002', 160143, 'Waitlist', '\r'),
(99, 'COR002', 160148, 'Waitlist', '\r'),
(100, 'COR002', 160155, 'Registered', 'OnGoing\r'),
(101, 'COR002', 160145, 'Registered', 'OnGoing\r'),
(102, 'COR002', 160135, 'Registered', '\r'),
(103, 'COR002', 160146, 'Registered', '\r'),
(104, 'COR002', 160188, 'Rejected', '\r'),
(105, 'COR002', 160213, 'Registered', '\r'),
(106, 'COR002', 160225, 'Registered', 'Completed\r'),
(107, 'COR002', 160258, 'Waitlist', '\r'),
(108, 'COR002', 160282, 'Waitlist', '\r'),
(109, 'COR002', 151008, 'Registered', '\r'),
(110, 'COR002', 150216, 'Waitlist', '\r'),
(111, 'SAL004', 140001, 'Registered', 'Completed\r'),
(112, 'SAL004', 140002, 'Registered', 'Completed\r'),
(113, 'SAL003', 140003, 'Registered', 'Completed\r'),
(114, 'SAL003', 140004, 'Registered', 'OnGoing\r'),
(115, 'SAL004', 140008, 'Rejected', '\r'),
(116, 'SAL003', 140025, 'Registered', 'OnGoing\r'),
(117, 'SAL004', 140078, 'Registered', '\r'),
(118, 'SAL004', 140102, 'Waitlist', '\r'),
(119, 'SAL003', 140103, 'Waitlist', '\r'),
(120, 'SAL003', 140108, 'Registered', 'Completed\r'),
(121, 'SAL004', 140115, 'Registered', 'Completed\r'),
(122, 'SAL004', 140525, 'Registered', 'Completed\r'),
(123, 'SAL003', 140736, 'Registered', 'OnGoing\r'),
(124, 'SAL003', 140878, 'Rejected', '\r'),
(125, 'tch002', 150075, 'Registered', '\r'),
(126, 'tch003', 150065, 'Waitlist', '\r'),
(127, 'tch005', 150118, 'Registered', 'Completed\r'),
(128, 'tch001', 150143, 'Registered', 'Completed\r'),
(129, 'tch002', 150148, 'Registered', 'OnGoing\r'),
(130, 'tch003', 150155, 'Rejected', '\r'),
(131, 'tch001', 150095, 'Waitlist', '\r'),
(132, 'tch002', 150085, 'Waitlist', '\r'),
(133, 'tch003', 150096, 'Registered', 'Completed\r'),
(134, 'tch005', 150162, 'Registered', 'Completed\r'),
(135, 'tch001', 150168, 'Rejected', '\r'),
(136, 'tch005', 150938, 'Waitlist', '\r'),
(137, 'tch001', 150115, 'Registered', 'Completed\r'),
(138, 'tch002', 150126, 'Registered', 'Completed\r'),
(139, 'tch003', 150192, 'Registered', 'Completed\r'),
(140, 'tch005', 150198, 'Rejected', '\r'),
(141, 'tch002', 150826, 'Registered', '\r'),
(142, 'tch003', 150968, 'Waitlist', '\r'),
(143, 'tch005', 150166, 'Registered', 'Completed\r'),
(144, 'tch001', 150232, 'Registered', 'Completed\r'),
(145, 'tch002', 150233, 'Registered', 'OnGoing\r'),
(146, 'tch003', 150238, 'Rejected', '\r'),
(147, 'tch001', 151008, 'Waitlist', '\r'),
(148, 'tch002', 150215, 'Waitlist', '\r'),
(149, 'tch003', 150216, 'Registered', 'Completed\r'),
(150, 'tch005', 150282, 'Registered', 'Completed\r'),
(151, 'tch001', 150288, 'Rejected', '\r'),
(152, 'tch005', 151058, 'Waitlist', '\r'),
(153, 'tch001', 150265, 'Registered', 'Completed\r'),
(154, 'tch002', 150276, 'Registered', 'Completed\r'),
(155, 'tch003', 150318, 'Registered', 'Completed\r'),
(156, 'tch005', 150343, 'Rejected', '\r'),
(157, 'tch002', 150765, 'Registered', '\r'),
(158, 'tch003', 150976, 'Waitlist', '\r'),
(159, 'tch005', 150345, 'Registered', 'Completed\r'),
(160, 'tch001', 150398, 'Registered', 'Completed\r'),
(161, 'tch002', 150422, 'Registered', 'OnGoing\r'),
(162, 'tch003', 150423, 'Rejected', '\r'),
(163, 'tch001', 151056, 'Waitlist', '\r'),
(164, 'tch002', 151198, 'Waitlist', '\r'),
(165, 'tch003', 150445, 'Registered', 'Completed\r'),
(166, 'tch005', 150488, 'Registered', 'Completed\r'),
(167, 'tch001', 150513, 'Rejected', '\r'),
(168, 'tch005', 151146, 'Waitlist', '\r'),
(169, 'tch001', 150555, 'Registered', 'Completed\r'),
(170, 'tch002', 150566, 'Registered', 'Completed\r'),
(171, 'tch003', 150608, 'Registered', 'Completed\r'),
(172, 'tch005', 150633, 'Rejected', '\r'),
(173, 'tch002', 151055, 'Registered', '\r'),
(174, 'tch003', 151266, 'Waitlist', '\r'),
(175, 'tch005', 150695, 'Registered', 'Completed\r'),
(176, 'HRD001', 160008, 'Registered', 'Completed\r'),
(177, 'MGT001', 160075, 'Registered', 'Completed\r'),
(178, 'MGT002', 160065, 'Registered', 'Completed\r'),
(179, 'MGT004', 160118, 'Rejected', '\r'),
(180, 'MGT001', 160148, 'Registered', '\r'),
(181, 'MGT002', 160155, 'Waitlist', '\r'),
(182, 'MGT004', 160135, 'Registered', 'Completed\r'),
(183, 'MGT007', 160146, 'Registered', 'Completed\r'),
(184, 'HRD001', 160188, 'Registered', 'Completed\r'),
(185, 'MGT001', 160212, 'Registered', 'OnGoing\r'),
(186, 'MGT002', 160213, 'Rejected', '\r'),
(187, 'MGT007', 160258, 'Registered', '\r'),
(188, 'MGT001', 160282, 'Waitlist', '\r'),
(189, 'FIN001', 150166, 'Waitlist', '\r'),
(190, 'FIN002', 150208, 'Registered', 'Completed\r'),
(191, 'FIN001', 150232, 'Registered', 'Completed\r'),
(192, 'FIN002', 150233, 'Registered', 'Completed\r'),
(193, 'FIN001', 150238, 'Registered', 'OnGoing\r'),
(194, 'FIN002', 150245, 'Rejected', '\r'),
(195, 'FIN001', 150655, 'Waitlist', '\r'),
(196, 'FIN002', 150866, 'Registered', 'Completed\r'),
(197, 'FIN001', 151008, 'Registered', 'Completed\r'),
(198, 'FIN002', 150215, 'Registered', 'Completed\r'),
(199, 'FIN001', 150216, 'Registered', 'OnGoing\r'),
(200, 'MGT001', 140001, 'Registered', 'Completed\r'),
(201, 'MGT001', 150008, 'Registered', 'Completed\r'),
(202, 'MGT001', 150166, 'Registered', 'Completed\r'),
(203, 'COR002', 140004, 'Registered', 'Completed\r'),
(204, 'COR002', 140015, 'Waitlist', '\r'),
(205, 'COR002', 140736, 'Waitlist', '\r'),
(206, 'COR002', 150008, 'Registered', 'Completed\r'),
(207, 'COR002', 150565, 'Registered', '\r'),
(208, 'COR002', 150918, 'Registered', '\r'),
(209, 'COR002', 150585, 'Registered', 'OnGoing\r'),
(210, 'COR002', 150938, 'Rejected', '\r'),
(211, 'COR002', 150826, 'Rejected', '\r'),
(212, 'COR002', 150165, 'Registered', 'OnGoing\r'),
(213, 'COR002', 150275, 'Waitlist', '\r'),
(214, 'COR002', 150276, 'Registered', 'Completed\r'),
(215, 'COR002', 150345, 'Registered', '\r'),
(216, 'COR002', 150398, 'Registered', 'Completed\r'),
(217, 'COR002', 150446, 'Registered', '\r'),
(218, 'COR002', 150512, 'Registered', '\r'),
(219, 'COR002', 150608, 'Registered', 'OnGoing\r'),
(220, 'COR002', 150633, 'Waitlist', '\r'),
(221, 'COR002', 160065, 'Waitlist', '\r'),
(222, 'SAL004', 160118, 'Registered', 'Completed\r'),
(223, 'SAL004', 160142, 'Registered', 'Completed\r'),
(224, 'SAL003', 160143, 'Registered', 'Completed\r'),
(225, 'SAL003', 160148, 'Registered', 'OnGoing\r'),
(226, 'SAL004', 160155, 'Rejected', '\r'),
(227, 'SAL003', 160145, 'Registered', '\r'),
(228, 'SAL004', 160135, 'Waitlist', '\r'),
(229, 'SAL004', 160146, 'Registered', 'Completed\r'),
(230, 'SAL003', 160188, 'Registered', 'Completed\r'),
(231, 'SAL003', 160212, 'Registered', 'OnGoing\r'),
(232, 'SAL004', 160213, 'Rejected', '\r'),
(233, 'SAL004', 160218, 'Waitlist', '\r'),
(234, 'SAL003', 160225, 'Waitlist', '\r'),
(235, 'SAL003', 160258, 'Registered', 'Completed\r'),
(236, 'tch002', 160282, 'Registered', 'Completed\r'),
(237, 'tch003', 150166, 'Rejected', '\r'),
(238, 'tch005', 150208, 'Waitlist', '\r'),
(239, 'tch001', 150245, 'Rejected', '\r'),
(240, 'tch002', 150655, 'Registered', '\r'),
(241, 'tch003', 150866, 'Waitlist', '\r'),
(242, 'tch005', 151008, 'Registered', 'Completed\r'),
(243, 'tch001', 150215, 'Registered', 'Completed\r'),
(244, 'tch005', 150216, 'Registered', 'OnGoing\r'),
(245, 'COR001', 130001, 'Registered', 'Completed\r'),
(246, 'COR006', 140001, 'Waitlist', '\r'),
(247, 'FIN001', 140002, 'Waitlist', '\r'),
(248, 'FIN002', 140003, 'Registered', 'Completed\r'),
(249, 'FIN003', 140004, 'Registered', 'OnGoing\r'),
(250, 'HRD001', 140008, 'Registered', 'OnGoing\r'),
(251, 'MGT001', 140015, 'Registered', '\r'),
(252, 'MGT002', 140025, 'Rejected', '\r'),
(253, 'MGT004', 140036, 'Registered', '\r'),
(254, 'MGT007', 140078, 'Registered', 'Completed\r'),
(255, 'SAL001', 140102, 'Waitlist', '\r'),
(256, 'SAL004', 140108, 'Registered', 'Completed\r'),
(257, 'tch001', 140115, 'Registered', 'Completed\r'),
(258, 'tch002', 140525, 'Registered', 'Completed\r'),
(259, 'tch003', 140736, 'Registered', 'OnGoing\r'),
(260, 'tch005', 140878, 'Rejected', '\r'),
(261, 'tch008', 150008, 'Registered', 'OnGoing\r'),
(262, 'tch012', 150075, 'Registered', '\r'),
(263, 'tch013', 150065, 'Waitlist', '\r'),
(264, 'tch014', 150076, 'Waitlist', '\r'),
(265, 'tch015', 150118, 'Registered', '\r'),
(266, 'tch018', 150142, 'Registered', '\r'),
(267, 'tch019', 150143, 'Registered', 'Completed\r'),
(268, 'COR001', 150148, 'Registered', 'Completed\r'),
(269, 'COR006', 150565, 'Registered', 'Completed\r'),
(270, 'FIN001', 150776, 'Registered', 'Completed\r'),
(271, 'FIN002', 150918, 'Waitlist', '\r'),
(272, 'FIN003', 150095, 'Waitlist', '\r'),
(273, 'HRD001', 150085, 'Registered', 'OnGoing\r'),
(274, 'MGT001', 150096, 'Registered', 'OnGoing\r'),
(275, 'MGT002', 150138, 'Registered', '\r'),
(276, 'MGT004', 150162, 'Registered', '\r'),
(277, 'MGT007', 150163, 'Rejected', '\r'),
(278, 'SAL001', 150168, 'Registered', '\r'),
(279, 'SAL003', 150175, 'Registered', 'Completed\r'),
(280, 'SAL004', 150585, 'Waitlist', '\r'),
(281, 'tch001', 150796, 'Waitlist', '\r'),
(282, 'tch002', 150938, 'Registered', 'Completed\r'),
(283, 'tch003', 150125, 'Registered', 'Completed\r'),
(284, 'tch005', 150115, 'Registered', 'Completed\r'),
(285, 'tch008', 150126, 'Registered', 'OnGoing\r'),
(286, 'tch012', 150192, 'Rejected', '\r'),
(287, 'tch013', 150193, 'Registered', 'OnGoing\r'),
(288, 'tch014', 150198, 'Registered', '\r'),
(289, 'tch015', 150205, 'Waitlist', '\r'),
(290, 'tch018', 150615, 'Waitlist', '\r'),
(291, 'tch019', 150826, 'Registered', 'Completed\r'),
(292, 'COR001', 150968, 'Registered', 'Completed\r'),
(293, 'COR006', 150166, 'Registered', 'OnGoing\r'),
(294, 'FIN001', 150208, 'Rejected', '\r'),
(295, 'FIN002', 150232, 'Registered', 'OnGoing\r'),
(296, 'FIN003', 150233, 'Registered', '\r'),
(297, 'HRD001', 150238, 'Waitlist', '\r'),
(298, 'MGT001', 150245, 'Waitlist', '\r'),
(299, 'MGT002', 150655, 'Registered', 'Completed\r'),
(300, 'MGT004', 150866, 'Registered', 'Completed\r'),
(301, 'MGT007', 151008, 'Registered', 'Completed\r'),
(302, 'SAL001', 150215, 'Registered', 'OnGoing\r'),
(303, 'SAL003', 150216, 'Rejected', '\r'),
(304, 'SAL004', 150258, 'Registered', '\r'),
(305, 'tch001', 150282, 'Waitlist', '\r'),
(306, 'tch002', 150283, 'Registered', 'Completed\r'),
(307, 'tch003', 150288, 'Registered', 'Completed\r'),
(308, 'tch005', 150295, 'Registered', 'OnGoing\r'),
(309, 'tch008', 150705, 'Rejected', '\r'),
(310, 'tch012', 150916, 'Waitlist', '\r'),
(311, 'tch013', 151058, 'Waitlist', '\r'),
(312, 'tch014', 150275, 'Registered', 'Completed\r'),
(313, 'tch015', 150265, 'Registered', 'Completed\r'),
(314, 'tch018', 150276, 'Rejected', '\r'),
(315, 'tch019', 150318, 'Waitlist', '\r'),
(316, 'COR001', 150342, 'Registered', 'Completed\r'),
(317, 'COR006', 150348, 'Registered', 'Completed\r'),
(318, 'FIN001', 150355, 'Rejected', '\r'),
(319, 'FIN002', 150765, 'Registered', '\r'),
(320, 'FIN003', 150976, 'Waitlist', '\r'),
(321, 'HRD001', 151118, 'Registered', 'Completed\r'),
(322, 'MGT001', 150345, 'Registered', 'Completed\r'),
(323, 'MGT002', 150356, 'Registered', 'OnGoing\r'),
(324, 'MGT004', 150398, 'Registered', 'Completed\r'),
(325, 'MGT007', 150422, 'Registered', 'Completed\r'),
(326, 'SAL001', 150423, 'Waitlist', '\r'),
(327, 'SAL003', 150428, 'Waitlist', '\r'),
(328, 'SAL004', 150435, 'Registered', 'Completed\r'),
(329, 'tch001', 150845, 'Registered', 'OnGoing\r'),
(330, 'tch002', 151056, 'Registered', 'OnGoing\r'),
(331, 'tch003', 151198, 'Registered', '\r'),
(332, 'tch005', 150445, 'Rejected', '\r'),
(333, 'tch008', 150446, 'Registered', '\r'),
(334, 'tch012', 150488, 'Registered', 'Completed\r'),
(335, 'tch013', 150512, 'Waitlist', '\r'),
(336, 'tch014', 150513, 'Waitlist', '\r'),
(337, 'tch015', 150518, 'Registered', 'Completed\r'),
(338, 'tch018', 150525, 'Registered', 'Completed\r'),
(339, 'tch019', 150935, 'Registered', 'Completed\r'),
(340, 'COR001', 151146, 'Registered', 'OnGoing\r'),
(341, 'COR006', 150555, 'Registered', 'OnGoing\r'),
(342, 'FIN001', 150566, 'Registered', '\r'),
(343, 'FIN002', 150608, 'Waitlist', '\r'),
(344, 'FIN003', 150632, 'Waitlist', '\r'),
(345, 'HRD001', 150633, 'Registered', '\r'),
(346, 'MGT001', 150638, 'Registered', '\r'),
(347, 'MGT002', 150645, 'Registered', 'Completed\r'),
(348, 'MGT004', 151055, 'Registered', 'Completed\r'),
(349, 'MGT007', 151266, 'Rejected', '\r'),
(350, 'SAL001', 151408, 'Registered', 'Completed\r'),
(351, 'SAL003', 150695, 'Registered', 'Completed\r'),
(352, 'SAL004', 160008, 'Waitlist', '\r'),
(353, 'tch001', 160075, 'Waitlist', '\r'),
(354, 'tch002', 160065, 'Registered', 'OnGoing\r'),
(355, 'tch003', 160076, 'Registered', 'OnGoing\r'),
(356, 'tch005', 160118, 'Registered', '\r'),
(357, 'tch008', 160142, 'Registered', '\r'),
(358, 'tch012', 160143, 'Rejected', '\r'),
(359, 'tch013', 160148, 'Registered', '\r'),
(360, 'tch014', 160155, 'Registered', 'Completed\r'),
(361, 'tch015', 160145, 'Waitlist', '\r'),
(362, 'tch018', 160135, 'Waitlist', '\r'),
(363, 'tch019', 160146, 'Registered', 'Completed\r'),
(364, 'COR001', 160188, 'Registered', 'Completed\r'),
(365, 'COR002', 160212, 'Registered', 'Completed\r'),
(366, 'COR006', 160213, 'Registered', 'OnGoing\r'),
(367, 'FIN001', 160218, 'Rejected', '\r'),
(368, 'FIN002', 160225, 'Registered', 'OnGoing\r'),
(369, 'FIN003', 160258, 'Registered', '\r'),
(370, 'HRD001', 160282, 'Waitlist', '\r'),
(371, 'MGT002', 150208, 'Registered', 'Completed\r'),
(372, 'MGT004', 150232, 'Registered', 'Completed\r'),
(373, 'MGT007', 150233, 'Registered', 'Completed\r'),
(374, 'SAL001', 150238, 'Registered', 'OnGoing\r'),
(375, 'SAL003', 150245, 'Rejected', '\r'),
(376, 'SAL004', 150655, 'Registered', 'OnGoing\r'),
(377, 'tch001', 150866, 'Registered', '\r'),
(378, 'tch002', 151008, 'Waitlist', '\r'),
(379, 'tch003', 150215, 'Waitlist', '\r');
