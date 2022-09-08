const Department = require("../models/DepartmentModel.js");
const { Op } = require("sequelize");

exports.getDepartment = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Department.findAll({
                attributes: ['id', 'name']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getDepartmentById = async(req, res) => {
    try {
        const department = await Department.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!department) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Department.findOne({
                attributes: ['id', 'name'],
                where: {
                    id: department.id
                }
            });
        } else {
            response = await Department.findOne({
                attributes: ['id', 'name'],
                where: {
                    [Op.and]: [{ id: department.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createDepartment = async(req, res) => {
    const { id, name } = req.body;
    try {
        await Department.create({
            id: id,
            name: name,
        });
        res.status(201).json({ msg: "Department Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateDepartment = async(req, res) => {
    try {
        const department = await Department.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!department) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, name } = req.body;
        if (req.role === "Admin") {
            await Department.update({ id, name }, {
                where: {
                    id: department.id
                }
            });
        }
        res.status(200).json({ msg: "Department updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteDepartment = async(req, res) => {
    try {
        const department = await Department.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!department) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, name } = req.body;
        if (req.role === "Admin") {
            await Department.destroy({
                where: {
                    id: department.id
                }
            });
        }
        res.status(200).json({ msg: "Department deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}