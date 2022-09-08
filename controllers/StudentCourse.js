const StudentCourse = require("../models/StudentCourseModel.js");
const Schedule = require("../models/ClassScheduleModel.js");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

exports.getStudentCourse = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await StudentCourse.findAll({
                attributes: ['id', 'schedule_id', 'student_id']
            });
        } else {
            response = await StudentCourse.findAll({
                attributes: ['id', 'schedule_id', 'student_id']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// exports.getScheduleStudentCourse = async(req, res) => {
//     try {
//         const response = await Schedule.findAll({
//             attributes: ['id', 'employee_id', 'product_id', 'date', 'start_time', 'end_time'],
//             include: [{
//                 model: StudentCourse,
//             }]
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// exports.getScheduleStudentCourse = async(req, res) => {
//     try {
//         const response = await StudentCourse.findAll({
//             attributes: ['id', 'schedule_id', 'student_id'],
//             include: [{
//                 model: Schedule
//             }]
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// exports.getScheduleStudentCourse = async(req, res) => {
//     try {
//         const response = await StudentCourse.findAll({
//             attributes: ['schedule_id'],
//             include: [{
//                 model: Schedule
//             }]
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

exports.getScheduleStudentCourse = async(req, res) => {
    try {
        if (req.role === "Admin") {
            await StudentCourse.findAll({
                attributes: [
                    'schedule_id', [sequelize.fn('COUNT', sequelize.col('*')), 'Jumlah Student Course']
                ],
                where: {
                    schedule_id: {
                        [Op.in]: [Schedule.findAll({
                            attributes: ['id'], //[[sequelize.fn('MONTH', sequelize.col('created_at')), 'Bulan']]
                            // where: {
                            //     '$month(class_schedule.created_at)$': {
                            //         [Op.eq]: 9
                            //     }
                            // }
                            // where: {
                            //     created_at: {
                            //         [Op.eq]: 9
                            //     }
                            // }
                        })]
                    }
                },
                group: 'schedule_id'
            }).then(function(response) {
                res.status(200).json(response);
            });
        } else {
            await StudentCourse.findAll({
                attributes: [
                    'schedule_id', [sequelize.fn('COUNT', sequelize.col('*')), 'Jumlah Student Course']
                ],
                where: {
                    schedule_id: {
                        [Op.in]: [Schedule.findAll({
                            attributes: ['id'], //
                            // where: {
                            //     created_at: {
                            //         [Op.eq]: 9
                            //     }
                            // }
                        })]
                    }
                },
                group: 'schedule_id'
            }).then(function(response) {
                res.status(200).json(response);
            });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getStudentCourseById = async(req, res) => {
    try {
        const StudentCourse = await StudentCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!StudentCourse) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await StudentCourse.findOne({
                attributes: ['id', 'schedule_id', 'student_id'],
                where: {
                    id: StudentCourse.id
                }
            });
        } else {
            response = await StudentCourse.findOne({
                attributes: ['id', 'schedule_id', 'student_id'],
                where: {
                    [Op.and]: [{ id: StudentCourse.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createStudentCourse = async(req, res) => {
    const { id, schedule_id, student_id } = req.body;
    try {
        await StudentCourse.create({
            id: id,
            schedule_id: schedule_id,
            student_id: student_id
        });
        res.status(201).json({ msg: "StudentCourse Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateStudentCourse = async(req, res) => {
    try {
        const StudentCourse = await StudentCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!StudentCourse) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, schedule_id, student_id } = req.body;
        if (req.role === "Admin") {
            await StudentCourse.update({ id, schedule_id, student_id }, {
                where: {
                    id: StudentCourse.id
                }
            });
        }
        res.status(200).json({ msg: "StudentCourse updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteStudentCourse = async(req, res) => {
    try {
        const StudentCourse = await StudentCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!StudentCourse) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, schedule_id, student_id } = req.body;
        if (req.role === "Admin") {
            await StudentCourse.destroy({
                where: {
                    id: StudentCourse.id
                }
            });
        }
        res.status(200).json({ msg: "StudentCourse deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}