const Sequelize = require('sequelize')
const db = require('../db')

// do we need a separate table for order history? Or can we combine it with Orders?
const OrderHistory = db.define('orderHistory', {
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
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
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

module.exports = OrderHistory;