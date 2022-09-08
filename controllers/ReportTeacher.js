const ReportTeacher = require("../models/StudentReportsModel.js");

exports.getReportTeacher = async(req, res) => {
    try {
        const response = await ReportTeacher.findAll({
            attributes: ['id', 'unit_id', 'student_id', 'created_at']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}