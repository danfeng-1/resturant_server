const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Goods = seq.define(
  'hotfood',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: '商品名称',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '商品价格',
    },
    saled: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '商品已售',
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 200,
      comment: '商品克重',
    },
    cate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '商品类别',
    },
    characteristic: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '商品特点',
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '商品描述',
    },
    spicy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
      comment: '商品辣度',
    }, // 0 3 5 7
    materials: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '主要食材',
    }, 
    satisfaction: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: true,
      defaultValue: 100.00,
      comment: '满意度',
    }, 
    recommend: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '是否主推,默认不主推',
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '09e795b9b760aecc661d3bd01.jpg',
      comment: '商品图片url',
    }, 
  },
  {
    paranoid: true,
  }
)

// Goods.sync({ force: true })

module.exports = Goods
