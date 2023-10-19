-- Drops database if it exists and starts new database --
DROP DATABASE IF EXISTS employees_db;

-- Create new database called 'employees_db' -- 
CREATE DATABASE employees_db;
USE employees_db;

-- Create a table titled 'department' -- 
CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table titled 'role' -- 
CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- Create a table titled 'employee' --
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

