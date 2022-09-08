const ProductTransaction = require("../models/ProductTransactionModel.js");
const { Op } = require("sequelize");
const Student = require("../models/StudentModel.js");
const Product = require("../models/ProductModel.js");

exports.getProductTransaction = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await ProductTransaction.findAll({
                attributes: ['student_product_id', 'student_id', 'product_id', 'register_date'],
                include: {
                    model: Product,
                    // include: Student
                }
            });
        } else {
            response = await ProductTransaction.findAll({
                attributes: ['student_product_id', 'student_id', 'product_id', 'register_date']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductTransactionByID = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                student_product_id: req.params.student_product_id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tstudent_product_idak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Product.findOne({
                attributes: ['student_product_id', 'student_id', 'product_id', 'register_date'],
                where: {
                    student_product_id: product.student_product_id
                }
            });
        } else {
            response = await Product.findOne({
                attributes: ['student_product_id', 'student_id', 'product_id', 'register_date'],
                where: {
                    [Op.and]: [{ student_product_id: product.student_product_id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createProductTransaction = async(req, res) => {
    const { student_product_id, student_id, product_id, register_date, description, price, days_period } = req.body;
    const product = await Product.findOne({
        where: {
            product_id: req.body.product_id
        }
    });
    if (product) return res.status(404).json({ msg: "Code Product Harus Berbeda" });
    try {
        await Product.create({
            student_product_id: student_product_id,
            student_id: student_id,
            product_id: product_id,
            register_date: register_date,
            description: description,
            price: price,
            days_period: days_period
        });
        res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductTransactionCount = async(req, res) => {
    try {

        await Product.count({
            col: "register_date",
        }).then(function(count) {
            res.status(200).json(count);
        });
        // const count = await Product.count({
        //     col: 'register_date',
        // });
        // res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateProductTransaction = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                student_product_id: req.params.student_product_id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tstudent_product_idak ditemukan" });
        const { student_product_id, student_id, product_id, register_date, description, price, days_period } = req.body;
        if (req.role === "Admin") {
            await Product.update({ student_product_id, student_id, product_id, register_date, description, price, days_period }, {
                where: {
                    student_product_id: product.student_product_id
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteProductTransaction = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                student_product_id: req.params.student_product_id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tstudent_product_idak ditemukan" });
        const { student_id, product_id, register_date, description, price, days_period } = req.body;
        if (req.role === "Admin") {
            await Product.destroy({
                where: {
                    student_product_id: product.student_product_id
                }
            });
        }
        res.status(200).json({ msg: "Product deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}