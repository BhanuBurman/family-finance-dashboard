// backend/config/db.js - Database connection setup

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

console.log("Connecting to DB with:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user:  process.env.DB_USER || "root",
    password:  process.env.DB_PASS || "BhanuBurman@2024#",
    database: process.env.DB_NAME || "family_finance_dashboard"
});


module.exports = db;
