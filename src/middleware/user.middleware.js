const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userRegisterError } = require('../constant/err.type')


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
            ctx.app.emit('error', userAlreadyExisted, ctx) // 在出错的地方使用ctx.app.emit提交错误
            return
        }
  
    } catch (error) { // 其他任何用户错误
        console.error('获取用户信息错误', error)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser
}