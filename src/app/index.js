// 减少代码耦合性，假设这里用的koa框架改成express就只需要改这个文件

const Koa = require('koa')

const { koaBody } = require('koa-body') // 还是得看npm

const userRouter = require('../router/user.route') // 注册路由

// 统一的差错处理
const errHandler = require('./errHandler')

const app = new Koa()

// 在所有路由中间件注册之前注册,就会绑定ctx.request.body到
app.use(koaBody())

// 注册中间件
app.use(userRouter.routes())
// 在出错的地方使用ctx.app.emit提交错误, 在 app 中通过app.on监听
app.on('error', errHandler) 

module.exports = app