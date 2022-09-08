const Report = require("../models/StudentReportsModel.js");
const argon2 = require("argon2");

exports.getReport = async(req, res) => {
    try {
        const response = await Report.findOne({
            attributes: ['id', 'unit_id', 'student_id', 'schedule_id', 'score', 'photo', 'video']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getReportById = async(req, res) => {
    try {
        const response = await Report.findOne({
            attributes: ['id', 'unit_id', 'student_id', 'schedule_id', 'score', 'photo', 'video'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createReport = async(req, res) => {
    const { id, unit_id, student_id, schedule_id, description, score, photo, video } = req.body;
    try {
        await Report.create({
            id: id,
            unit_id: unit_id,
            schedule_id: schedule_id,
            student_id: student_id,
            score: score,
            photo: photo,
            video: video,
        });
        res.status(201).json({ msg: "Create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateReport = async(req, res) => {
    const report = await Report.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!report) return res.status(404).json({ msg: "tidak ditemukan" });
    const { id, unit_id, student_id, schedule_id, score, photo, video } = req.body;
    try {
        await Report.update({
            id: id,
            unit_id: unit_id,
            schedule_id: schedule_id,
            student_id: student_id,
            score: score,
            photo: photo,
            video: video,
        }, {
            where: {
                id: report.id
            }
        });
        res.status(200).json({ msg: "Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.deleteReport = async(req, res) => {
    const report = await Report.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!report) return res.status(404).json({ msg: "tidak ditemukan" });
    try {
        await Report.destroy({
            where: {
                id: report.id
            }
        });
        res.status(200).json({ msg: "Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}