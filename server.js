
// Imports necessary programs
// Declares port and initiates Express.js
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cfonts = require('cfonts');
const app = express();
const PORT = 3001;

// Connect to local host and database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gorenotcore1',
  database: 'employees_db',
});

// Test connection to database
connection.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Initiates Express.js to desired port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// Inquirer menu and selection options
const menuPrompt = {
  type: 'list',
  name: 'action',
  message: 'Please select from the list:',
  choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
};
  
  function action(req) {

    switch (req) {
      case 'View Departments':
        runQuery('SELECT id AS DepartmentID, name AS DepartmentName FROM department');
        break;
      case 'View Roles':
        runQuery('SELECT id AS RoleID, title AS JobTitle FROM role');
        break;
      case 'View Employees':
        runQuery('SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS JobTitle, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id');
        break;
      case 'Add Department':
        runQuery()

      case 'Exit':
        console.log('Goodbye!');
        connection.end();
        break;
    }
  };

  function runQuery(req) {
    connection.promise().query(req)
    .then(([results, fields]) => {
      console.table(results);

      inquirer.prompt(menuPrompt)
      .then((answers) => action(answers.action))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } 

  function mainMenu() {
    inquirer.prompt(menuPrompt)
    .then((answers) => action(answers.action));
  }

  function runProgram() {
    cfonts.say('Mytholo-Teck|Incorporated,|Inc.', {
      font: 'slick',
      align: 'center',
      colors: ['greenBright', 'gray'],
      background: 'transparent',
      env: 'node'
    });

    cfonts.say('Welcome to the Employee Manager Database\!', {
      font: 'chrome',
      align: 'center',
      colors: ['greenBright', 'blueBright', 'gray'],
      background: 'transparent',
      env: 'node'
    });
    mainMenu();
  }

  runProgram();
