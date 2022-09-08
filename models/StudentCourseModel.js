const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const ClassSchedule = require("./ClassScheduleModel.js");
const Student = require("./StudentModel.js");

const { DataTypes } = Sequelize;

const StudentCourse = db.define('student_course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClassSchedule,
            key: 'id'
        },
        validate: {
            notEmpty: true,
            len: [1, 3]
        }
    },
    student_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        },
        validate: {
            notEmpty: true,
            len: [1, 3]
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = StudentCourse;