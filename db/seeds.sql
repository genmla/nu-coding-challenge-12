INSERT INTO departments (id, name)
VALUES (1, "Advising"),
       (2, "Marketing"),
       (3, "Operations"),
       (4, "Technology");

INSERT INTO reviews (id, title, salary, department_id)
VALUES (1, "Adviser", 45000, 1),
       (2, "Lead", 55000, 1), 
       (3, "Assistant Director", 70000, 1),
       (4, "Content Strategist", 60000, 2),
       (5, "Assistant Director", 80000, 2),
       (6, "Director", 100000, 2),
       (7, "Coordinator", 45000, 3),
       (8, "Assistant Director", 65000, 3),
       (9, "Chief Technology Officer", 100000, 4);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Leslie", "Schubert", 2, null),
       (2, "Phillip", "Phreeman", 1, 1),
       (3, "Jane", "Gallant", 3, 1),
       (4, "Dorothea", "Vernon", 4, 1),
       (4, "Sarah", "Halley", 1, 2),
       (5, "Gillian", "Boolean", 1, 2),
       (6, "Morgan", "Plowman", 1, 2),
       (7, "Shelly", "Marmalde", 1, 4),
       (8, "Jacob", "Jonjingle", 1, 4),
       (9, "Lazlo", "Sapien", 1, 4),
       (10, "Farley", "Bard", 1, 5),
       (11, "Shippley", "Dounut", 1, 5),
       (12, "Jerry", "Sprinkles", 1, 5),
       (13, "Lulla", "Lime", 1, 6),
       (14, "Lulla", "Limon", 1, 6),
       (15, "Peter", "Pepper", 1, 6),
       (16, "Haley", "Cominksy", 2, 1),
       (17, "Tom", "Dean", 2, 16),
       (18, "Nikalaus", "Pfluger", 2, 16),
       (19, "Ursela", "Quinn", 3, 3),
       (20, "Ida", "Wells", 3, 3),
       (21, "Jack", "Hasan", 3, 3);
       