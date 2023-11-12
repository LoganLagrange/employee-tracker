const mysql = require(`mysql2`);

const db = mysql.createConnection(
    {
        host: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: `employees_db`
    },
    console.log(`Connected to employees_db database`)
);

function insertEmployee(firstName, lastName, roleId, managerId) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                VALUES ("${firstName}", "${lastName}", "${roleId}", ${managerId})`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            
        }
    })
};

function insertDepartment(name) {
    db.query(`INSERT INTO department (name) VALUES ("${name}")`, (err,results) => {
       if (err) {
        console.log(err);
       } else {
        
       }
    })
};

function insertRole(title, salary, department_id) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`, (err,results) => {
        if (err) {
            console.log(err);
        } else {

        }
    })
};

function updateRole(role_id, id) {
    db.query(`UPDATE employee SET role_id=${role_id} WHERE id=${id};`, (err,results) => {
        if (err) {
            console.log(err);
        } else {

        }
    })
};

module.exports = {
    insertDepartment,
    insertEmployee,
    insertRole,
    updateRole
};