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
                         `View All Departments`, `Add Department`]
        }
    ])
    .then((response) => {
        switch (response.start) {
            case `View All Employees`:
                selectAll(`employee`)
                start();
                break;

            case `View All Roles`:
                selectAll(`role`)
                start();
                break;

            case `View All Departments`:
                selectAll(`department`)
                start();
                break;
            
            case `Add Employee`:
                addEmployee()
                break
            
            case `Update Employee Role`:

                start();
                break;
            
            case `Add Role`:

                start();
                break;

            case `Add Department`:
                addDepartment()
                break;
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
        console.log(`${response.department} added as new department`)
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
        console.log(`${response.firstName}  ${response.lastName} added as new employee`)
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
start();