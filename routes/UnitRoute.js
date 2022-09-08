const express = require("express");
const {
    getUnits,
    getUnitsById,
    getUnitsByIdProduct,
    createUnits,
    updateUnits,
    deleteUnits
} = require("../controllers/UnitProduct.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/product-units', verifyUser, adminOnly, getUnits);
router.get('/product-units/:id', verifyUser, adminOnly, getUnitsById);
router.get('/product-unitsbyproductid/:id', verifyUser, adminOnly, getUnitsByIdProduct);
router.post('/product-units', verifyUser, adminOnly, createUnits);
router.patch('/product-units/:id', verifyUser, adminOnly, updateUnits);
router.delete('/product-units/:id', verifyUser, adminOnly, deleteUnits);

module.exports = router;