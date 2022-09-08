const express = require("express");
const {
    getReport,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require("../controllers/StudentReports.js");
const router = express.Router();

router.get('/student-reports', getReport);
router.get('/student-reports/:id', getReportById);
router.post('/student-reports', createReport);
router.patch('/student-reports/:id', updateReport);
router.delete('/student-reports/:id', deleteReport);

module.exports = router;