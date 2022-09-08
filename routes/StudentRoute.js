const express = require("express");
const {
    getStudent,
    getStudentById,
    getStudentCount,
    createStudent,
    updateStudent,
    updateStudentNama,
    deleteStudent,
} = require("../controllers/Students.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");
const router = express.Router();

router.get('/students', getStudent);
router.get('/students/:id', getStudentById);
router.get('/students-count', verifyUser, adminOnly, getStudentCount);
router.post('/students', createStudent);
router.patch('/students/:id', updateStudent);
router.patch('/students-edit/:id', updateStudentNama);
router.delete('/students/:id', deleteStudent);

module.exports = router;