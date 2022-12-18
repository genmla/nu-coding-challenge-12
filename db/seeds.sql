INSERT INTO departments (id, name)
VALUES (1, "Advising"),
       (2, "Marketing"),
       (3, "Operations");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Adviser", 45000, 1),
       (2, "Lead", 55000, 1), 
       (3, "Advising Manager", 70000, 1),
       (4, "Content Strategist", 60000, 2),
       (5, "Marketing Manager", 80000, 2),
       (6, "Director", 100000, 2),
       (7, "Coordinator", 45000, 3),
       (8, "Operations Manager", 65000, 3);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Leslie", "Schubert", 6, null),
       (2, "Phillip", "Phreeman", 3, 1),
       (3, "Jane", "Gallant", 5, 1),
       (4, "Dorothea", "Vernon", 8, 1),
       (5, "Sarah", "Halley", 2, 2),
       (6, "Gillian", "Boolean", 1, 5),
       (7, "Shelly", "Marmalde", 4, 3),
       (8, "Jacob", "Jonjingle", 7, 4);
        