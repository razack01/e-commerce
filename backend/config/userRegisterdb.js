//db.js

const dotenv= require('dotenv')

const mysql = require('mysql2');
dotenv.config()

const userRegisterconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


module.exports = userRegisterconnection;
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
// });


