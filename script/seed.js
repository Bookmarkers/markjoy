'use strict'
const db = require('../server/db')
const {User, Category, Goal, Bookmark, Blocked} = require('../server/db/models')
const userSeed = require('./userSeed')
const goalSeed = require('./goalSeed')
const bookmarkSeed = require('./bookmarkSeed')
const blockedSeed = require('./blockedSeed')

const categorySeed = [
  {name: 'Unsorted'},
  {name: 'Learning'},
  {name: 'Community'},
  {name: 'Lifestyle'},
  {name: 'Finance'},
  {name: 'Wellness'}
]

const localUserSeeds = [
  {
    firstName: 'Yanjaa',
    lastName: 'Wintersoul',
    email: 'yw@bm.com',
    password: '123'
  },
  {
    firstName: 'Vicky',
    lastName: 'Rodri',
    email: 'vr@bm.com',
    password: '123'
  },
  {
    firstName: 'Jianna',
    lastName: 'Park',
    email: 'jp@bm.com',
    password: '123'
  }
]
//in seed method (first refactor dummy data)
//1)associate goals with user id
//2)associate bookmarks with goals and category
//3)associate userBlocked with userId and blockeds
//4)associate userBookmarks with userId and bookmarkId

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(userSeed)
  console.log(`seeded ${users.length} users`)

  const localUsers = await Promise.all(
    localUserSeeds.map(user => User.create(user))
  )
  console.log(`seeded ${localUsers.length} users: Yanjaa, Vicky, and Jianna`)

  const categories = await Category.bulkCreate(categorySeed)
  console.log(`seeded ${categories.length} categories`)

  const goals = await Goal.bulkCreate(goalSeed)
  console.log(`seeded ${goals.length} goals`)

  const bookmarks = await Bookmark.bulkCreate(bookmarkSeed)
  console.log(`seeded ${bookmarks.length} bookmarks`)

  const blocked = await Blocked.bulkCreate(blockedSeed)
  console.log(`seeded ${blocked.length} blocked websites`)

  const jianna = await User.findOne({where: {firstName: 'Jianna'}})
  const yanjaa = await User.findOne({where: {firstName: 'Yanjaa'}})
  const vicky = await User.findOne({where: {firstName: 'Vicky'}})
  const allGoals = await Goal.findAll()

  const allBookmarks = await Bookmark.findAll()
  //console.log(allBookmarks)
  const allCategories = await Category.findAll()
  await allBookmarks[0].setCategory(allCategories[3])
  await allBookmarks[0].setGoal(allGoals[0])
  await allBookmarks[1].setCategory(allCategories[2])
  await allBookmarks[1].setGoal(allGoals[1])

  const jiannasGoals = await jianna.addGoal(allGoals[0])
  await jianna.addGoal(allGoals[1])
  await jianna.addGoal(allGoals[2])
  await jianna.addGoal(allGoals[3])
  //console.log(jiannasGoals)

  const jiannasBookmarks = await jianna.addBookmarks(allBookmarks[0])
  await jianna.addBookmarks(allBookmarks[1])
  await jianna.addBookmarks(allBookmarks[2])
  //console.log(jiannasBookmarks)

  const yanjaasGoals = await yanjaa.addGoal(allGoals[4])
  await yanjaa.addGoal(allGoals[5])
  await yanjaa.addGoal(allGoals[6])
  await yanjaa.addGoal(allGoals[7])
  //console.log(yanjaasGoals)

  const yanjaasBookmarks = await yanjaa.addBookmarks(allBookmarks[3])
  await yanjaa.addBookmarks(allBookmarks[4])
  await yanjaa.addBookmarks(allBookmarks[5])
  //console.log(yanjaasBookmarks)

  const vickysGoals = await vicky.addGoal(allGoals[8])
  await yanjaa.addGoal(allGoals[9])
  await yanjaa.addGoal(allGoals[10])
  await yanjaa.addGoal(allGoals[11])
  //console.log(vickysGoals)

  const vickysBookmarks = await vicky.addBookmarks(allBookmarks[6])
  await vicky.addBookmarks(allBookmarks[7])
  await vicky.addBookmarks(allBookmarks[8])
  //console.log(vickysBookmarks)

  const allBlockeds = await Blocked.findAll()
  await jianna.addBlocked(allBlockeds[0])
  await jianna.addBlocked(allBlockeds[3])
  await vicky.addBlocked(allBlockeds[1])
  await vicky.addBlocked(allBlockeds[4])
  await vicky.addBlocked(allBlockeds[0])
  await yanjaa.addBlocked(allBlockeds[2])
  await yanjaa.addBlocked(allBlockeds[5])
  await yanjaa.addBlocked(allBlockeds[0])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
