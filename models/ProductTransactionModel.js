const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Product = require("./ProductModel.js");
const Student = require("./StudentModel.js");

const { DataTypes } = Sequelize;

const ProductTransaction = db.define('product_transaction', {
    student_product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        },
        validate: {
            notEmpty: true,
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        validate: {
            notEmpty: true,
        }
    },
    register_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    }
}, {
    freezeTableName: true,
    timestamps: 'true',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Student.belongsToMany(ProductTransaction, { as: 'Studentbaru' });
// ProductTransaction.belongsToMany(Student, { as: 'Studentbaru' });

Product.hasOne(ProductTransaction, { foreignkey: 'product_id' });
ProductTransaction.belongsTo(Product, { foreignkey: 'product_id' });

module.exports = ProductTransaction;