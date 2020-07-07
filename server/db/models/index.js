const User = require('./user')
const Blocked = require('./blocked')
const Goal = require('./goal')
const Bookmark = require('./bookmark')
const UserBlocked = require('./user_blocked')
const UserBookmark = require('./user_bookmark')
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
