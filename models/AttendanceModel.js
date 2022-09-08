const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const ClassSchedule = require("./ClassScheduleModel.js");
const Students = require("./StudentModel.js");
const User = require("./UserModel.js");

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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
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

User.hasOne(Attendance, { foreignKey: 'user_id' });
Attendance.belongsTo(User, { foreignKey: 'user_id' });

Attendance.hasOne(Students, { foreignKey: 'user_id' });
Students.belongsTo(Attendance, { foreignKey: 'user_id' });

Attendance.hasOne(ClassSchedule, { foreignKey: 'user_id' });
ClassSchedule.belongsTo(Attendance, { foreignKey: 'user_id' });

module.exports = Attendance;