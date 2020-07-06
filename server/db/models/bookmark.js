const Sequelize = require('sequelize')
const db = require('../db')

// shouldn't title be allowed to be empty string?
// shouldn't url actually be the only one that's required?
// defaultValue for imageUrl?

const Bookmark = db.define('bookmark', {
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '../../public/defaultImage.png'
  }
})

module.exports = Bookmark
