const express = require("express")
const app = express()
const mysql = require("mysql")
const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "Anish12@",
    database: "nodejs",
    port: "3306"
})
db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})
module.exports = db;