const Sequelize = require('sequelize')
const db = require('../db')

// Do we need a separate table for order history? Or can we combine it with Orders?
// Rename this table to make it our through table
// add necessary columns to make it an association between product and order (in index.js)
const OrderLineItem = db.define('orderLineItem', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
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
  }
})

module.exports = OrderLineItem
