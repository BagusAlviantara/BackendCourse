const Attendance = require("../models/AttendanceModel.js");


exports.getAttendance = async(req, res) => {
    try {
        const response = await Attendance.findAll({
            attributes: ['id', 'student_id', 'schedule_id', 'status']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getAttendanceById = async(req, res) => {
    try {
        const response = await Attendance.findOne({
            attributes: ['id', 'student_id', 'schedule_id', 'status'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


exports.createAttendance = async(req, res) => {

    // const attendance = await Attendance.findOne({
    //     where: {
    //         id: req.body.id,
    //     }
    // });
    // if (!attendance) {
    //     return res.status(409).json({ msg: "User Tidak Ditemukan" });
    // }

    const { id, status, student_id, schedule_id } = req.body;
    try {
        await Attendance.create({
            id,
            status,
            student_id,
            schedule_id
        });
        res.status(201).json({ msg: "Create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateAttendance = async(req, res) => {
    try {
        const attendance = await Attendance.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!attendance) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { status, student_id, schedule_id } = req.body;
        await Attendance.update({ status, student_id, schedule_id }, {
            where: {
                id: Attendance.id
            }
        });
        res.status(200).json({ msg: "Attendance updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteAttendance = async(req, res) => {
    const attendance = await Attendance.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!attendance) return res.status(404).json({ msg: "Data tidak ditemukan" });
    try {
        await Attendance.destroy({
            where: {
                id: Attendance.id
            }
        });
        res.status(200).json({ msg: "Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}