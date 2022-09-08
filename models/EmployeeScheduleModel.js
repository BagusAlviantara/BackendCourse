const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./EmployeeModel.js");

const { DataTypes } = Sequelize;

const EmployeeSchedule = db.define('employee_schedule', {
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
            notEmpty: true,
        }
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
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
    },
    start_break: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    end_break: {
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

Employee.hasMany(EmployeeSchedule, { foreignKey: 'employee_id' });
EmployeeSchedule.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = EmployeeSchedule;