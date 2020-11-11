const User = require('./user')
// const Species = require('./species')
const Order = require('./order')
const OrderHistory = require('./orderHistory')
// const Cart = require('./cart')
// const CartItem = require('./cartItem')
// const Category = require('./category')
const Product = require('./products')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(User)
User.hasMany(Order)

// reconfigure the below associations and create many-to-many
// * check the docs * 

OrderHistory.belongsTo(Order)
Order.hasMany(OrderHistory)

OrderHistory.belongsTo(Product)
Product.hasMany(OrderHistory)

// Product.belongsTo(Category)
// Category.hasMany(Product)

// Product.belongsTo(Species)
// Species.hasMany(Product)

// Cart.belongsTo(User)
// User.hasMany(Cart)

// CartItem.belongsTo(Product)
// Product.hasMany(CartItem)

// CartItem.belongsTo(Cart)
// Cart.hasMany(CartItem)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  // Species,
  Order,
  OrderHistory,
  // Cart,
  // CartItem,
  // Category,
  Product
}
