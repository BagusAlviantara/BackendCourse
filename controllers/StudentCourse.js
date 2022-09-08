const StudentCourse = require("../models/StudentCourseModel.js");
const { Op } = require("sequelize");

exports.getStudentCourse = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await StudentCourse.findAll({
                attributes: ['id', 'schedule_id', 'student_id']
            });
        }
        res.status(200).json(response);
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