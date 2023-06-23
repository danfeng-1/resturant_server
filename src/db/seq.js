const { Sequelize } = require('sequelize')

// 通过环境变量导入所需要的参数
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
})

// 数据库连接测试
// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err)
//   })

module.exports = seq
