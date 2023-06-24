const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken } = require('../constant/err.type')

const auth = async (ctx, next) => {
    // 用户授权：服务器拿到请求头里面携带的token
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    // console.log('token',token)
    try {
        // user中包含了payload的信息(id, user_name, is_admin)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
      } catch (err) { 
        switch (err.name) { // jwt返回的错误名统一处理再返回给客户端
          case 'TokenExpiredError':
            console.error('token已过期', err)
            return ctx.app.emit('error', tokenExpiredError, ctx)
          case 'JsonWebTokenError':
            console.error('无效的token', err)
            return ctx.app.emit('error', invalidToken, ctx)
        }
      }
    
      await next()

}

module.exports = {
    auth
}