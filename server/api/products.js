const router = require('express').Router()
const Product = require('../db/models/products')
// const isAdmin = require('./adminCheck')
module.exports = router

async function isAdmin(req, res, next) {
  try {
    console.log('in isAdmin')
    console.log('REQ.BODY.USER.ADMIN:  ', req.user.dataValues.admin)
    if (req.user.dataValues.admin) {
      console.log('returning true')
      return true
    }
    return false
  } catch (error) {
    next(error)
  }
}

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
  } catch (err) {
    next(err)
  }
})

// router.delete('/:productId', async (req, res, next) => {
//   console.log('1')
//   try {
//     console.log('2')
//     const deletedProduct = await Product.destroy({
//       where: {
//         id: req.params.productId
//       }
//     })
//     console.log('3')
//     if (deletedProduct === 0) {
//       res.status(404).send('404 Error')
//     } else {
//       res.status(204).send()
//     }
//     console.log('4')
//   } catch (err) {
//     next(err)
//   }
// })
router.delete('/:productId', async (req, res, next) => {
  console.log('1')
  try {
    console.log('2')
    let authCheck = await isAdmin(req)
    console.log(authCheck)
    if (authCheck === true) {
      console.log('3')
      const deletedProduct = await Product.destroy({
        where: {
          id: req.params.productId
        }
      })
      console.log('4')
      if (deletedProduct === 0) {
        res.status(404).send('404 Error')
      } else {
        res.status(204).send()
      }
    } else {
      console.log('isAdmin returned false??')
    }
  } catch (err) {
    next(err)
  }
})
// router.delete('/:productId', async (req, res, next) => {
//   if (isAdmin() === true) {
//     try {
//       const deletedProduct = await Product.destroy({
//         where: {
//           id: req.params.productId
//         }
//       })
//       if (deletedProduct === 0) {
//         res.status(404).send('404 Error')
//       } else {
//         res.status(204).send()
//       }
//     } catch (err) {
//       next(err)
//     }
//   } else {
//     alert('User not Authorized for this action!')
//     res.sendStatus(401)
//   }
// })
// router.delete('/:productId', isAdmin, async (req, res, next) => {
//   try {
//     console.log('1:     in delete prod')
//     const authCheck = await isAdmin(req)
//     if (authCheck === true) {
//       console.log('2A:    in if isAdmin checker')
//       console.log('3')
//       const deletedProduct = await Product.destroy({
//         where: {
//           id: req.params.productId
//         }
//       })
//       console.log('4')
//       if (deletedProduct === 0) {
//         res.status(404).send('404 Error')
//       } else {
//         res.status(204).send()
//       }
//       console.log('5')
//     } else {
//       console.log('2B')
//       alert('User not Authorized for this action!')
//       res.sendStatus(401)
//     }
//   } catch (error) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
