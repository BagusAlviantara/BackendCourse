const Schedule = require("../models/ClassScheduleModel.js");
//const { Op } = require("sequelize");

exports.getSchedule = async(req, res) => {
    try {
        const response = await Schedule.findOne({
            attributes: ['id', 'employee_id', 'product_id', 'day', 'start_time', 'end_time']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getScheduleById = async(req, res) => {
    try {
        const response = await Schedule.findOne({
            attributes: ['id', 'employee_id', 'product_id', 'day', 'start_time', 'end_time'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createSchedule = async(req, res) => {
    const { id, employee_id, product_id, day, start_time, end_time } = req.body;
    try {
        await Schedule.create({
            id: id,
            employee_id: employee_id,
            product_id: product_id,
            day: day,
            start_time: start_time,
            end_time: end_time
        });
        res.status(201).json({ msg: "Create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateSchedule = async(req, res) => {
    const schedule = await Schedule.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!schedule) return res.status(404).json({ msg: "tidak ditemukan" });
    const { id, employee_id, product_id, day, start_time, end_time } = req.body;
    try {
        await Schedule.update({
            id: id,
            employee_id: employee_id,
            product_id: product_id,
            day: day,
            start_time: start_time,
            end_time: end_time
        }, {
            where: {
                id: schedule.id
            }
        });
        res.status(200).json({ msg: "Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.deleteSchedule = async(req, res) => {
    const schedule = await Schedule.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!schedule) return res.status(404).json({ msg: "tidak ditemukan" });
    try {
        await Schedule.destroy({
            where: {
                id: schedule.id
            }
        });
        res.status(200).json({ msg: "Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}