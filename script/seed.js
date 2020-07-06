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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(userSeed)
  console.log(`seeded ${users.length} users`)

  await Promise.all([
    User.create({
      firstName: 'Yanjaa',
      lastName: 'Wintersoul',
      email: 'yj@bm.com',
      password: '123'
    }),
    User.create({
      firstName: 'Vicky',
      lastName: 'Rodriguez',
      email: 'vr@bm.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jianna',
      lastName: 'Park',
      email: 'jp@bm.com',
      password: '123'
    })
  ])
  console.log(`seeded Yanjaa, Vicky, and Jianna as users`)

  const categories = await Category.bulkCreate(categorySeed)
  console.log(`seeded ${categories.length} categories`)

  const goals = await Goal.bulkCreate(goalSeed)
  console.log(`seeded ${goals.length} goals`)

  const bookmarks = await Bookmark.bulkCreate(bookmarkSeed)
  console.log(`seeded ${bookmarks.length} bookmarks`)

  const blocked = await Blocked.bulkCreate(blockedSeed)
  console.log(`seeded ${blocked.length} blocked websites`)

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
