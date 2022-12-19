SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, CONCAT(m.first_name, ' ', m.last_name) AS Manager, roles.title AS Title, roles.salary As Salary, departments.name AS Department 
FROM employees e   
LEFT JOIN employees m
ON m.id = e.manager_id
INNER JOIN roles ON roles.id = employees.role_id
INNER JOIN departments ON departments.id = roles.department_id;

SELECT 
CONCAT(e.employees.first_name, ',', e.employees.last_name) AS Employee,
CONCAT(m.employees.first_name, ' ', m.employees.last_name) AS Manager
FROM employees e   
LEFT JOIN employees m
ON m.employees.id = e.employees.manager_id

SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id

SELECT 
CONCAT(e.first_name, ' ', e.last_name) AS Employee, 
CONCAT(m.first_name, ' ', m.last_name) AS Manager 
FROM employees e 
LEFT JOIN employees m 
ON m.id = e.manager_id

SELECT employees.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, CONCAT(m.first_name, ' ', m.last_name) AS Manager, roles.title AS Title, employees.manager_id AS Manager, roles.salary As Salary, departments.name AS Department FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON departments.id = roles.department_id;

SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, CONCAT(m.first_name, ' ', m.last_name) AS Manager, roles.title AS Title, roles.salary As Salary, departments.name AS Department FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = e.role_id INNER JOIN departments ON departments.id = roles.department_id;

CREATE OR REPLACE VIEW ManagerView AS SELECT CONCAT(first_name, " ", last_name) AS Employees FROM employees WHERE manager_id = 2; SELECT * FROM ManagerView

CREATE OR REPLACE VIEW DeptView AS SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS Employee, roles.title AS Title, roles.salary As Salary, FROM employees INNER JOIN roles ON roles.id = employees.role_id INNER JOIN departments ON departments.id = roles.department_id WHERE departments.id = 1;

CREATE OR REPLACE VIEW DeptView AS SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, CONCAT(m.first_name, ' ', m.last_name) AS Manager, roles.title AS Title, roles.salary As Salary, departments.name AS Department FROM employees e LEFT JOIN employees m ON m.id = e.manager_id INNER JOIN roles ON roles.id = e.role_id INNER JOIN departments ON departments.id = roles.department_id WHERE departments.id = 1