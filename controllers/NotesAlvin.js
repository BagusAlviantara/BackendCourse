const Notes = require("../models/NotesAlvinModel.js");
const { Op } = require("sequelize");

exports.getNotes = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Notes.findAll({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at'],
                where: { student_id: req.params.student_id }
            });
        } else {
            response = await Notes.findAll({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getNotesByIdStudent = async(req, res) => {
    try {
        const notes = await Notes.findOne({
            where: {
                student_id: req.params.student_id
            }
        });
        if (!notes) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Notes.findAll({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at'],
                where: {
                    student_id: notes.student_id
                }
            });
        } else {
            response = await Notes.findAll({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at'],
                where: {
                    [Op.and]: [{ student_id: notes.student_id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getNotesById = async(req, res) => {
    try {
        const notes = await Notes.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!notes) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Notes.findOne({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at'],
                where: {
                    id: notes.id
                }
            });
        } else {
            response = await Notes.findOne({
                attributes: ['id', 'student_id', 'employee_id', 'title', 'description', 'role', 'created_at'],
                where: {
                    [Op.and]: [{ id: notes.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createNotes = async(req, res) => {
    const {
        id,
        student_id,
        employee_id,
        title,
        description,
        role
    } = req.body;
    try {
        await Notes.create({
            id,
            student_id,
            employee_id,
            title,
            description,
            role
        });
        res.status(201).json({ msg: "student notes Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateNotes = async(req, res) => {
    try {
        const notes = await Notes.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!notes) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const {
            id,
            student_id,
            employee_id,
            title,
            description,
            role
        } = req.body;
        if (req.role === "Student") {
            await Notes.update({
                id,
                student_id,
                employee_id,
                title,
                description,
                role
            }, {
                where: {
                    id: notes.id
                }
            });
        } else {
            await Notes.update({
                id,
                student_id,
                employee_id,
                title,
                description,
                role
            }, {
                where: {
                    id: notes.id
                }
            });
        }
        res.status(200).json({ msg: "student updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteNotes = async(req, res) => {
    try {
        const notes = await Notes.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!notes) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const {
            id,
            student_id,
            employee_id,
            title,
            description,
            role
        } = req.body;
        if (req.role === "Admin") {
            await Notes.destroy({
                where: {
                    id: notes.id
                }
            });
        }
        res.status(200).json({ msg: "student notes deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}