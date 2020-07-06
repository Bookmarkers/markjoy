const Sequelize = require('sequelize')
const db = require('../db')

const UserBlocked = db.define('userBlocked', {})

module.exports = UserBlocked
