const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Bookmark = db.model('bookmark')
const Category = db.model('category')
const Goal = db.model('goal')

// describe('Bookmark routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/bookmarks/', () => {
//     const bookmarks = [
//       {
//         url: 'https://www.interviewcake.com'
//       },
//       {
//         url: 'https://www.algoexpert.io'
//       },
//       {
//         url: 'https://devpost.com/'
//       },
//       {
//         url: 'https://leetcode.com/'
//       },
//       {
//         url: 'https://www.educative.io/'
//       }
//     ]

//     beforeEach(() => {
//       return Bookmark.bulkCreate(bookmarks)
//     })

//     it('GET /api/bookmarks', async () => {
//       const res = await request(app)
//         .get('/api/bookmarks')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].url).to.be.equal(bookmarks[0].url)
//       expect(res.body[3].url).to.be.equal(bookmarks[3].url)
//       expect(res.body[2].url).to.not.be.equal(bookmarks[4].url)
//     })

//     it('POST /api/bookmarks', async () => {
//       const newBookmark = {
//         url: 'http://markjoy.herokuapp.com/'
//       }

//       const res = await request(app)
//         .post('/api/bookmarks')
//         .send(newBookmark)
//         .expect(201)

//       expect(res.body).to.be.an('object')
//       expect(res.body.url).to.be.equal(newBookmark.url)
//     })

//     it('GET /api/bookmarks/category/:id', async () => {
//       const categorySeed = [
//         {name: 'Unsorted'},
//         {name: 'Learning'},
//         {name: 'Community'},
//         {name: 'Lifestyle'},
//         {name: 'Finance'},
//         {name: 'Wellness'}
//       ]

//       await Category.bulkCreate(categorySeed)
//       const categories = await Category.findAll()

//       const allBookmarks = await Bookmark.findAll()

//       await Promise.all(
//         allBookmarks.map(bookmark =>
//           bookmark.update({categoryId: categories[1].id})
//         )
//       )

//       const res = await request(app)
//         .get(`/api/bookmarks/category/${categories[1].id}`)
//         .expect(200)

//       expect(res.body).to.have.lengthOf(bookmarks.length)
//       expect(res.body[0].categoryId).to.be.equal(categories[1].id)
//       expect(res.body[2].categoryId).to.not.be.equal(categories[2].id)
//     })

//     it('GET /api/bookmarks/goal/:id', async () => {
//       const goalSeed = [
//         {detail: 'Get swoll'},
//         {detail: 'Brush teeth thrice a day'},
//         {detail: 'Survive 2020'}
//       ]

//       await Goal.bulkCreate(goalSeed)
//       const goals = await Goal.findAll()

//       const allBookmarks = await Bookmark.findAll()

//       await Promise.all(
//         allBookmarks.map(bookmark => bookmark.update({goalId: goals[1].id}))
//       )

//       const res = await request(app)
//         .get(`/api/bookmarks/goal/${goals[1].id}`)
//         .expect(200)

//       expect(res.body).to.have.lengthOf(bookmarks.length)
//       expect(res.body[0].goalId).to.be.equal(goals[1].id)
//       expect(res.body[2].goalId).to.not.be.equal(goals[2].id)
//     })
//   })
// })
