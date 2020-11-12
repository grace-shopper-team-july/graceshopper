const router = require('express').Router()
const Product = require('../db/models/products')
module.exports = router

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
