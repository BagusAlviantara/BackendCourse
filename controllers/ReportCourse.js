const ReportCourse = require("../models/StudentReportsModel.js");

exports.getReportCourse = async(req, res) => {
    try {
        const response = await ReportCourse.findAll({
            attributes: ['id', 'unit_id', 'attendance_id']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}