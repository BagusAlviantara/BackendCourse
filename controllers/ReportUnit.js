const ReportUnit = require("../models/StudentReportsModel.js");

exports.getReportUnit = async(req, res) => {
    try {
        const response = await ReportUnit.findAll({
            attributes: ['id', 'schedule_id', 'unit_id', 'student_id', 'score']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}