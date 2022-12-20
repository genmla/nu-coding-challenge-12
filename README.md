# Company Database Application

## Description

This application lets the use create, read, update, and delete data from a provided company database. It runs from the command line prompt and utilizes node to run the applicaiton form an index.js file. This applicaiton practices mysql queries to add data to the departments, employees, and roles table in the company database. The departments contain information on the department id and name, the roles contain information on the role id, title, salary, and department, the employees contain information on the employee id, first name, last name, role, and manager. 

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

The required dependcies are listed in the package.json file: 
        "console.table": "^0.10.0",
        "inquirer": "8.2.4",
        "mysql2": "^2.2.5",

The user will need to run node index.js from their command line in order to read and respond to the prompts.

## Usage

The user can perform the following in the command line applicaiton to create, read, update, and delete data from the company database: 

    View All Employees
    View All Employees by Manager
    View All Employees by Department
    Add Employee
    Update Employee Role
    Update Employee Manager
    Delete Employee
    View All Roles
    Add Role
    Delete Role
    View All Departments
    Add Department
    Delete Department

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative file path, add it to your README using the following syntax:

[Video Demonstration](https://drive.google.com/file/d/18b2W2w2L6ac8MLZB3fiGFlIzU992SfpN/view)

## Credits

N/A

## License

MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)