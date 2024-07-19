const { Sequelize, DataTypes, Op } = require('sequelize')

module.exports = (App, db) => {
  App.db = new Sequelize(db)
  App.db.Op = Op

  App.db.User = App.db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  App.db.Session = App.db.define('Session', {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  App.db.Data = App.db.define('Data', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: DataTypes.STRING(20000),
      allowNull: false,
    },
  })
}
