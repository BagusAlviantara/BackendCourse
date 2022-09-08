const Note = require("../models/NoteModel.js");
const argon2 = require("argon2");

exports.getNotes = async(req, res) => {
    try {
        const response = await Note.findOne({
            attributes: ['id', 'schedule_id', 'title', 'description', 'reciever_id', 'author_id']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getNoteById = async(req, res) => {
    try {
        const response = await Note.findOne({
            attributes: ['id', 'schedule_id', 'title', 'description', 'reciever_id', 'author_id'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createNote = async(req, res) => {
    const {id, schedule_id, title, description, reciever_id, author_id} = req.body;
    try {
        await Note.create({
            id: id,
            schedule_id: schedule_id,
            title: title,
            description: description,
            reciever_id: reciever_id,
            author_id: author_id
        });
        res.status(201).json({ msg: "Create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateNote = async(req, res) => {
    const note = await Note.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!note) return res.status(404).json({ msg: "Note tidak ditemukan" });
    const { schedule_id, title, description, reciever_id, author_id } = req.body;
    try {
        await Note.update({
            schedule_id: schedule_id,
            title: title,
            description: description,
            reciever_id: reciever_id,
            author_id: author_id
        }, {
            where: {
                id: note.id
            }
        });
        res.status(200).json({ msg: "Note Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.deleteNote = async(req, res) => {
    const note = await Note.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!note) return res.status(404).json({ msg: "Note tidak ditemukan" });
    try {
        await Note.destroy({
            where: {
                id: note.id
            }
        });
        res.status(200).json({ msg: "Note Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}