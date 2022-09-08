const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Category = require("./CategoryModel.js");

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    code_product: {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    days_period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2]
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Category.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Products;