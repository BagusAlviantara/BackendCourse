const express = require("express");
const {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/Notes.js");
const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;