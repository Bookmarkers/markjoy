const Sequelize = require('sequelize')
const db = require('../db')

const Blocked = db.define('blocked', {
  url: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Blocked
