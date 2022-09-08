const express = require("express");
const { Login, Logout, Me, isAuth, LoginStudent } = require("../controllers/Auth.js");

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.post('/loginstudent', LoginStudent);
router.delete('/logout', Logout);
router.get('/private', isAuth);

module.exports = router;