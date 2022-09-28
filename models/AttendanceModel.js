const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const ClassSchedule = require("./ClassScheduleModel.js");
const Students = require("./StudentModel.js");

const { DataTypes } = Sequelize;

const Attendance = db.define('attendances', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Students,
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClassSchedule,
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Attendance.hasOne(Students, { foreignKey: 'student_id' });
Students.belongsTo(Attendance, { foreignKey: 'student_id' });

Attendance.belongsTo(ClassSchedule, { foreignKey: 'schedule_id' });
ClassSchedule.hasMany(Attendance, { foreignKey: 'schedule_id' });

module.exports = Attendance;