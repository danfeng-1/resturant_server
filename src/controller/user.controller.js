const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')

class UserController {
    async register(ctx, next) {
        // 1. 获取数据(已经经过中间件处理后的无差错数据)
        console.log(ctx.request.body)

        const { username, password } = ctx.request.body

        // 2. 操作数据库
        try {
            const res = await createUser(username, password)
            console.log('res', res)

            // 3. 返回结果
            ctx.body = {
                code: 200,
                message: "用户注册成功",
                result: {
                    id: res.id,
                    username: res.username
                }
            }
        } catch (error) {
            console.error(error)
            ctx.body.emit('error', userRegisterError, ctx)
        }
        
    }
    
    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController() // 这样引入的时候解构需要的方法即可
