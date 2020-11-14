const router = require('express').Router()
const Order = require('../db/models/order')
const OrderLineItem = require('../db/models/orderLineItems')
const User = require('../db/models/user')
const Product = require('../db/models/products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [{model: Product}, {model: User}]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/orderId', async (req, res, next) => {
  try {
    const changeOrder = await Order.update({
      where: {
        id: req.params.orderId
      }
    })

    const updatedOrder = await Order.findOne({
      where: {
        id: req.body.orderId
      },
      include: [{model: Product}, {model: User}]
    })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
