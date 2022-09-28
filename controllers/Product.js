const Product = require("../models/ProductModel.js");
const { Op } = require("sequelize");
const sequelize = require("sequelize");


exports.getProducts = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Product.findAll({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period']
            });
        } else {
            response = await Product.findAll({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductsByDistinct = async(req, res) => {
    try {
        if (req.role === "Admin") {
            await Product.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('name')), 'Name Product']
                ]
            }).then(function(response) {
                res.status(200).json(response);
            });
        } else {
            await Product.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('name')), 'Name Product']
                ]
            }).then(function(response) {
                res.status(200).json(response);
            });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Product.findOne({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period'],
                where: {
                    id: product.id
                }
            });
        } else {
            response = await Product.findOne({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period'],
                where: {
                    [Op.and]: [{ id: product.id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductByCategories = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                category_id: req.query.category_id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "Admin") {
            response = await Product.findAll({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period'],
                where: {
                    category_id: product.category_id
                }
            });
        } else {
            response = await Product.findAll({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period'],
                where: {
                    [Op.and]: [{ category_id: product.category_id }]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


exports.createProduct = async(req, res) => {
    const { id, category_id, code_product, name, description, price, days_period } = req.body;
    const product = await Product.findOne({
        where: {
            code_product: req.body.code_product
        }
    });
    if (product) return res.status(404).json({ msg: "Code Product Harus Berbeda" });
    try {
        await Product.create({
            id: id,
            category_id: category_id,
            code_product: code_product,
            name: name,
            description: description,
            price: price,
            days_period: days_period
        });
        res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// //Percobaan menggunakan concat
// exports.concatProduct = async(req, res) => {
//     const filters = req.query;
//     const filteredProduct = response.filter(product => {
//         let isValid = true;
//         for (response in filters) {
//             console.log(response, product[response], filters[response]);
//             isValid = isValid && user[response] == filters[response];
//         }
//         return isValid;
//     });
//     res.send(filteredProduct);
// }

exports.getProductCount = async(req, res) => {
    try {

        await Product.count({
            col: "name",
        }).then(function(count) {
            res.status(200).json(count);
        });
        // const count = await Product.count({
        //     col: 'name',
        // });
        // res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getProductCountbyAge = async(req, res) => {
    try {

        await Product.count({
            col: "Age",
        }).then(function(count) {
            res.status(200).json(count);
        });
        // const count = await Product.count({
        //     col: 'name',
        // });
        // res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { id, category_id, code_product, name, description, price, days_period } = req.body;
        if (req.role === "Admin") {
            await Product.update({ id, category_id, code_product, name, description, price, days_period }, {
                where: {
                    id: product.id
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { category_id, code_product, name, description, price, days_period } = req.body;
        if (req.role === "Admin") {
            await Product.destroy({
                where: {
                    id: product.id
                }
            });
        }
        res.status(200).json({ msg: "Product deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}