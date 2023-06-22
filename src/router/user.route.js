const Router = require('koa-router')

// 引入处理的函数接口
const { register,login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' }) // 设定前缀


// GET  拼接上面的路径和这个路径：/users/
// router.get('/', (ctx, next) => {
//     ctx.body = 'hello user'
// })

// 注册接口, 业务是由controller进行封装的
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
