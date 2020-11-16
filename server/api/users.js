const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// protect these routes

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    console.log('put', req.body)
    console.log('params', req.params.userId)
    const user = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    const updatedUser = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
