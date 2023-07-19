const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Category = seq.define(
  'category',
  {
    cate_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: '类别名称',
    },
    saled: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '该类总售',
    }, 
    satisfaction: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 100.00,
      comment: '满意度',
    }, 
  },
  {
    paranoid: true,
  }
)

// Drinks.sync({ force: true })

module.exports = Category
