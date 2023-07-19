// 1. 导入koa-router
const Router = require('koa-router')

// 登录中间件
const { auth } = require('../middleware/auth.middleware')
const { validator, isIn } = require('../middleware/cart.middleware')

const { add, findAll, update, remove, selectAllOrNot } = require('../controller/cart.controller')

// 2. 实例化router对象
const router = new Router({ prefix: '/carts' })

// 3.1 添加到购物车接口: 登录, 格式, 请求的合法在数据库中
router.post('/addCart', auth, validator({
    goods_id: { type: 'number', required: true },
    cate_id: { type: 'number', required: true },
}), isIn, add)


// 3.2 获取购物车列表
router.get('/', auth, findAll)

// 3.3 更新购物车
router.patch(
  '/update/:id', // id 是购物车的主键id,所以不需要cate_id去辨别了，并且也很简单的查询数据库中是否含有
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
)

// 3.4 删除购物车
router.delete('/delete', auth, validator({ ids: 'array' }), remove)

// 3.5 全选与全不选
router.post('/selectAllOrNot', auth, 
  validator({ 
    selected: {type: 'bool', required: false}
  }),
  selectAllOrNot
  )


module.exports = router
