const {Bookmark} = require('../db/models')

const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/bookmarks', require('./bookmarks'))
router.use('/goals', require('./goals'))
router.use('/blocked', require('./blocked'))

router.get('/', (req, res, next) => {
  try {
    res.status(404).send('Access Denied!')
  } catch (error) {
    next(error)
  }
})

// router.get('/bookmarks', (req, res, next) => {
//   try {
//    res.status(404).send('Access Denied!')
//   } catch (error) {
//     next(error)
//   }
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
