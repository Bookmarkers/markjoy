const Sequelize = require('sequelize')
const db = require('../db')

const Goal = db.define('goal', {
  detail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Goal
