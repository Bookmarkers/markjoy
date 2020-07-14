const router = require('express').Router()
const {Bookmark} = require('../db/models')
// const { ChromeMarks } = require('../../bg')
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

// get all bookmarks with categoryId
router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        userId: req.user.id,
        categoryId: req.params.categoryId
      }
    })
    if (bookmarks) {
      res.status(200).json(bookmarks)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// get all bookmarks with goalId
router.get('/goal/:id', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        goalId: req.params.id
      }
    })
    if (bookmarks) {
      res.status(200).json(bookmarks)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (bookmarks) {
      res.status(200).json(bookmarks)
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

// findOrCreate
// promises need to be put into an array
// Promise.all
// then bulk resolve

// SPICEY .POST - BULK CREATION OF BOOKMARKS ALREADY IN THE BROWSER FOR FIRST TIME USERS
router.post('/user/:userId', async (req, res, next) => {
  // PSEUDOCODE:
  // GIVEN EITHER AN ARRAY OF OBJECTS OR AN ARRAY OF PROMISES
  // POST/CREATE/INSERT THIS BOOKMARK INTO OUR BOOKMARKS TABLE IN THE DATABASE
  try {
    // ARRAY OF PROMISES (EMPTY)
    let promises = []
    // ARRAY OF OBJECTS (2 bookmarks to insert)
    const bookmarksArray = [
      {
        url: 'vecka.nu',
        imageUrl: 'vecka.nu/favicon.ico',
        title: 'A place to know what week it is'
      },
      {
        url: 'potatoes.com',
        title: 'just potatoes, you know?'
      }
    ]
    const newBookmarks = await Bookmark.bulkCreate(bookmarksArray)
    if (newBookmarks) {
      res.status(201).json(newBookmarks)
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
      res.status(200).json(bookmarkToUpdate)
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
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
