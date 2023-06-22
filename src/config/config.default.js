const dotenv = require('dotenv') // 获取到 .env的端口管理包

dotenv.config()

// console.log(process.env.APP_PORT) // 8000

module.exports = process.env
// export default {
//     APP_PORT: process.env.APP_PORT
// }
