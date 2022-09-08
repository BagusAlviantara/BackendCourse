const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Products = require("./ProductModel.js");

const { DataTypes } = Sequelize;

const Unit = db.define('product_units', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    code_unit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 10]
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    order_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Products.hasMany(Unit, { foreignKey: 'product_id' });
Unit.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = Unit;