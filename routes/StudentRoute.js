const express = require("express");
const {
    getStudent,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/Students.js");
const router = express.Router();

router.get('/students', getStudent);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);
router.patch('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;