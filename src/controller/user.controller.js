class UserController {
    async register(ctx, next) {
        ctx.body = '用户注册成功'
    }
    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController() // 这样引入的时候解构需要的方法即可
