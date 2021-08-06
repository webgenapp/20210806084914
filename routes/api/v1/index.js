const express = require('express')
const router = express.Router()

const catsRouter = require('./cats')
router.use('/cats', catsRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
