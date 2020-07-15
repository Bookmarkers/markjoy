const Sequelize = require('sequelize')
const db = require('../db')

const Bookmark = db.define('bookmark', {
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  url: {
    type: Sequelize.TEXT,
    // unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/default.png'
  },
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
  // ,
  // dateAdded: {
  //   type: Sequelize.DATE,
  //   defaultValue: date.now()
  // }
})

module.exports = Bookmark
