const bodyParser = require('body-parser');
const express = require("express");
const sequelize = require('sequelize');
const app = express();
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const db = new Sequelize({
    database: 'course_ms',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = db;

// check the databse connection
db
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));