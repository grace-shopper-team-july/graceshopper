// const path = require('path')
const express = require('express')
// const morgan = require('morgan')
// const compression = require('compression')
// const session = require('express-session')
// const passport = require('passport')
// const SequelizeStore = require('connect-session-sequelize')(session.Store)
// const db = require('./db')
// const sessionStore = new SequelizeStore({db})
// const PORT = process.env.PORT || 8080
const app = express()
// const socketio = require('socket.io')
module.exports = app

// function isAdmin(req, res, next) {
//   if (req.body.user.admin) {
//     return true
//   }
//   return false
// }

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

module.exports = isAdmin
