const router = require('express').Router()
const {Goal} = require('../db/models')
module.exports = router

// Delete, update, create, get one goal. Get all goals.
// Potentially should it be by user? I.e. '/userId:/id' where userId: req.params.userId and id is id?

router.delete('/:id', async (req, res, next) => {
  try {
    const goalToDelete = await Goal.destroy({
      where: {
        id: req.params.id
      }
    })
    if (goalToDelete) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const goalToUpdate = await Goal.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (goalToUpdate) {
      res.status(200).json(goalToUpdate)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newGoal = await Goal.create(req.body)
    if (newGoal) {
      res.status(201).json(newGoal)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userGoals = await Goal.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (userGoals) {
      res.status(200).json(userGoals)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id)
    if (goal) {
      res.status(200).json(goal)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const goals = await Goal.findAll()
    if (goals) {
      res.status(200).json(goals)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
