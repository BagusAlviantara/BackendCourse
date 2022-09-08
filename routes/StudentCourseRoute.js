const express = require("express");
const {
    getStudentCourse,
    getStudentCourseById,
    createStudentCourse,
    updateStudentCourse,
    deleteStudentCourse
} = require("../controllers/StudentCourse.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/student-courses', verifyUser, adminOnly, getStudentCourse);
router.get('/student-courses/:id', verifyUser, adminOnly, getStudentCourseById);
router.post('/student-courses', verifyUser, adminOnly, createStudentCourse);
router.patch('/student-courses/:id', verifyUser, adminOnly, updateStudentCourse);
router.delete('/student-courses/:id', verifyUser, adminOnly, deleteStudentCourse);

module.exports = router;