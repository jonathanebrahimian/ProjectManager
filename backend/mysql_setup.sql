USE db;

-- create Materials Table
CREATE TABLE `db`.`materials` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `status` INT,
    `inventory` INT,
    `quality` INT,
    `supplierUser` INT,
    PRIMARY KEY(`id`),
    sitID INT NOT NULL,
    FOREIGN KEY (sitID) REFERENCES sites(siteID)  ON DELETE CASCADE
);

-- Users Lauren
create table users (
    userID int
	AUTO_INCREMENT primary key
    , userType int
    , firstName varchar(50)
    , lastName varchar (50)
    , username varchar (50)
    , email VARCHAR(100)
    , password varchar (50)
);

CREATE TABLE roster (
    `rosterID` INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`rosterID`),
    siteID INT NOT NULL,
    FOREIGN KEY (siteID) REFERENCES sites(siteID)  ON DELETE CASCADE,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID)  ON DELETE CASCADE
);

-- Equipment Lauren
create table equipment (
	equipmentID int not null
		AUTO_INCREMENT primary key
    , equipmentName varchar(20)
    , location varchar(20)
    , siteID int
    , foreign key (siteID) references sites (siteID)
    , userID int default null
    , foreign key (userID) references users (userID)
);


-- create Goals Table
CREATE TABLE goals(
    goalID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    goalName varchar(20),
    goalNotes varchar(100),
    materials varchar(30),
    endDate DATE,
    userID INT,
    FOREIGN KEY (userID) REFERENCES userID(userID)  ON DELETE CASCADE,
    maeterialID INT,
    FOREIGN KEY (maeterialID) REFERENCES materials(maeterialID)  ON DELETE CASCADE,
    siteID INT NOT NULL,
    FOREIGN KEY (siteID) REFERENCES sites(siteID)  ON DELETE CASCADE
);

CREATE TABLE sites(
   siteID INT AUTO_INCREMENT PRIMARY KEY,
   description varchar(250),
   title VARCHAR(50),
   startDate DATE,
   endDate DATE,
   location varchar(100)
);