const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
    price: {
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
        },
        defaultValue: 1
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

module.exports = CartItem;