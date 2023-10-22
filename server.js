// Imports necessary programs
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');

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

// Inquirer menu and selection options
const menuPrompt = {
	type: 'list',
	name: 'action',
	message: 'Please select from the list:',
	choices: [
		'View Departments',
		'View Roles',
		'View Employees',
    'View Employees by Department',
		'Add Department',
    'Remove Department',
		'Add Role',
    'Remove Role',
		'Add Employee',
		'Update Employee Role',
    'Remove Employee',
		'Exit',
	],
};

// Displays information from database depending on user selection
function action(req) {
	switch (req) {
		case 'View Departments':
			runQuery(
				'SELECT id AS DepartmentID, name AS DepartmentName FROM department'
			);
			break;
		case 'View Roles':
			runQuery('SELECT role.title AS JobTitle, role.id AS RoleID, department.name AS Department, role.salary FROM role JOIN department ON role.department_id = department.id');
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
    case 'View By Department':
      viewByDepartment();
      break;
    case 'Remove Department':
      deleteDepartment();
      break;
    case 'Remove Job Title':
      deleteRole();
      break;
    case 'Remove Employee':
      deleteEmployee();
      break;
		case 'Exit':
			console.log('Goodbye!');
			connection.end();
			break;
	}
}

// Prompt to for adding new department
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
      // Inserts department into database
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
			mainMenu();
		});
}

function viewByDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter ID of the department to list all employees within selected department',
    },
  ])
  .then((res) => {
    const departmentId = res.departmentId;
    connection.promise().query('SELECT * FROM employee WHERE department_id = ?', [departmentId])
  })
  .then(([employeesByDept]) => {
    console.table(employeesByDept);
    mainMenu();
  })
  .catch((error) => {
    console.error('Error', error);
    mainMenu();
  });
}

function deleteDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department to delete',
    },
  ])
  .then((deleteDepartment) => {
    const departmentId = deleteDepartment.departmentId;
    connection.promise().execute('DELETE FROM department WHERE id = ?', [departmentId])
  })
  .then(() => {
    console.log('Department removed successfully!');
    mainMenu();
  })
  .catch((error) => {
    console.error('Error:', error);
    mainMenu();
  })
}

// Prompts for adding new role to database
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
          // Inserts new role into role database
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
              mainMenu();
						});
          });
      })
}

function deleteRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter ID of the Job Title to delete',
    },
  ])
  .then((deleteRole) => {
    const roleId = deleteRole.roleId;
    connection.promise().execute('DELETE FROM role WHERE id = ?', [roleId])
  })
  .then(() => {
    console.log('Removed role successfully!');
    mainMenu();
  })
  .catch((error) => {
    console.error('Error', error);
    mainMenu();
  });
}

// Prompt to add new employee to database
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
          // Inserts new employee into employee database
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
              mainMenu();
						});
				});
      })
}

// Prompt to update current employee data
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
          // Updates employee data
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
							mainMenu();
						});
				});
		});
}

function deleteEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter ID of employee to remove',
    },
  ])
  .then((removeEmployee) => {
    const employeeId = removeEmployee.employeeId;
    connection.promise().execute('DELETE FROM employee WHERE id = ?', [employeeId])
  })
  .then(() => {
    console.log('Employee successfully removed!');
    mainMenu();
  })
  .catch((error) => {
    console.error('Error', error);
    mainMenu();
  });

}

// Queries the database for viewing departments
function runQuery(req) {
	connection
		.promise()
		.query(req)
		.then(([results, fields]) => {
			console.table(results);
      mainMenu();
		})
		.catch((error) => {
			console.error('Error:', error);
      mainMenu();
		});
}

// Displays the prompt menu
function mainMenu() {
	inquirer.prompt(menuPrompt).then((answers) => action(answers.action));
}

// Runs 'Employee Database' program, initializes ASCII logo header and sub-header
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
