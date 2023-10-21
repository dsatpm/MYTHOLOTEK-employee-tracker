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
	choices: [
		'View Departments',
		'View Roles',
		'View Employees',
		'Add Department',
		'Add Role',
		'Add Employee',
		'Update Employee Role',
		'Exit',
	],
};

// Allows user to view tables of selected option from menu
function action(req) {
	switch (req) {
		case 'View Departments':
			runQuery(
				'SELECT id AS DepartmentID, name AS DepartmentName FROM department'
			);
			break;
		case 'View Roles':
			runQuery('SELECT id AS RoleID, title AS JobTitle FROM role');
			break;
		case 'View Employees':
			runQuery(
				'SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS JobTitle, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id'
			);
			break;
		case 'Add Department':
			addDepartment();
			break;
		case 'Add Role':
			addRole();
			break;
		case 'Add Employee':
			addEmployee();
			break;
		case 'Update Employee Role':
			updateEmployee();
			break;
		case 'Exit':
			console.log('Goodbye!');
			connection.end();
			break;
	}
}

// Adds new department to database
function addDepartment() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Enter department you wish to add:',
			},
		])
		.then((res) => {
			connection
				.promise()
				.execute('INSERT INTO department (name) VALUES (?)', [
					res.name,
				]);
		})
		.then(() => {
			console.log('Department successfully added!');
			mainMenu();
		})
		.catch((error) => {
			console.log('Error', error);
			return;
		});
}

// Adds new employee role to database
function addRole() {
	connection
		.promise()
		.query('SELECT id, name FROM department')
		.then(([departments]) => {
			// Map the departments
			const departmentChoices = departments.map((department) => ({
				name: department.name,
				value: department.id,
			}));

			inquirer
				.prompt([
					{
						type: 'input',
						name: 'title',
						message: 'Add new Job Title',
					},
					{
						type: 'list',
						name: 'salary',
						message: 'Enter salary:',
						choices: [
							50000, 55000, 60000, 65000, 70000, 75000, 80000,
						],
					},
					{
						type: 'list',
						name: 'department_id',
						message: 'Which department does this job belong to?',
						choices: departmentChoices,
					},
				])
				.then((res) => {
					connection
						.promise()
						.execute(
							'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
							[res.title, res.salary, res.department_id]
						)
						.then(() => {
							console.log('Role successfully added!');
							mainMenu();
						})
						.catch((error) => {
							console.error('Error', error);
						});
				});
		})
		.catch((error) => {
			console.error('Error', error);
		});
}

// Adds new employee to employee database
function addEmployee() {
	connection
		.promise()
		.query('SELECT id, title FROM role')
		.then(([roles]) => {
			// Map the roles
			const roleChoices = roles.map((role) => ({
				name: role.title,
				value: role.id,
			}));

			inquirer
				.prompt([
					{
						type: 'input',
						name: 'first_name',
						message: "Enter new employee's first name",
					},
					{
						type: 'input',
						name: 'last_name',
						message: "Enter new employee's last name",
					},
					{
						type: 'list',
						name: 'role_id',
						message: "What is this employee's job title?",
						choices: roleChoices,
					},
					{
						type: 'confirm',
						name: 'is_manager',
						message: 'Is this employee a manager?',
					},
				])
				.then((res) => {
					// Fetch the role title based on the selected role_id
					const chosenRoleId = res.role_id;
					const chosenRole = roles.find(
						(role) => role.id === chosenRoleId
					);

					if (!chosenRole) {
						console.error(
							'Role not found. Please check the job title.'
						);
						mainMenu();
					}

					const roleId = chosenRole.id;
					connection
						.promise()
						.execute(
							'INSERT INTO employee (first_name, last_name, role_id, is_manager) VALUES (?, ?, ?, ?)',
							[
								res.first_name,
								res.last_name,
								roleId,
								res.is_manager,
							]
						)
						.then(() => {
							console.log('Employee successfully added!');
							mainMenu();
						})
						.catch((error) => {
							console.error('Error:', error);
						});
				});
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

// Updates employee information
function updateEmployee() {
	connection
		.promise()
		.query('SELECT id, title FROM role')
		.then(([roles]) => {
			// Map the roles
			const roleChoices = roles.map((role) => ({
				name: role.title,
				value: role.id,
			}));

			inquirer
				.prompt([
					{
						type: 'input',
						name: 'employeeId',
						message: 'Enter the ID of the employee being updated',
					},
					{
						type: 'list',
						name: 'newRole',
						message: 'What is the new job title for this employee?',
						choices: roleChoices,
					},
				])
				.then((res) => {
					connection
						.promise()
						.execute(
							'UPDATE employee SET role_id = ? WHERE id = ?',
							[res.newRole, res.employeeId]
						)
						.then(() => {
							console.log('Employee role successfully updated!');
							mainMenu();
						})
						.catch((error) => {
							console.error('Error:', error);
							return;
						});
				});
		});
}

// Queries the database and returns results
function runQuery(req) {
	connection
		.promise()
		.query(req)
		.then(([results, fields]) => {
			console.table(results);

			inquirer
				.prompt(menuPrompt)
				.then((answers) => action(answers.action));
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

// Displays the main menu
function mainMenu() {
	inquirer.prompt(menuPrompt).then((answers) => action(answers.action));
}

// Runs 'Employee Database' program, initializes ASCII logo and sub-logo
function runProgram() {
	cfonts.say('Mytholo-Teck|Incorporated,|Inc.', {
		font: 'slick',
		align: 'center',
		colors: ['greenBright', 'gray'],
		background: 'transparent',
		env: 'node',
	});

	cfonts.say('Welcome to the Employee Manager Database!', {
		font: 'chrome',
		align: 'center',
		colors: ['greenBright', 'blueBright', 'gray'],
		background: 'transparent',
		env: 'node',
	});
	mainMenu();
}

runProgram();
