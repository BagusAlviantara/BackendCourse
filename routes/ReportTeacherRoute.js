const express = require("express");
const {
    getReportTeacher,
} = require("../controllers/ReportTeacher.js");
const router = express.Router();

router.get('/report-teacher', getReportTeacher);

module.exports = router;