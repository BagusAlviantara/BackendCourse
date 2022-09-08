const express = require("express");
const {
    getReportCourse,
} = require("../controllers/ReportCourse.js");

const router = express.Router();
router.get('/report-course', getReportCourse);

module.exports = router;