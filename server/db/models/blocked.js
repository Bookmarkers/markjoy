const Sequelize = require('sequelize')
const db = require('../db')

const Blocked = db.define('blocked', {
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Blocked
