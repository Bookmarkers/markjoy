const router = require('express').Router()
const {User} = require('../db/models')
const {checkIfAdmin} = require('../../utils')
module.exports = router

router.use((req, res, next) => {
  if (req.user && checkIfAdmin(req.user)) {
    next()
  } else {
    res.status(401).send('ACCESS DENIED')
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
