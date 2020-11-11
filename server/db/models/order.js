const Sequelize = require('sequelize')
const db = require('../db')

// Could our total have a default value? And a minimum of 0?
// Talk me through the sessionId and token - we can safely remove these columns and deal with persistant guest storage during tier 2
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