const User = require('./user')
const Blocked = require('./blocked')
const Goal = require('./goal')
const Bookmark = require('./bookmark')
const UserBlocked = require('./userBlocked')
const UserBookmark = require('./userBookmark')
const Category = require('./category')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Goal)
Goal.belongsTo(User)

Goal.hasMany(Bookmark)
Bookmark.belongsTo(Goal)

Bookmark.belongsTo(Category)
Category.hasMany(Bookmark)

User.belongsToMany(Bookmark, {through: UserBookmark})
Bookmark.belongsToMany(User, {through: UserBookmark})

User.belongsToMany(Blocked, {through: UserBlocked})
Blocked.belongsToMany(User, {through: UserBlocked})

//magic methods:
// console.log("USER'S MAGIC: ", Object.keys(User.prototype))
// console.log("GOAL'S MAGIC: ", Object.keys(Goal.prototype))
// console.log("BOOKMARK'S MAGIC: ", Object.keys(Bookmark.prototype))
// console.log("CATEGORY'S MAGIC: ", Object.keys(Category.prototype))
// console.log("BLOCKED'S MAGIC: ", Object.keys(Blocked.prototype))
// console.log("USERBOOKMARK'S MAGIC: ", Object.keys(UserBookmark.prototype))
// console.log("USERBLOCKED'S MAGIC: ", Object.keys(UserBlocked.prototype))

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Blocked,
  Goal,
  Bookmark,
  UserBlocked,
  UserBookmark,
  Category
}
