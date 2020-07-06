const Sequelize = require('sequelize')
const db = require('../db')

const UserBookmark = db.define('userBookmark', {
  note: {
    type: Sequelize.TEXT
  },
  favorite: {
    type: Sequelize.BOOLEAN
  },
  archived: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = UserBookmark
