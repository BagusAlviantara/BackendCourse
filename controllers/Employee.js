const Employee = require("../models/EmployeeModel.js");
const Department = require("../models/DepartmentModel.js");
const { Op } = require("sequelize");

exports.getEmployee = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Employee.findAll({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department_id'],
                include: [
                    { model: Department }
                ]

            });
        } else if (req.role = "Employee") {
            response = await Employee.findAll({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department_id'],
                include: [
                    { model: Department }
                ]
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
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department_id'],
                where: {
                    id: employee.id
                }
            });
        } else {
            response = await Employee.findOne({
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department_id'],
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
    const employee = await Employee.findOne({
        where: {
            user_id: req.body.user_id,
        }
    });
    if (employee) {
        return res.status(409).json({ msg: "User ID already exists, Input different User ID" });
    }
    const { id, user_id, name_employee, address, gender, phone, department_id } = req.body;
    try {
        await Employee.create({
            id: id,
            user_id: user_id,
            name_employee: name_employee,
            address: address,
            gender: gender,
            phone: phone,
            department_id: department_id,
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
        const { id, user_id, name_employee, address, gender, phone, department_id } = req.body;
        if (req.role === "Admin") {
            await Employee.update({ id, user_id, name_employee, address, gender, phone, department_id }, {
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

exports.updateEmployeeNama = async(req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                user_id: req.params.id
            }
        });
        if (!employee) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name_employee, phone } = req.body;
        if (req.role === "Admin") {
            await Employee.update({ name_employee, phone }, {
                where: {
                    user_id: employee.user_id
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
        const { user_id, name_employee, address, gender, phone, department_id } = req.body;
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

exports.getEmployeeCount = async(req, res) => {
    try {

        await Employee.count({
            col: "id",
        }).then(function(count) {
            res.status(200).json(count);
        });
        // const count = await Employee.count({
        //     col: 'name',
        // });
        // res.status(200).json(count);
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
                attributes: ['id', 'user_id', 'name_employee', 'address', 'gender', 'phone', 'department_id']
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