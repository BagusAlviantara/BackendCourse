const express = require("express");
const {
    getProducts,
    getProductById,
    getProductsByDistinct,
    getProductByCategories,
    getProductCount,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/Product.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductById);
router.get('/products-distinct', verifyUser, getProductsByDistinct);
router.get('/products-by-categories/:id', verifyUser, getProductByCategories);
router.get('/products-count', verifyUser, adminOnly, getProductCount);
router.post('/products', verifyUser, adminOnly, createProduct);
router.patch('/products/:id', verifyUser, adminOnly, updateProduct);
router.delete('/products/:id', verifyUser, adminOnly, deleteProduct);

module.exports = router;