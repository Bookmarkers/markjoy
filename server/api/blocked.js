const router = require('express').Router()
const {User, Blocked, UserBlocked} = require('../db/models')
module.exports = router

// get all blocked urls with userId
router.get('/user/:id', async (req, res, next) => {
  try {
    const userWithBlocked = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Blocked,
          through: {
            model: UserBlocked
          }
        }
      ]
    })
    if (userWithBlocked) {
      res.status(200).json(userWithBlocked.blockeds)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/user/:id', async (req, res, next) => {
  try {
    let newBlocked = await Blocked.findOrCreate({
      where: {
        url: req.body.url
      }
    })
    if (Array.isArray(newBlocked)) {
      newBlocked = newBlocked[0]
    }
    await UserBlocked.create({userId: req.params.id, blockedId: newBlocked.id})
  } catch (error) {
    next(error)
  }
})

router.delete('/user/:userId/:blockedId', async (req, res, next) => {
  try {
    const blockedToDelete = await UserBlocked.destroy({
      where: {
        userId: req.params.userId,
        blockedId: req.params.blockedId
      }
    })
    if (blockedToDelete) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
