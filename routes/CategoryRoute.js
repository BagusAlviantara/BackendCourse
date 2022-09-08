const express = require("express");
const {
    getCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
} = require("../controllers/CategoryProduct.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/product-categories', verifyUser, adminOnly, getCategories);
router.get('/product-categories/:id', verifyUser, adminOnly, getCategoriesById);
router.post('/product-categories', verifyUser, adminOnly, createCategories);
router.patch('/product-categories/:id', verifyUser, adminOnly, updateCategories);
router.delete('/product-categories/:id', verifyUser, adminOnly, deleteCategories);

module.exports = router;