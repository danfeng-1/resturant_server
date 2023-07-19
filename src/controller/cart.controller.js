
const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllOrNotCarts } = require('../service/cart.service')
const { updateCartError, cartFormatError } = require('../constant/err.type')
class CartController {
    async add(ctx) {
      // 将商品添加到购物车
      // 1. 解析user_id, goods_id
      const user_id = ctx.state.user.id // 登录jwt时存的
      const goods_id = ctx.request.body.goods_id // 请求时候携带的
      const cate_id = ctx.request.body.cate_id
      const add_number = ctx.request.body.add_number || 1
  
      // 2. 操作数据库
      const res = await createOrUpdate(user_id, goods_id, cate_id, add_number)
      // 3. 返回结果
      ctx.body = {
        code: 200,
        message: '添加到购物车成功',
        result: res,
      }
    }

    async findAll(ctx) {
      
      // 1. 解析请求参数
      const { pageNum = 1, pageSize = 10 } = ctx.request.query
      
      const user_id = ctx.state.user.id
      // 2. 操作数据库
      const res = await findCarts(user_id, pageNum, pageSize)
      // 3. 返回结果
      ctx.body = {
        code: 200,
        message: '获取购物车列表成功',
        result: res,
      }
    }

    async update(ctx) {
      // 1. 解析参数,id是购物车的id
      const { id } = ctx.request.params
      const user_id = ctx.state.user.id
      const { number, selected } = ctx.request.body
      if (number === undefined && selected === undefined) {
        cartFormatError.message = 'number和selected不能同时为空'
        return ctx.app.emit('error', cartFormatError, ctx)
      }
      try {
         // 2. 操作数据库
        const res = await updateCarts({ user_id, id, number, selected })
        
        if(res) {
          // 3. 返回数据
          ctx.body = {
            code: 200,
            message: '更新购物车成功',
            result: res,
          } 
        } else {
          console.error('无效的用户或商品id')
          return ctx.app.emit('error', updateCartError, ctx)
        }
      } catch (error) {
        console.error('更新购物车失败',error)
        return ctx.app.emit('error', updateCartError, ctx)
      }
     
    }

    async remove(ctx) {
      const user_id = ctx.state.user.id
      const { ids } = ctx.request.body
  
      try {
        const res = await removeCarts(user_id, ids)
        ctx.body = {
          code: 200,
          message: '删除购物车成功',
          result: res, // 受影响的条数
        }
      } catch (error) {
        
      }
    }

    async selectAllOrNot(ctx) {
      const user_id = ctx.state.user.id
      const selected = ctx.request.body.selected
  
      const res = await selectAllOrNotCarts(selected, user_id)
  
      ctx.body = {
        code: 200,
        message: selected === true ? '全选成功' : '取消全选成功',
        result: res,
      }
    }



}

module.exports = new CartController()