const Sequelize = require('sequelize')
const db = require('../db')

const Blocked = db.define('blocked', {
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Blocked
