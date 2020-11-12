const router = require('express').Router()
const {all} = require('../db/models/products')
const Product = require('../db/models/products')

//get all products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
