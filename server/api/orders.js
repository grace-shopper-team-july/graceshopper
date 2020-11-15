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

router.put('/:orderId', async (req, res, next) => {
  try {
    const changeOrder = await Order.update(req.body, {
      where: {
        id: req.params.orderId
      }
    })

    const updatedOrder = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [{model: Product}, {model: User}]
    })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/orderItem', async (req, res, next) => {
  try {
    const newOrderItem = await OrderLineItem.create(req.body)
    res.json(newOrderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/orderItem/:orderId/:productId', async (req, res, next) => {
  console.log(req.body)
  try {
    const updateOrderItem = await OrderLineItem.update(req.body, {
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })

    const updatedItem = await OrderLineItem.findOne({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })

    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/orderItem/:orderId/:productId', async (req, res, next) => {
  try {
    const deleted = await OrderLineItem.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })
    if (deleted === 0) {
      res.status(404).send('404 Error')
    } else {
      res.status(204).send()
    }
  } catch (err) {
    next(err)
  }
})
