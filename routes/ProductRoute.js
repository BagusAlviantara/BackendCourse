const express = require("express");
const {
    getProducts,
    getProductById,
    createProduct,
    //createProductConcat,
    updateProduct,
    deleteProduct
} = require("../controllers/Product.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/products', verifyUser, adminOnly, getProducts);
router.get('/products/:id', verifyUser, adminOnly, getProductById);
router.post('/products', verifyUser, adminOnly, createProduct);
//router.post('/productsConcat', verifyUser, adminOnly, createProductConcat);
router.patch('/products/:id', verifyUser, adminOnly, updateProduct);
router.delete('/products/:id', verifyUser, adminOnly, deleteProduct);

module.exports = router;