const { FormatError, cartGoodsError,queryGoodsError } = require('../constant/err.type')

const { isInSql } = require('../service/cart.service')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules) // koa-parameter校验格式的，rules简写了goods_id:'number
    } catch (err) {
      console.error(err)
      FormatError.result = err
      return ctx.app.emit('error', FormatError, ctx)
    }

    await next()
  }
}

const isIn = async(ctx, next) => {
  const goods_id = ctx.request.body.goods_id // 请求时候携带的
  const cate_id = ctx.request.body.cate_id
  try {
    const res = await isInSql(goods_id, cate_id)
    if(!res) {
      console.error('加购商品不存在')
      return ctx.app.emit('error', cartGoodsError, ctx)
      
    }
  } catch (error) {
    console.error('请求商品失败', error)
    return ctx.app.emit('请求商品失败', queryGoodsError, ctx)
  }
  await next()
}


module.exports = {
  validator,
  isIn
}
