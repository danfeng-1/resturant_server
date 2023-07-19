
const { APP_PORT,SERVER_IP } = require('./config/config.default.js')

// 引入路由,但是这样导致多个路由，页面代码繁琐
// 所以拆分路由页面，各个页面分别创建路由对象,并导入进来
// 为了避免框架所带来的耦合性 把koa的使用封装在了app的index中
const app = require('./app')


// const APP_PORT = 3000
app.listen(APP_PORT, () => {
  console.log(`server is running on http://${SERVER_IP}:${APP_PORT}`)
})
