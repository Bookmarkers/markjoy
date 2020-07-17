const router = require('express').Router()
const {Bookmark} = require('../db/models')
const {checkIfUserHasBookmark} = require('../../utils')
module.exports = router

router.get('/:id', checkIfUserHasBookmark, async (req, res, next) => {
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

router.get('/goal/:id', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        userId: req.user.id,
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
    const foundBookmark = await Bookmark.findOne({
      where: {
        url: req.body.url,
        userId: req.user.id
      }
    })
    if (foundBookmark) {
      res.status(200).json(foundBookmark)
    } else {
      const newBookmark = await Bookmark.create(req.body)
      if (newBookmark) {
        res.status(201).json(newBookmark)
      } else {
        res.sendStatus(404)
      }
    }
  } catch (error) {
    next(error)
  }
})

// router.post('/bulk', async (req, res, next) => {
//   try {
//     let info = []
//     const findOrCreateArr = req.body.map(chromeMark => {
//       const urlAndUserObj = {
//         url: chromeMark.url,
//         userId: chromeMark.userId
//       }
//       info.push({
//         url: chromeMark.url,
//         userId: chromeMark.userId,
//         title: chromeMark.title,
//         imageUrl: chromeMark.imageUrl
//       })
//       return Bookmark.findOrCreate({where: urlAndUserObj})
//     })
//     const findOrCreateRes = await Promise.all(findOrCreateArr)
//     const returnedIds = findOrCreateRes.map(resArr => resArr[0].id)
//     const updateArr = returnedIds.map((id, idx) => {
//       const updateObj = {
//         id,
//         url: info[idx].url,
//         userId: info[idx].userId,
//         title: info[idx].title,
//         imageUrl: info[idx].imageUrl,
//         categoryId: 6
//       }
//       return Bookmark.upsert(updateObj, {returning: true})
//     })
//     const updatedBookmarks = await Promise.all(updateArr)
//     if (updatedBookmarks) {
//      res.status(201).json(updatedBookmarks)
//     } else {
//      res.sendStatus(400)
//     }
//   } catch (error) {
//     next(error)
//   }

router.post('/massbulk', async (req, res, next) => {
  try {
    const newBookmarks = await Bookmark.bulkCreate(
      req.body
      // ,{ updateOnDuplicate: ["url"] }
    )
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

router.delete('/:id', checkIfUserHasBookmark, async (req, res, next) => {
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

router.delete('/', async (req, res, next) => {
  try {
    const foundBookmark = await Bookmark.findOne({
      where: {
        url: req.body.url,
        userId: req.user.id
      }
    })
    if (foundBookmark) {
      await foundBookmark.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
