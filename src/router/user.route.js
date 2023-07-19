const Router = require('koa-router')

// 中间件
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

// 引入处理的函数接口控制器
const { register,login, changePassword } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' }) // 设定前缀


// GET  拼接上面的路径和这个路径：/users/
// router.get('/', (ctx, next) => {
//     ctx.body = 'hello user'
// })


// 注册接口, 业务是由controller进行封装的, 使用到了多个中间件（关于登录注册判断用户的
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口,非空、验证用户是否存在(含验证密码是否相同），最后再登陆
router.post('/login', userValidator,verifyLogin, login)

// 修改密码接口, 对用户权限进行判断， 然后加密，修改密码
router.patch('/updatePassword', auth, cryptPassword, changePassword
    // (ctx, next) => {
    // console.log(ctx.state.user) // 可以看到修改密码的用户是谁
    // ctx.body = '修改密码成功'
    // }
)
module.exports = router
