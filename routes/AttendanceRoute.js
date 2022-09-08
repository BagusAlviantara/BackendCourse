 const express = require("express");
 const {
     getAttendance,
     getAttendanceById,
     createAttendance,
     updateAttendance,
     deleteAttendance
 } = require("../controllers/Attendance.js");
 const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

 const router = express.Router();

 router.get('/attendance', verifyUser, adminOnly, getAttendance);
 router.get('/attendance/:id', verifyUser, adminOnly, getAttendanceById);
 router.post('/attendance', verifyUser, createAttendance);
 router.patch('/attendance/:id', verifyUser, adminOnly, updateAttendance);
 router.delete('/attendance/:id', verifyUser, adminOnly, deleteAttendance);

 module.exports = router;