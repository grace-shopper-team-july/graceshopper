const Sequelize = require('sequelize')
const db = require('../db')

// could our total have a default value?
// talk me through the sessionId and token
const Order = db.define('order', {
    payment: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: Sequelize.DATE
    },
    sessionId: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
})

module.exports = Order;