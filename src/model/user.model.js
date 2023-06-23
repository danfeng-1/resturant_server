const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model koa_user -> 表 koa_users)
const User = seq.define('user', {
  // id 会被sequelize自动创建, 管理
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '电话号码',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '邮箱',
  },
  // 默认创建时间戳且非空，
  // 我把创建的设置为非空，修改的设置为可为空 CURRENT_TIMESTAMP
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User