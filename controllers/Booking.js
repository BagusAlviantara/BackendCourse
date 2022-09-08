const Booking = require("../models/BookingModel.js");
const argon2 = require("argon2");

exports.getBooking = async(req, res) => {
    try {
        const response = await Booking.findOne({
            attributes: ['id', 'student_id', 'schedule_id', 'status_book']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getBookingById = async(req, res) => {
    try {
        const response = await Booking.findOne({
            attributes: ['id', 'schedule_id', 'student_id', 'status_book'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createBooking = async(req, res) => {
    const {id, schedule_id, student_id, status_book} = req.body;
    try {
        await Booking.create({
            id: id,
            schedule_id: schedule_id,
            student_id: student_id,
            status_book: status_book
        });
        res.status(201).json({ msg: "Create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateBooking = async(req, res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!booking) return res.status(404).json({ msg: "tidak ditemukan" });
    const { status_book } = req.body;
    try {
        await Booking.update({
            status_book: status_book
        }, {
            where: {
                id: booking.id
            }
        });
        res.status(200).json({ msg: "Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.deleteBooking = async(req, res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!booking) return res.status(404).json({ msg: "tidak ditemukan" });
    try {
        await Booking.destroy({
            where: {
                id: booking.id
            }
        });
        res.status(200).json({ msg: "Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}