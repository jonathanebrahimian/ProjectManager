-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create Materials Table
CREATE TABLE `db`.`Materials` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `status` INT,
    `quality` INT,
    FOREIGN KEY(`project`) REFERENCES `Project`.`id`,
    `supplierUser` INT,
    PRIMARY KEY(`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    

);

-- Users Lauren
create table users (
    userID int
	AUTO_INCREMENT primary key
    , userType int
    , userFirst varchar(50)
    , userLast varchar (50)
    , project int
    , foreign key (project) references goals (goalID)
    , reportsTo int default null
    , foreign key (reportsTo) references users (userID)
);


-- create Goals Table
CREATE TABLE goals(
    goalID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (goalID) REFERENCES 
    goalName varchar(20),
    goalNotes varchar(100),
    materials varchar(30),
    constructionID INT
);


-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


