const { goodsFormatError, GoodsAlreadyExisted } = require('../constant/err.type')
const { getGoods } = require('../service/goods.service')

const validator = async (ctx, next) => {

  if(ctx.request.body.cate_id === 1) { // 说明是drink
    try {
      ctx.verifyParams({
        name: { type: 'string', required: true },
        price: { type: 'number', required: true },
        is_cold: { type: 'number', required: false },
        sweety: { type: 'number', required: false},
        saled: { type: 'number', required: false},
        weight: { type: 'number', required: true },
        cate_id: { type: 'number', required: true },
        characteristic: { type: 'string', required: false},
        describe: { type: 'string', required: false},
        spicy: { type: 'number', required: false}, // 0 3 5 7
        materials: { type: 'string', required: false}, 
        satisfaction: { type: 'number', required: false},
        recommend: { type: 'number', required: false},
        imgUrl: { type: 'string', required: false},
      })
    } catch (err) {
      console.error(err)
      goodsFormatError.result = err
      return ctx.app.emit('error', goodsFormatError, ctx)
    }
  } else {
    try {
      ctx.verifyParams({
        name: { type: 'string', required: true },
        price: { type: 'number', required: true },
        saled: { type: 'number', required: false},
        weight: { type: 'number', required: true },
        cate_id: { type: 'number', required: true },
        characteristic: { type: 'string', required: false},
        describe: { type: 'string', required: false},
        spicy: { type: 'number', required: false}, // 0 3 5 7
        materials: { type: 'string', required: false}, 
        satisfaction: { type: 'number', required: false},
        recommend: { type: 'number', required: false},
        imgUrl: { type: 'string', required: false},
      })
    } catch (err) {
      console.error(err)
      goodsFormatError.result = err
      return ctx.app.emit('error', goodsFormatError, ctx)
    }
  }
  await next()
}

// 检查数据库中是否含有该食物
const verifyGoods = async(ctx, next) => {

  // 和 合理性 检查  数据库中是否含有此条数据
  const { name } = ctx.request.body

  try {
      const res = await getGoods({ name })
      if(res) { // 不为空已经存在
          console.error('该商品已经存在', {name})
          ctx.app.emit('error', GoodsAlreadyExisted, ctx) // 在出错的地方使用ctx.app.emit提交错误
          return
      }

  } catch (error) { // 其他任何用户错误
      console.error('获取商品信息错误', error)
      ctx.app.emit('error', userRegisterError, ctx)
      return
  }

  await next()
}

module.exports = {
  validator,
  verifyGoods,
  }
