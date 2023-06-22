// 减少代码耦合性，假设这里用的koa框架改成express就只需要改这个文件

const Koa = require('koa')

const userRouter = require('../router/user.route') // 注册路由

const app = new Koa()

// 注册中间件
app.use(userRouter.routes())

module.exports = app