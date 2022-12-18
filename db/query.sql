SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;

SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, roles.salary As Salary, departments.name AS Department 
FROM employees
INNER JOIN roles ON roles.id = employees.role_id
INNER JOIN departments ON departments.id = roles.department_id;
