const express = require("express");
const {
    getEmployeeSchedule,
    getEmployeeScheduleById,
    getEmployeeScheduleByEmployee,
    getEmployeeScheduleByEmployeeSenin,
    getEmployeeScheduleByEmployeeSelasa,
    getEmployeeScheduleByEmployeeRabu,
    getEmployeeScheduleByEmployeeKamis,
    getEmployeeScheduleByEmployeeJumat,
    getEmployeeScheduleByEmployeeSabtu,
    getEmployeeScheduleByEmployeeMinggu,
    createEmployeeSchedule,
    updateEmployeeSchedule,
    deleteEmployeeSchedule
} = require("../controllers/EmployeeSchedule.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/employee-schedules', verifyUser, adminOnly, getEmployeeSchedule);
router.get('/employee-schedules/:id', verifyUser, adminOnly, getEmployeeScheduleById);
router.get('/employee-schedulesbyemployee/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployee);
router.get('/employee-schedulesbysenin/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeSenin);
router.get('/employee-schedulesbyselasa/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeSelasa);
router.get('/employee-schedulesbyrabu/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeRabu);
router.get('/employee-schedulesbykamis/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeKamis);
router.get('/employee-schedulesbyjumat/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeJumat);
router.get('/employee-schedulesbysabtu/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeSabtu);
router.get('/employee-schedulesbyminggu/:id', verifyUser, adminOnly, getEmployeeScheduleByEmployeeMinggu);
router.post('/employee-schedules', verifyUser, adminOnly, createEmployeeSchedule);
router.patch('/employee-schedules/:id', verifyUser, adminOnly, updateEmployeeSchedule);
router.delete('/employee-schedules/:id', verifyUser, adminOnly, deleteEmployeeSchedule);

module.exports = router;