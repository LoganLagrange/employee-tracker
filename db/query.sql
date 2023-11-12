-- SELECT e.id AS id, e.first_name, e.last_name, r.title 
--     AS role, r.salary, CONCAT(m.first_name, ' ', m.last_name)
--     AS manager FROM employee e JOIN role r ON e.role_id = r.id 
--     LEFT JOIN employee m ON e.manager_id = m.id;

-- SELECT r.id as id, r.title, d.name, r.salary FROM role r LEFT JOIN department d ON r.department_id = d.id;