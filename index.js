require(`dotenv`).config();
const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const myFunctions = require(`./functions.js`)

const db = mysql.createConnection(
    {
        host: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: `employees_db`
    },
    console.log(`Connected to employees_db database`)
);

const start = () => {
    inquirer
    .prompt([
        {
            type: `list`,
            message: `What would you like to do?`,
            name: `start`,
            choices: [`View All Employees`, `Add Employee`, `Update Employee Role`, `View All Roles`, `Add Role`,
                         `View All Departments`, `Add Department`, `Quit`]
        }
    ])
    .then((response) => {
        switch (response.start) {
            case `View All Employees`:
                selectAllEmp()
                break;

            case `View All Roles`:
                selectAllRole()
                break;

            case `View All Departments`:
                selectAll(`department`)
                break;
            
            case `Add Employee`:
                addEmployee()
                break
            
            case `Update Employee Role`:
                updateEmpRole();
                break;
            
            case `Add Role`:
                addRole();
                break;

            case `Add Department`:
                addDepartment()
                break;

            case `Quit`:
                process.exit(0);
                
        }
    })
    .catch((error) => {
        console.error(error);
    })
};

function addDepartment() {
    inquirer
    .prompt([
        {
            type: `input`,
            message: `What is the name of the new department?`,
            name: `department`
        }
    ])
    .then((response) => {
        myFunctions.insertDepartment(response.department);
        console.log(`
            
        ${response.department} added as new department`)
        start();
    });
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: `input`,
            message: `What is the first name of the new Employee?`,
            name: `firstName`
        },
        {
            type: `input`,
            message: `What is the last name of the new Employee?`,
            name: `lastName`
        },
        {
            type: `input`,
            message: `What is the role ID of the new Employee?`,
            name: `roleId`
        },
        {
            type: `input`,
            message: `What is the manager ID of the new Employee's manager?`,
            name: `managerId`
        }
    ])
    .then((response) => {
        myFunctions.insertEmployee(response.firstName, response.lastName, response.roleId, response.managerId);
        console.log(`
            ${response.firstName}  ${response.lastName} added as new employee`)
        start();
    });
}

function addRole() {
    inquirer
    .prompt([
        {
            type: `input`,
            message: `What is the title of the new role?`,
            name: `title`
        },
        {
            type: `input`,
            message: `What is the salary of the new role?`,
            name: `salary`
        },
        {
            type: `input`,
            message: `What is the department ID of the new role?`,
            name: `roleId`
        }
    ])
    .then((response) => {
        myFunctions.insertRole(response.title, response.salary, response.roleId);
        console.log(`
            ${response.title} added as new role`)
        start();
    });
}

function selectAll(tableName) {
    db.query(`SELECT * FROM ${tableName}`, (err,results) => {
        if (err) {
         console.log(err);
        } else {
            console.log(` `);
            console.table(results);
            start();
        }
    })
};

function selectAllEmp() {
    db.query(`SELECT e.id AS id, e.first_name, e.last_name, r.title AS role, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id LEFT JOIN employee m ON e.manager_id = m.id;`, (err, results) => {
        if (err) {
            console.log(err);
           } else {
               console.log(` `);
               console.table(results);
               start();
           }
    })
}

function selectAllRole() {
    db.query(`SELECT r.id as id, r.title, d.name AS department, r.salary FROM role r LEFT JOIN department d ON r.department_id = d.id;`, (err, results) => {
        if (err) {
            console.log(err);
           } else {
               console.log(` `);
               console.table(results);
               start();
           }
    })
}

function updateEmpRole() {
    const empArr =[];
    let empId;
    let idArr = [];
    db.query(`SELECT first_name, last_name, id FROM employee;`, (err, results) => {
        if (err) {
            console.log(err);
           }
        
        results.forEach((row) => {
            empArr.push(row.id + ` ` + row.first_name + ` ` + row.last_name);
            idArr.push(row.id);
        })
    
        inquirer
        .prompt([
            {
            type: `list`,
                message: `Which employee would you like to update?`,
                name: `empUpdate`,
                choices: empArr
            },
            {
                type: `input`,
                message: `What is the id of the employee's new role?`,
                name: `idUpdate`,
            }
        ])
        .then((response) => {
            const selectedId = empArr.indexOf(response.empUpdate);
            empId = idArr[selectedId];
            myFunctions.updateRole(response.idUpdate, empId);
            console.log(`
                ${response.empUpdate} has been given the new role`)
            start();
        });
    })
    
}
start();