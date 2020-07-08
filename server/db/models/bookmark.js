const Sequelize = require('sequelize')
const db = require('../db')

const Bookmark = db.define('bookmark', {
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/default.png'
  }
})

module.exports = Bookmark
