const Product = require("../models/ProductModel.js");
const { Op } = require("sequelize");

exports.getProducts = async(req, res) => {
    try {
        let response;
        if (req.role === "Admin") {
            response = await Product.findAll({
                attributes: ['id', 'category_id', 'code_product', 'name', 'description', 'price', 'days_period']
            });
        }
        res.status(200).json(response);
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

exports.createProduct = async(req, res) => {
    const { id, category_id, code_product, name, description, price, days_period } = req.body;
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

// exports.createProductConcat = async(req, res) => {
//     const { id, category_id, code_product, name, description, price, days_period } = req.body;
//     try {
//         await Product.create({
//             id: [
//                 sequelize.fn('CONCAT',
//                     sequelize.col('category_id'), ', ',
//                     sequelize.col('code_product'), ', ',
//                     sequelize.col('created_at')
//                 ),
//                 'id'
//             ],
//             category_id: category_id,
//             code_product: code_product,
//             name: name,
//             description: description,
//             price: price,
//             days_period: days_period
//         });
//         res.status(201).json({ msg: "Product Created Successfuly" });
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

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