**********mysql queries***********

CREATE DATABASE HIGHDUNES;

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    empCode VARCHAR(20) UNIQUE,
    name VARCHAR(30),
    dob DATE,
    gender ENUM('M', 'F') NOT NULL CHECK (gender IN ('M', 'F')),
    phno VARCHAR(15),
    email VARCHAR(50),
    address VARCHAR(200),
    emPhNo VARCHAR(15),
    emName VARCHAR(30),
    jobTitle VARCHAR(30),
    dateOfHire DATE,
    dateOfTermination DATE,
    empType VARCHAR(20),
    salary DECIMAL(10, 2),
    hrsWorked INT,
    holidaySalary DECIMAL(10, 2),
    holidaysWorked INT,
    overTimeSalary DECIMAL(10, 2),
    overTimeHrs INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastChanged TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role ENUM('admin', 'super-admin', 'supervisor', 'none') NOT NULL DEFAULT 'none',
    status ENUM('on-work', 'on-vacation', 'on-leave', 'available') NOT NULL DEFAULT 'available',
    comments VARCHAR(500)
);

CREATE TABLE client (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    clientCode VARCHAR(20) UNIQUE,
    name VARCHAR(30),
    email VARCHAR(50),
    mob1 VARCHAR(15),
    mob2 VARCHAR(15),
    clientType VARCHAR(30),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastChanged TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(30),
    comments VARCHAR(500)
);

CREATE TABLE project (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    projectCode VARCHAR(20) UNIQUE, 
    clientId INT NOT NULL, 
    clientName VARCHAR(30) NOT NULL, 
    name VARCHAR(50), 
    projectDesc VARCHAR(200), 
    supervisor INT NOT NULL, 
    supervisorName VARCHAR(30) NOT NULL, 
    quantityOfService VARCHAR(50),
    serviceType VARCHAR(50),
    materialsRequired JSON,
    materialsUsed JSON,
    hrsTaken INT,
    team JSON,
    startDate DATE,
    endDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastChanged TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(50),
    comments VARCHAR(500),
    CONSTRAINT fk_client FOREIGN KEY (clientId) REFERENCES client(id),
    CONSTRAINT fk_supervisor FOREIGN KEY (supervisor) REFERENCES employee(id)
);

***** not sure about tables below, schema will be changed ******

CREATE TABLE dutysheet (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dutyCode VARCHAR(20) UNIQUE,
    projectId INT NOT NULL,
    empId INT NOT NULL,
    numberOfHours INT,
    target VARCHAR(10),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastChanged TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(50),
    comments VARCHAR(500),
    CONSTRAINT fk_project FOREIGN KEY (projectId) REFERENCES project(id),
    CONSTRAINT fk_employee FOREIGN KEY (empId) REFERENCES employee(id)
);

CREATE TABLE deductionsheet (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    timestamp DATE,
    amount INT,
    empId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastChanged TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(50),
    CONSTRAINT fk_employee2 FOREIGN KEY (empId) REFERENCES employee(id)
);