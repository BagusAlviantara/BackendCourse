const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
//const ClassSchedule = require("./ClassScheduleModel.js");
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
        validate: {
            notEmpty: true,
            len: [1, 3]
        }
    },
    student_id: {
        type: DataTypes.STRING,
        allowNull: false,
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

Student.belongsTo(StudentCourse, { foreignKey: 'student_id' });
StudentCourse.hasMany(Student, { foreignKey: 'student_id' });

// ClassSchedule.belongsToMany(StudentCourse, { foreignKey: 'user_id' });
// StudentCourse.belongsToMany(ClassSchedule, { foreignKey: 'user_id' });

module.exports = StudentCourse;