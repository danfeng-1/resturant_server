const path = require('path')
// 减少代码耦合性，假设这里用的koa框架改成express就只需要改这个文件

const Koa = require('koa')

const { koaBody } = require('koa-body') // 还是得看npm
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

// const userRouter = require('../router/user.route') // 注册路由
// const goodsRouter = require('../router/goods.route')
const router = require('../router/index')

// 统一的差错处理
const errHandler = require('./errHandler')

const app = new Koa()

app.use(parameter(app))
// 在所有路由中间件注册之前注册,就会绑定ctx.request.body到
// koaBody本身支持文件上传
app.use(
    koaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, '../upload/goods'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
// console.log('process.cwd()',process.cwd())
// console.log(path.join(__dirname, '../upload/goods'))

app.use(koaStatic(path.join(__dirname, '../upload/goods'))) // 作为静态资源的路径
// 注册中间件
// app.use(userRouter.routes())
// app.use(goodsRouter.routes())
app.use(router.routes())
app.use(router.allowedMethods()) // 不允许的Http请求

// 在出错的地方使用ctx.app.emit提交错误, 在 app 中通过app.on监听
app.on('error', errHandler) 

module.exports = app