const express = require("express");
const {
    getNotes,
    getNotesById,
    getNotesByIdStudent,
    createNotes,
    updateNotes,
    deleteNotes
} = require("../controllers/Notes.js");
const { verifyUser } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/notes', verifyUser, getNotes);
router.get('/notes/:id', verifyUser, getNotesById);
router.get('/notes-by-student/:id', verifyUser, getNotesByIdStudent);
router.post('/notes', verifyUser, createNotes);
router.patch('/notes/:id', verifyUser, updateNotes);
router.delete('/notes/:id', verifyUser, deleteNotes);

module.exports = router;