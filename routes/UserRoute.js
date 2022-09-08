const express = require("express");
const {
    getUsers,
    getUserById,
    getUsersbyStudent,
    getUsersbyEmployee,
    createUser,
    registerStudent,
    updateUser,
    deleteUser
} = require("../controllers/Users.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.get('/users-student', verifyUser, adminOnly, getUsersbyStudent);
router.get('/users-employee', verifyUser, adminOnly, getUsersbyEmployee);
router.post('/users', createUser);
router.post('/register-student', registerStudent);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

module.exports = router;