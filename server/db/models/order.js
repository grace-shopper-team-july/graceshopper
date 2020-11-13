const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  payment: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    },
    defaultValue: 0
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
