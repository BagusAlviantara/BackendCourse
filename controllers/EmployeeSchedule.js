const EmployeeSchedule = require("../models/EmployeeScheduleModel.js");
//const Employee = require("../models/EmployeeModel.js");
const { Op } = require("sequelize");

exports.getEmployeeSchedule = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await EmployeeSchedule.findAll({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleById = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Search by Employee ID 
exports.getEmployeeScheduleByEmployee = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await EmployeeSchedule.findAll({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findAll({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeSenin = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Senin") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    day: "Senin"
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeSelasa = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Selasa") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    day: "Selasa"
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeRabu = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Rabu") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeKamis = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Kamis") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeJumat = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Jumat") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeSabtu = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Sabtu") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeScheduleByEmployeeMinggu = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                employee_id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.day === "Minggu") {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    employee_id: employeeSchedule.id
                }
            });
        } else {
            response = await EmployeeSchedule.findOne({
                attributes: ['id', 'employee_id', 'day', 'start_time', 'end_time', 'start_break', 'end_break'],
                where: {
                    [Op.and]: [{ employee_id: employeeSchedule.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createEmployeeSchedule = async(req, res) => {
    const { id, employee_id, day, start_time, end_time, start_break, end_break } = req.body;
    try {
        await EmployeeSchedule.create({
            id: id,
            employee_id: employee_id,
            day: day,
            start_time: start_time,
            end_time: end_time,
            start_break: start_break,
            end_break: end_break
        });
        res.status(201).json({ msg: "EmployeeSchedule Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateEmployeeSchedule = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, employee_id, day, start_time, end_time, start_break, end_break } = req.body;
        if (req.role === "Admin") {
            await EmployeeSchedule.update({ id, employee_id, day, start_time, end_time, start_break, end_break }, {
                where: {
                    id: employeeSchedule.id
                }
            });
        }
        res.status(200).json({ msg: "EmployeeSchedule updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteEmployeeSchedule = async(req, res) => {
    try {
        const employeeSchedule = await EmployeeSchedule.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employeeSchedule) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, employee_id, day, start_time, end_time, start_break, end_break } = req.body;
        if (req.role === "Admin") {
            await EmployeeSchedule.destroy({
                where: {
                    id: employeeSchedule.id
                }
            });
        }
        res.status(200).json({ msg: "EmployeeSchedule deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



// exports.createEmployeeSchedule = async(req, res) => {
//     const { id, employee_id, day, start_time, end_time, start_break, end_break } = req.body;
//     try {
//         res.json([{
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Senin",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Selasa",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Rabu",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Kamis",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Jumat",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Sabtu",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             },
//             {
//                 id: id,
//                 employee_id: employee_id,
//                 day: "Minggu",
//                 start_time: start_time,
//                 end_time: end_time,
//                 start_break: start_break,
//                 end_break: end_break
//             }
//         ]);
//         res.status(201).json({ msg: "EmployeeSchedule Created Successfuly" });
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }