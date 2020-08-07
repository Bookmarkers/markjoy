const User = require('./user')
const Blocked = require('./blocked')
const Goal = require('./goal')
const Bookmark = require('./bookmark')
const UserBlocked = require('./user_blocked')
const Category = require('./category')

User.hasMany(Goal)
Goal.belongsTo(User)

Goal.hasMany(Bookmark)
Bookmark.belongsTo(Goal)

Category.hasMany(Bookmark)
Bookmark.belongsTo(Category)

User.hasMany(Bookmark)
Bookmark.belongsTo(User)

User.belongsToMany(Blocked, {through: UserBlocked})
Blocked.belongsToMany(User, {through: UserBlocked})

module.exports = {
  User,
  Blocked,
  Goal,
  Bookmark,
  UserBlocked,
  Category
}
