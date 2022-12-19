const sequelize = require('./config/connection');
const mysql = require('mysql2');
const inquirer = require("inquirer");
require('console.table')
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

function viewAllDepts() {
    const sql = `SELECT id, name AS Department FROM departments`;

    db.query(sql, (err, results) => {
        console.table(results);
        prompting();
    });
}

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department ID?',
                name: 'DeptID',
            },
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'DeptName',
            }
        ])
        .then((answer) => {
            const sql = `INSERT INTO departments (id, name) VALUES (${answer.DeptID}, "${answer.DeptName}")`;

            db.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(`${answer.DeptName} Department added to the Company Database with the Department ID of ${answer.DeptID}.`);
                prompting();
            });
        })
}

function viewAllRoles() {
    const sql = `SELECT id, title AS Title, salary AS Salary, department_id AS Department FROM roles`;
    db.query(sql, (err, results) => {
        console.table(results);
        prompting();
    });
}

function addRole() {
    const sql = `SELECT id, name FROM departments`;
    db.query(sql, (err, results) => {
        let choices = [];
        for (let i = 0; i < results.length; i++) {
            choices.push(results[i].id + " " + results[i].name);
        }
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the role ID?',
                    name: 'RoleID',
                },
                {
                    type: 'input',
                    message: 'What is the role title?',
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: 'What is the role salary?',
                    name: 'roleSalary',
                },
                {
                    message: 'To what department does this role belong?',
                    name: 'roleDept',
                    type: 'list',
                    choices: choices
                }
            ])
            .then((answer) => {
                const arr = answer.roleDept.split(" ");
                const roleDeptID = parseInt(arr[0]);
                const sql = `INSERT INTO roles (id, title, salary, department_id) VALUES (${answer.RoleID}, "${answer.roleTitle}", ${answer.roleSalary}, ${roleDeptID})`;

                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`The ${answer.roleTitle} role was added to the Company Database.`);
                    prompting();
                });
            })
    })
}

function viewAllEmployees() {
    const sql = `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, roles.salary As Salary, departments.name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = e.role_id INNER JOIN departments ON departments.id = roles.department_id ORDER BY departments.id, Manager`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        prompting();
    });
}

function orderAllEmployeesByManager() {
    const sql = `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, roles.salary As Salary, departments.name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = e.role_id INNER JOIN departments ON departments.id = roles.department_id ORDER BY Manager`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        prompting();
    });
}

function orderAllEmployeesByDept() {
    const sql = `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, roles.title AS Title, roles.salary As Salary, departments.name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = e.role_id INNER JOIN departments ON departments.id = roles.department_id ORDER BY Department`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            const sql =
                db.query(sql, (err, results) => {
                    console.table(results);
                    prompting();
                })
        }

    });
}

