const header = `
███╗   ███╗██╗   ██╗████████╗██╗  ██╗ ██████╗ ██╗      ██████╗    ████████╗███████╗ ██████╗██╗  ██╗    
████╗ ████║╚██╗ ██╔╝╚══██╔══╝██║  ██║██╔═══██╗██║     ██╔═══██╗   ╚══██╔══╝██╔════╝██╔════╝██║ ██╔╝    
██╔████╔██║ ╚████╔╝    ██║   ███████║██║   ██║██║     ██║   ██║█████╗██║   █████╗  ██║     █████╔╝     
██║╚██╔╝██║  ╚██╔╝     ██║   ██╔══██║██║   ██║██║     ██║   ██║╚════╝██║   ██╔══╝  ██║     ██╔═██╗     
██║ ╚═╝ ██║   ██║      ██║   ██║  ██║╚██████╔╝███████╗╚██████╔╝      ██║   ███████╗╚██████╗██║  ██╗    
╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝       ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    
██╗███╗   ██╗ ██████╗ ██████╗ ██████╗ ██████╗  ██████╗ ██████╗  █████╗ ████████╗███████╗██████╗        
██║████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗       
██║██╔██╗ ██║██║     ██║   ██║██████╔╝██████╔╝██║   ██║██████╔╝███████║   ██║   █████╗  ██║  ██║       
██║██║╚██╗██║██║     ██║   ██║██╔══██╗██╔═══╝ ██║   ██║██╔══██╗██╔══██║   ██║   ██╔══╝  ██║  ██║       
██║██║ ╚████║╚██████╗╚██████╔╝██║  ██║██║     ╚██████╔╝██║  ██║██║  ██║   ██║   ███████╗██████╔╝▄█╗    
╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝ ╚═╝    
██╗███╗   ██╗ ██████╗                                                                                  
██║████╗  ██║██╔════╝                                                                                  
██║██╔██╗ ██║██║                                                                                       
██║██║╚██╗██║██║                                                                                       
██║██║ ╚████║╚██████╗██╗                                                                               
╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝                                                                               
                                                                                                   `;

const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gorenotcore1',
  database: 'employees_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const menuPrompt = {
  type: 'list',
  name: 'action',
  message: 'Please select from the list:',
  choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
};

  console.log(header);
  console.log('Welcome to the Employee Manager at Mytholo-Teck Incorporated, Inc.!');

// async function runProgram() {


//   while (true) {
//     const { menuChoice } = await inquirer.prompt(menuPrompt);

//     switch (menuChoice) {
//       case 'View Departments':
//         break;
//       case 'View Roles':
//         break;
//       case 'View Employees':
//         break;
//       case 'Add Department':
//         break;
//       case 'Add Role':
//         break;
//       case 'Add Employee':
//         break;
//       case 'Update Employee Role':
//         break;
//       case 'Exit':
//         console.log('Goodbye!');
//         return;
//     }
//   }
// }

// runProgram();
