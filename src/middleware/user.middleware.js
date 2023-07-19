const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { userFormateError,
     userAlreadyExisted, 
     userRegisterError,
     userDoesNotExist,
     invalidPassword,
     userLoginError} = require('../constant/err.type')


const userValidator = async(ctx, next) => {
    const { username, password } = ctx.request.body
    // 合法性 前端传来的数据是完整的
    if(!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        // ctx.status = 400
        // ctx.body = {
        //     code: '10001',
        //     message: '用户名或密码为空',
        //     result: '',
        // }
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

const verifyUser = async(ctx, next) => {

    // 和 合理性 检查  数据库中是否含有此条数据
    const { username } = ctx.request.body

    // if(await getUserInfo({ username })) {
    //     // ctx.status = 409 // 冲突
    //     // ctx.bosy = {
    //     //     code: '10002',
    //     //     message: '用户已经存在',
    //     //     result: ''
    //     // }
    //     // return 
    //     ctx.app.emit('error', userAlreadyExisted, ctx) // 在出错的地方使用ctx.app.emit提交错误
    //     return
    // }

    try {
        const res = await getUserInfo({ username })
        if(res) { // 不为空已经存在用户
            console.error('用户名已经存在', {username})
            return ctx.app.emit('error', userAlreadyExisted, ctx) // 在出错的地方使用ctx.app.emit提交错误
        }
  
    } catch (error) { // 其他任何用户错误
        console.error('获取用户信息错误', error)
        return ctx.app.emit('error', userRegisterError, ctx)
    }

    await next()
}

const cryptPassword = async(ctx, next) => {
    const { password } = ctx.request.body
    // 对照npm的两句加密语句
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // 替换原密码
    ctx.request.body.password = hash

    await next()    
}

const verifyLogin = async(ctx, next) => {
    // 1. 判断用户是否存在，不存在就报错
    const { username, password } = ctx.request.body

    try {
        const res = await getUserInfo({ username })

        if(!res) { // 用户名不存在
            console.error('用户名不存在', { username })
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
        // 2. 密码是否匹配（不匹配：报错）bcryptjs匹配密码
        if(!bcrypt.compareSync(password, res.password)) {
            return ctx.app.emit('error', invalidPassword, ctx)
        }

    } catch (error) {
        console.error('用户登录失败', error)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
    

}
module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}