function viewEmployeesByManager() {
    const sql = 'SELECT * from employees';
    db.query(sql, (err, results) => {
        let empSelection = results.map(function (employees) {
            let empSelected = {
                name: employees.first_name + " " + employees.last_name,
                value: employees.id
            }
            return empSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which manager's direct reports do you want to view?`,
                    name: 'manager',
                    type: 'list',
                    choices: empSelection
                }
            ])
            .then(function (answer) {
                const sql = `CREATE OR REPLACE VIEW ManagerView AS SELECT CONCAT(first_name, " ", last_name) AS Employees FROM employees WHERE manager_id = ${answer.manager}`;
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        const sql = `SELECT * FROM ManagerView`;
                        db.query(sql, (err, results) => {
                            console.table(results);
                            prompting();
                        })
                    }

                });
            })
    })
}
function addEmployee() {
    const sql = `SELECT * from roles`;
    db.query(sql, (err, results) => {
        let roleSelction = results.map(function (roles) {
            let roleSelected = {
                name: roles.title,
                value: roles.id
            }
            return roleSelected;
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the employee's ID?`,
                    name: 'empID',
                },
                {
                    type: 'input',
                    message: `What is the employee's first name?`,
                    name: 'empFirst',
                },
                {
                    type: 'input',
                    message: `What is the employee's last name?`,
                    name: 'empLast',
                },
                {
                    message: `What is the employee's role? Please slect the appropriate id`,
                    name: 'empRole',
                    type: 'list',
                    choices: roleSelction
                }
            ])
            .then(function (answer) {
                const sql = 'SELECT * from employees';
                db.query(sql, (err, results) => {
                    let manSelection = results.map(function (employees) {
                        let manSelected = {
                            name: employees.first_name + " " + employees.last_name,
                            value: employees.id
                        }
                        return manSelected;
                    })
                    inquirer
                        .prompt([
                            {
                                message: `Who is the employee manager?`,
                                name: 'empMan',
                                type: 'list',
                                choices: manSelection
                            }
                        ])
                        .then(function (manAnswer) {
                            const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (${answer.empID}, "${answer.empFirst}", "${answer.empLast}", ${answer.empRole}, ${manAnswer.empMan})`;

                            db.query(sql, (err, results) => {
                                if (err) {
                                    console.log(err)
                                }
                                console.log(`${answer.empFirst} ${answer.empLast} was added to the Company Database.`);
                                prompting();
                            });
                        })
                })
            })
    })
};

function updateEmployeeRole() {
    const sql = 'SELECT * from employees';
    db.query(sql, (err, results) => {
        let empSelection = results.map(function (employees) {
            let empSelected = {
                name: employees.first_name + " " + employees.last_name,
                value: employees.id
            }
            return empSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which employee's role do you want to update?`,
                    name: 'employee',
                    type: 'list',
                    choices: empSelection
                }
            ])
            .then(function (answer) {
                const sql = `SELECT * from roles`;
                db.query(sql, (err, results) => {
                    let roleSelction = results.map(function (roles) {
                        let roleSelected = {
                            name: roles.title,
                            value: roles.id
                        }
                        return roleSelected;
                    })
                    inquirer
                        .prompt([
                            {
                                message: `What is the employee's new role?`,
                                name: 'newRole',
                                type: 'list',
                                choices: roleSelction
                            }
                        ])
                        .then(function (roleAnswer) {
                            const sql = `UPDATE employees SET role_id = ${roleAnswer.newRole} WHERE id = ${answer.employee}`;

                            db.query(sql, (err, results) => {
                                if (err) {
                                    console.log(err)
                                }
                                console.log(`Role updated in the Company Database.`);
                                prompting();
                            });
                        })
                })
            })
    })
}

function updateEmployeeManager() {
    const sql = 'SELECT * from employees';
    db.query(sql, (err, results) => {
        let empSelection = results.map(function (employees) {
            let empSelected = {
                name: employees.first_name + " " + employees.last_name,
                value: employees.id
            }
            return empSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which employee's manager do you want to update?`,
                    name: 'employee',
                    type: 'list',
                    choices: empSelection
                }
            ])
            .then(function (answer) {
                const sql = 'SELECT * from employees';
                db.query(sql, (err, results) => {
                    let manSelection = results.map(function (employees) {
                        let manSelected = {
                            name: employees.first_name + " " + employees.last_name,
                            value: employees.id
                        }
                        return manSelected;
                    })
                    inquirer
                        .prompt([
                            {
                                message: `Who is the employee's new manager?`,
                                name: 'newManager',
                                type: 'list',
                                choices: manSelection
                            }
                        ])
                        .then(function (manAnswer) {
                            const sql = `UPDATE employees SET manager_id = ${manAnswer.newManager} WHERE id = ${answer.employee}`;

                            db.query(sql, (err, results) => {
                                if (err) {
                                    console.log(err)
                                }
                                console.log(`Manager updated in the Company Database.`);
                                prompting();
                            });
                        })
                })
            })
    })
}

function deleteEmployee() {
    const sql = 'SELECT * from employees';
    db.query(sql, (err, results) => {
        let empSelection = results.map(function (employees) {
            let empSelected = {
                name: employees.first_name + " " + employees.last_name,
                value: employees.id
            }
            return empSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which employee do you want to delete?`,
                    name: 'employee',
                    type: 'list',
                    choices: empSelection
                }
            ])
            .then(function (answer) {
                const sql = `DELETE FROM employees WHERE id = ${answer.employee}`
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`Employee deleted from the Company Database.`);
                    prompting();
                });
            })
    })
}

function deleteRole() {
    const sql = 'SELECT * from roles';
    db.query(sql, (err, results) => {
        let roleSelection = results.map(function (roles) {
            let roleSelected = {
                name: roles.title,
                value: roles.id
            }
            return roleSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which role do you want to delete?`,
                    name: 'role',
                    type: 'list',
                    choices: roleSelection
                }
            ])
            .then(function (answer) {
                const sql = `DELETE FROM roles WHERE id = ${answer.role}`
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`Role deleted from the Company Database.`);
                    prompting();
                });
            })
    })
}

function deleteDept() {
    const sql = 'SELECT * from departments';
    db.query(sql, (err, results) => {
        let deptSelection = results.map(function (departments) {
            let deptSelected = {
                name: departments.name,
                value: departments.id
            }
            return deptSelected;
        })
        inquirer
            .prompt([
                {
                    message: `Which department do you want to delete?`,
                    name: 'department',
                    type: 'list',
                    choices: deptSelection
                }
            ])
            .then(function (answer) {
                const sql = `DELETE FROM departments WHERE id = ${answer.department}`
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`Department deleted from the Company Database.`);
                    prompting();
                });
            })
    })
}

function prompting() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices:
                    ['View All Employees',
                        'View All Employees by Manager',
                        'Add Employee',
                        'Update Employee Role',
                        'Update Employee Manager',
                        'Delete Employee',
                        'View All Roles',
                        'Add Role',
                        'Delete Role',
                        'View All Departments',
                        'Add Department',
                        'Delete Department',
                        'Exit']
            },
        ])
        .then((response) => {
            if (response.action == 'View All Departments') {
                viewAllDepts();
            }
            if (response.action == 'Add Department') {
                addDept();
            }
            if (response.action == 'Delete Department') {
                deleteDept();
            }
            if (response.action == 'View All Roles') {
                viewAllRoles();
            }
            if (response.action == 'Add Role') {
                addRole();
            }
            if (response.action == 'Delete Role') {
                deleteRole();
            }
            if (response.action == 'View All Employees') {
                viewAllEmployees();
            }
            if (response.action == 'View All Employees by Manager') {
                viewEmployeesByManager();
            }
            if (response.action == 'Add Employee') {
                addEmployee();
            }
            if (response.action == 'Update Employee Role') {
                updateEmployeeRole();
            }
            if (response.action == 'Update Employee Manager') {
                updateEmployeeManager();
            }
            if (response.action == 'Delete Employee') {
                deleteEmployee();
            }
            if (response.action == 'Exit') {
                console.log("Press Ctrl c to exit");
            }
        })
}

prompting()