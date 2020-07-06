const Sequelize = require('sequelize')
const db = require('../db')

const UserBookmark = db.define('userBookmark', {
  note: {
    type: Sequelize.TEXT
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = UserBookmark
