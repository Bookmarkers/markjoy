const router = require('express').Router()
const {Bookmark} = require('../db/models')
module.exports = router

// get all, get by id, update by id, delete by id, and create routes
router.get('/:id', async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id)
    if (bookmark) {
      res.status(200).json(bookmark)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll()
    if (bookmarks) {
      res.status(200).res.json(bookmarks)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newBookmark = await Bookmark.create(req.body)
    if (newBookmark) {
      res.status(201).json(newBookmark)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const bookmarkToUpdate = await Bookmark.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (bookmarkToUpdate) {
      res.status(200).res.json(bookmarkToUpdate)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const bookmarkToDelete = await Bookmark.destroy({
      where: {
        id: req.params.id
      }
    })
    if (bookmarkToDelete) {
      res.status(202)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
