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

function selectAll(tableName) {
    db.query(`SELECT * FROM ${tableName}`)
};

function addDepartment(name) {
    db.query(`INSERT INTO department (name)`)
};

function addRole()