const Sequelize = require('sequelize')
const db = require('../db')

// defaultValue for active?
// yes
// maybe shouldn't be called Goal.goal
const Goal = db.define('goal', {
  goal: {
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
