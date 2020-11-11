const Sequelize = require('sequelize')
const db = require('../db')

// should quantity on hand get a minimum value?
const Product = db.define('product', {
  sku: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwestsiderc.org%2Fboard-of-directors%2Fimage-not-available%2F&psig=AOvVaw09ypemOREpBkush-WB3WeL&ust=1605125157161000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKip16_j-OwCFQAAAAAdAAAAABAD'
  },
  qoh: {
    //quantity on hand
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 0
  },
  shop: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  species: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Product
