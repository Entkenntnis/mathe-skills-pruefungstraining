const { Sequelize, DataTypes, Op } = require('sequelize')

module.exports = (App, db) => {
  App.db = new Sequelize(db)
  App.db.Op = Op
}
