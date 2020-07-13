const Sequelize = require('sequelize')
const db = require('../db')

const Blocked = db.define('blocked', {
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      notContains: ['localhost:8080', 'markjoy.herokuapp.com']
    }
  }
})

module.exports = Blocked
