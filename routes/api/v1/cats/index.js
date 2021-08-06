const express = require('express')
const router = express.Router()
const { Cat } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const cats = await Cat.findAll()

  res.send(cats)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const cat = await Cat.findOne({ where: { id } })

  res.send(cat)
})

router.post('/', auth, async function (req, res, next) {
  const cat = await Cat.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(cat)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Cat.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const cat = await Cat.findOne({ where: { id } })

  cat.name = req.body.name

  cat.save()

  res.send(cat)
})

module.exports = router
