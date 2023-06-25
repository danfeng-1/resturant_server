const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default') // 私钥

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
        const { username } = ctx.request.body
        // ctx.body = `登陆成功，${ username }`

        // 1. 获取用户信息（在token的payload中，记录id,username,isadmin)
        try {
            // 剔除password其余的在resUser对象中
            const { password, ...resUser } = await getUserInfo({ username })

            ctx.body = {
                code: 200,
                message: '用户登陆成功',
                result: {
                    username,
                    token: jwt.sign(resUser, JWT_SECRET, { expiresIn: '2d' }) // 2天过期
                }
            }
        } catch (error) {
            console.error('用户登录失败', error)
            
        }
    }

    async changePassword(ctx, next) {
        // 1. 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // console.log(id, password)
        // 2. 操作数据库
        try {
            const res = await updateById({ id, password }) // 把要传递的id 和要修改的加密了的密码传过去
            if(res) {
                ctx.body = {
                    code: 200,
                    message: '修改密码成功',
                    result: ''
                }
            }
        } catch (error) {
            console.error('修改密码失败', error)
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }
    }

}

module.exports = new UserController() // 这样引入的时候解构需要的方法即可
