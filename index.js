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
            case `View All Roles`:
            case `View All Departments`:
                functions.selectAll(response.start)
                    .then(() => start());
                break;
            
            case `Add Employee`:

                start();
                break;
            
            case `Update Employee Role`:

                start();
                break;
            
            case `Add Role`:

                start();
                break;

            case `Add Department`:
                addDepartment()
                    .then(() => start());
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
        message: `What is the name of tthe new department?`,
        name: `department`
        }
    ])
    .then((response) => {
        myFunctions.insertDepartment(response.department);
    });
}

start();