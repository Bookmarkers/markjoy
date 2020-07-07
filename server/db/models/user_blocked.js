const Sequelize = require('sequelize')
const db = require('../db')

const UserBlocked = db.define('user_blocked', {})

module.exports = UserBlocked
