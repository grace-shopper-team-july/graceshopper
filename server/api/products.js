const router = require('express').Router()
const Product = require('../db/models/products')
const isAdmin = require('./adminCheck')
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

router.put('/:productId', async (req, res, next) => {
  try {
    if ((await isAdmin(req)) === true) {
      const change = await Product.update(req.body, {
        where: {
          id: req.params.productId
        }
      })
      const updatedProduct = await Product.findOne({
        where: {
          id: req.params.productId
        }
      })
      res.json(updatedProduct)
    } else {
      alert('User not Authorized for this action!')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if ((await isAdmin(req)) === true) {
      const deletedProduct = await Product.destroy({
        where: {
          id: req.params.productId
        }
      })
      if (deletedProduct === 0) {
        res.status(404).send('404 Error')
      } else {
        res.status(204).send()
      }
    } else {
      alert('User not Authorized for this action!')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if ((await isAdmin(req)) === true) {
      const newProduct = await Product.create(req.body)
      res.json(newProduct)
    } else {
      alert('User not Authorized for this action!')
    }
  } catch (err) {
    next(err)
  }
})
