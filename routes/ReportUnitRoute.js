const express = require("express");
const {
    getReportUnit,
} = require("../controllers/ReportUnit.js");
const router = express.Router();

router.get('/report-unit', getReportUnit);

module.exports = router;