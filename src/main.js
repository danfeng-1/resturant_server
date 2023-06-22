
const Koa = require('koa')

const { APP_PORT } = require('./config/config.default.js')

const app = new Koa()

// 中间件
app.use((ctx, next) => {
    ctx.body = 'hello world'
})

// const APP_PORT = 3000

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
