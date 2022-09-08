const Employee = require("../models/EmployeeModel.js");
const Schedule = require("../models/ClassScheduleModel.js");
const { Op } = require("sequelize");
const StudentCourse = require("../models/StudentCourseModel.js");

exports.getEmployee = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Employee.findAll({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeById = async(req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employee) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Employee.findOne({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department'],
                where: {
                    id: employee.id
                }
            });
        } else {
            response = await Employee.findOne({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department'],
                where: {
                    [Op.and]: [{ id: employee.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createEmployee = async(req, res) => {
    const { id, user_id, name_employee, address, gender, phone, department } = req.body;
    try {
        await Employee.create({
            id: id,
            user_id: user_id,
            name_employee: name_employee,
            address: address,
            gender: gender,
            phone: phone,
            department: department,
        });
        res.status(201).json({ msg: "Employee Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateEmployee = async(req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employee) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, user_id, name_employee, address, gender, phone, department } = req.body;
        if (req.role === "Admin") {
            await Employee.update({ id, user_id, name_employee, address, gender, phone, department }, {
                where: {
                    id: employee.id
                }
            });
        }
        res.status(200).json({ msg: "Employee updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteEmployee = async(req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!employee) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { user_id, name_employee, address, gender, phone, department } = req.body;
        if (req.role === "Admin") {
            await Employee.destroy({
                where: {
                    id: employee.id
                }
            });
        }
        res.status(200).json({ msg: "Employee deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEmployeeJoinClass = async(req, res) => {
    try {
        Employee.findOne({
            where: {
                id: req.params.id
            }

        });
        let response;
        if (req.role === "Admin") {
            response = await Employee.findAll({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// const employee = await Employee.findAll({
//     where: {
//         id: employee.id
//     },
//     include: [{
//         model: Payments,
//         where: ['Payments.user_id = Users.id'],
//         required: true
//     }]
// })