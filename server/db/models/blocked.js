const Sequelize = require('sequelize')
const db = require('../db')

const Blocked = db.define('blocked', {
  url: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
      notIn: [['localhost:8080', 'markjoy.herokuapp.com']]
    }
  }
})

module.exports = Blocked
