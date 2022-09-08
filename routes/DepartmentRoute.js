const express = require("express");
const {
    getDepartment,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require("../controllers/Department.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/department', verifyUser, adminOnly, getDepartment);
router.get('/department/:id', verifyUser, adminOnly, getDepartmentById);
router.post('/department', verifyUser, adminOnly, createDepartment);
router.patch('/department/:id', verifyUser, adminOnly, updateDepartment);
router.delete('/department/:id', verifyUser, adminOnly, deleteDepartment);

module.exports = router;