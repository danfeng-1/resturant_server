const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator, verifyGoods, validatorDrinks } = require('../middleware/goods.middleware')

const { uploadImg, create, update, remove, restore, findAll, searchClass,getCategory, addCate } = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 要上传图片，得登录+管理员
router.post('/upload', auth, hadAdminPermission, uploadImg)

// 发布商品（Food+drink)接口: 登录 + 管理员 + 验证格式正确 + 数据库中有无
router.post('/addGoods', auth, hadAdminPermission, validator, verifyGoods, create)

// 修改商品接口（在已经查询了的基础上进行修改）
router.put('/updateGoods/:id', auth, hadAdminPermission, validator, update)

// 硬删除接口
// router.delete('/:id', auth, hadAdminPermission, remove)

// 对于某个类别的id商品删除
router.post('/:cate_id/:id/off', auth, hadAdminPermission, remove)
router.post('/:cate_id/:id/on', auth, hadAdminPermission, restore)


// 后端根据该分类获取商品信息，get请求通过query获取参数，前面动态直接传参params;post请求是body传参
router.get('/class/:cate_id?', searchClass) // /goods/class/1?pageNum=1&pageSize=2

// 后端获取所有商品列表信息(分页查询)
router.get('/', findAll) // /goods?pageNum=1&pageSize=2

// 发布饮品接口: 登录 + 管理员 + 验证格式正确 + 数据库中有无
// router.post('/addDrinks', auth, hadAdminPermission, validatorDrinks, create)

// 获取分类
router.get('/category',auth, hadAdminPermission, getCategory)

// 添加分类
router.post('/addCategory', auth, hadAdminPermission, addCate)
module.exports = router