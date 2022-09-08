const express = require("express");
const {
    getSchedule,
    getScheduleById,
    getScheduleStudentCourse,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require("../controllers/ClassSchedule.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/class-schedules', verifyUser, adminOnly, getSchedule);
router.get('/class-schedules/:id', verifyUser, adminOnly, getScheduleById);
router.post('/class-schedules', verifyUser, adminOnly, createSchedule);
router.patch('/class-schedules/:id', verifyUser, adminOnly, updateSchedule);
router.delete('/class-schedules/:id', verifyUser, adminOnly, deleteSchedule);

module.exports = router;