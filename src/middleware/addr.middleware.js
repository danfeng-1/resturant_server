const { isInSql } = require('../service/addr.service')
const { addrAlreadyExist, queryAddrError } = require('../constant/err.type')

const isIn = async(ctx, next) => {
    const consignee = ctx.request.body.consignee // 请求时候携带的
    const phone = ctx.request.body.phone
    const address = ctx.request.body.address
    try {
      const res = await isInSql(consignee, phone, address)
      if(res) {
        console.error('收货地址已存在')
        return ctx.app.emit('error', addrAlreadyExist, ctx)
      }
    } catch (error) {
      console.error('请求地址失败', error)
      return ctx.app.emit('error', queryAddrError, ctx)
    }
    await next()
  }

  module.exports = {
      isIn
  }