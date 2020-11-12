const router = require('express').Router()
const Product = require('../db/models/products')
module.exports = router

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

//get single products
router.get('/:productId', async (req, res, next) => {
  try {
    let singleProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

