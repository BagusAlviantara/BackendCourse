const express = require("express");
const {
    getProducts,
    getProductById,
    getProductsByDistinct,
    getProductByCategories,
    createProduct,
    getProductCount,
    updateProduct,
    deleteProduct
} = require("../controllers/Product.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductById);
router.get('/products-distinct', verifyUser, getProductsByDistinct);
router.get('/products-by-categories/:id', verifyUser, getProductByCategories);
router.post('/products', verifyUser, adminOnly, createProduct);
router.get('/products-count', getProductCount);
router.patch('/products/:id', verifyUser, adminOnly, updateProduct);
router.delete('/products/:id', verifyUser, adminOnly, deleteProduct);

module.exports = router;