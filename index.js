const inquirer = require(`inquirer`);
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

function start() {
    inquirer
    .prompt([
        {
            type: `list`,
            message: `What would you like to do?`,
            name: `start`,
            choices: [`View All Employees`, `Add Employee`, `Update Employee Role`, `View All Roles`, `Add Role`,
                         `View All Departments`, `Add Department`, `Exit`]
        }
    ])
    .then((response) => {
        if (response === `View All Employees`) {

        } else if (response === `Add Employee`) {

        } else if (response === `Update Employee Role`) {

        } else if (response === `View All Roles`) {

        } else if (response === `Add Role`) {

        } else if (response === `View All Departments`) {

        } else if (response === `Add Department`) {

        } else {
            console.log(`Goodbye!`);
        }
    });
};

function viewAllEmployee() {

}

start();