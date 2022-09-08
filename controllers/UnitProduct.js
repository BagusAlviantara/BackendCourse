const Units = require("../models/UnitModel.js");
const { Op } = require("sequelize");

exports.getUnits = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Units.findAll({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit']
            });
        } else {
            response = await Units.findAll({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getUnitsByIdProduct = async(req, res) => {
    try {
        const unit = await Units.findOne({
            where: {
                product_id: req.params.id
            }
        });
        if (!unit) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Units.findAll({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit'],
                where: {
                    product_id: unit.product_id
                }
            });
        } else {
            response = await Units.findAll({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit'],
                where: {
                    [Op.and]: [{ product_id: unit.product_id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getUnitsById = async(req, res) => {
    try {
        const unit = await Units.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!unit) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Units.findOne({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit'],
                where: {
                    id: unit.id
                }
            });
        } else {
            response = await Units.findOne({
                attributes: ['id', 'product_id', 'code_unit', 'name', 'order_unit'],
                where: {
                    [Op.and]: [{ id: unit.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createUnits = async(req, res) => {
    const { id, product_id, code_unit, name, order_unit } = req.body;
    try {
        await Units.create({
            id: id,
            product_id: product_id,
            code_unit: code_unit,
            name: name,
            order_unit: order_unit
        });
        res.status(201).json({ msg: "Product unit Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateUnits = async(req, res) => {
    try {
        const unit = await Units.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!unit) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, product_id, code_unit, name, order_unit } = req.body;
        if (req.role === "Admin") {
            await Units.update({ id, product_id, code_unit, name, order_unit }, {
                where: {
                    id: unit.id
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteUnits = async(req, res) => {
    try {
        const unit = await Units.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!unit) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, product_id, code_unit, name, order_unit } = req.body;
        if (req.role === "Admin") {
            await Units.destroy({
                where: {
                    id: unit.id
                }
            });
        }
        res.status(200).json({ msg: "Product unit deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}