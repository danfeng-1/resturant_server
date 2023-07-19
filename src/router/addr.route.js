// 一. 导入koa-router包
const Router = require('koa-router')

// 二. 实例化对象
const router = new Router({ prefix: '/address' })

// 中间件/控制器
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { isIn } = require('../middleware/addr.middleware')

const { create, findAll, update, remove, setDefault } = require('../controller/addr.controller')

// 三. 编写路由规则
// 3.1 添加接口: 登录, 格式, isIn(电话和地址如果同时存在则失败，否则成功)
router.post(
    '/addAddr',
    auth,
    validator({
      consignee: 'string',
      phone: { type: 'string', format: /^1\d{10}$/ },
      address: 'string',
    }),
    isIn,
    create
  )

// 3.2 获取地址列表
router.get('/', auth, findAll)

// 3.3 更新地址PUT, 参数就都要带上, 查看是否数据库中有，有就修改失败，只能删除
router.put(
  '/update/:id',
  auth,
  validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: 'string',
  }),
  isIn,
  update
)

// 3.4 删除地址
router.delete('/delete/:id', auth, remove)


// 3.5 设置默认
router.patch('/setDefault/:id', auth, setDefault)

module.exports = router