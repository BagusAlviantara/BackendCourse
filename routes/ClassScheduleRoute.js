const express = require("express");
const {
    getSchedule,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require("../controllers/ClassSchedule.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/schedules', verifyUser, adminOnly, getSchedule);
router.get('/schedules/:id', verifyUser, adminOnly, getScheduleById);
router.post('/schedules', verifyUser, adminOnly, createSchedule);
router.patch('/schedules/:id', verifyUser, adminOnly, updateSchedule);
router.delete('/schedules/:id', verifyUser, adminOnly, deleteSchedule);

module.exports = router;