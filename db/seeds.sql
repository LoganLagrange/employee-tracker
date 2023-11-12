USE employees_db;

INSERT INTO department (name)
VALUES  ("Kitchen"),
        ("Front of House");

INSERT INTO role (title, salary,  department_id)
VALUES  ("Chef", 45000, 1),
        ("Sous Chef", 35000, 1),
        ("Cook", 23000, 1),
        ("FOH Manager", 40000, 2),
        ("Server", 20000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Logan", "Lagrange", 1, null),
        ("Sabrina", "Miller", 2, 1),
        ("John", "Smith", 3, 1),
        ("Mary", "Jane", 4, null),
        ("Kevin", "McAlistair", 5, 4),
        ("Sarah", "Brown",  5, 4);