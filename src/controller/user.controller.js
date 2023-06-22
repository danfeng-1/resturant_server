const { createUser } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)

        const { username, password } = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(username, password)
        console.log('res', res)

        // 3. 返回结果
        ctx.body = ctx.request.body
    }
    
    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController() // 这样引入的时候解构需要的方法即可
