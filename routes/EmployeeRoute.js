const express = require("express");
const {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/Employee.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/employee', verifyUser, adminOnly, getEmployee);
router.get('/employee/:id', verifyUser, adminOnly, getEmployeeById);
router.post('/employee', verifyUser, adminOnly, createEmployee);
router.patch('/employee/:id', verifyUser, adminOnly, updateEmployee);
router.delete('/employee/:id', verifyUser, adminOnly, deleteEmployee);

module.exports = router;