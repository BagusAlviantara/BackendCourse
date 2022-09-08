const Categories = require("../models/CategoryModel.js");
const { Op } = require("sequelize");

exports.getCategories = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Categories.findAll({
                attributes: ['id', 'code_category', 'name']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getCategoriesById = async(req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Categories.findOne({
                attributes: ['id', 'code_category', 'name'],
                where: {
                    id: category.id
                }
            });
        } else {
            response = await Categories.findOne({
                attributes: ['id', 'code_category', 'name'],
                where: {
                    [Op.and]: [{ id: category.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createCategories = async(req, res) => {
    const { id, code_category, name } = req.body;
    try {
        await Categories.create({
            id: id,
            code_category: code_category,
            name: name,
        });
        res.status(201).json({ msg: "Product Category Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateCategories = async(req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, code_category, name } = req.body;
        if (req.role === "Admin") {
            await Categories.update({ id, code_category, name }, {
                where: {
                    id: category.id
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteCategories = async(req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, code_category, name } = req.body;
        if (req.role === "Admin") {
            await Categories.destroy({
                where: {
                    id: category.id
                }
            });
        }
        res.status(200).json({ msg: "Product Category deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}