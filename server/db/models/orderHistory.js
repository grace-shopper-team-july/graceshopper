const Sequelize = require('sequelize')
const db = require('../db')

// Do we need a separate table for order history? Or can we combine it with Orders?
// Rename this table to make it our through table
// add necessary columns to make it an association between product and order (in index.js)
const OrderHistory = db.define('orderHistory', {
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // total is more of an overview column, can go on order table
    total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // I recommend that you move this to Order table so it only has to update one row when we checkout
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

module.exports = OrderHistory;