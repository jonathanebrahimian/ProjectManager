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



create table roster(
    id int
        AUTO_INCREMENT primary key,
    sitID INT NOT NULL,
    FOREIGN KEY (sitID) REFERENCES sites(siteID)  ON DELETE CASCADE,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID)  ON DELETE CASCADE

);



-- Users Lauren
create table users (
    userID int
	AUTO_INCREMENT primary key
    , userType int
    , first_name varchar(50)
    , last_name varchar (50)
    , username varchar (50)
    , password varchar (50)
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
    sitID INT NOT NULL,
    FOREIGN KEY (sitID) REFERENCES sites(siteID)  ON DELETE CASCADE
);

CREATE TABLE sites(
   siteID INT AUTO_INCREMENT PRIMARY KEY,
   description varchar(250),
   start_date DATE,
   end_date DATE,
   location varchar(100)
);