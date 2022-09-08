const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./EmployeeModel.js");
const Products = require("./ProductModel.js");
const Student = require("./StudentModel.js");

const { DataTypes } = Sequelize;

const ClassSchedule = db.define('class_schedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Employee.hasMany(ClassSchedule, { foreignKey: 'id' });
ClassSchedule.belongsTo(Employee, { foreignKey: 'id' });

Products.hasMany(ClassSchedule, { foreignKey: 'id' });
ClassSchedule.belongsTo(Products, { foreignKey: 'id' });

module.exports = ClassSchedule;