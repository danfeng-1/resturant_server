
const Goods = require('../model/goods.model')
const Drinks = require('../model/drinks.model')
const Category = require('../model/category.model')
class GoodsService {
  async createGoods(goods) {
    let res

    if(goods.cate_id !== 1) { // 非饮品类
      res = await Goods.create(goods)
    } else {
      res = await Drinks.create(goods)
    }
    
    return res.dataValues
  }

  // 查询有无该商品（包含食物和饮品）
  async getGoods({ name, price, weight }) {
    const whereOpt = {}
    name && Object.assign(whereOpt, { name })
    price && Object.assign(whereOpt, { price })
    weight && Object.assign(whereOpt, { weight })
    console.log('whereOpt',whereOpt)
    const res1 = await Goods.findOne({
        attributes: ['name','price', 'weight'],
        where: whereOpt
    })
    const res2 = await Drinks.findOne({
      attributes: ['name','price', 'weight'],
      where: whereOpt
    })

    if(res1) {
      return res1.dataValues
    } else if(res2) {
      return res2.dataValues
    } else {
      return null
    }
    
  }

  async updateGoods(id, goods) {
    if(goods.cate_id === 1) { // 饮品
      const res1 = await Drinks.update(goods, { where: { id } }) // 把id的数据重新成goods
      return res1[0] > 0 ? true : false
    } else {
      const res2 = await Goods.update(goods, { where: { id } }) // 把id的数据重新成goods
      return res2[0] > 0 ? true : false
    } 
    
  }

  // 软删除商品，实际上是deleteAt的值非空
  async removeGoods(cate_id, id) {
    if(cate_id === '1') {
      const res1 = await Drinks.destroy({ where: { id } })
      return res1 > 0 ? true : false
    } else {
      const res2 = await Goods.destroy({ where: { id } })
      return res2 > 0 ? true : false
    }
    
  }
  // 恢复商品，实际上是deleteAt的值空
  async restoreGoods(cate_id, id) {
    if(cate_id === '1') {
      const res1 = await Drinks.restore({ where: { id } })
      return res1 > 0 ? true : false
    } else {
      const res2 = await Goods.restore({ where: { id } })
      return res2 > 0 ? true : false
    }
  }

  // 查询所有的食物（不分类别，不含饮品）
  async findGoods(pageNum, pageSize) {
    // // 1. 获取总数
    // const count = await Goods.count()
    // // console.log(count)
    // // 2. 获取分页的具体数据
    // const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({ offset: offset, limit: pageSize * 1 })

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({ // findAndCountAll是sequelize内置内置
      offset: offset,
      limit: pageSize * 1,
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }

  // 根据传的类别查询食物（包含food和drink双表查询)
  async searchGoods(id, pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const hotfoodResult = await Goods.findAndCountAll({
      where: {
        cate_id: id * 1,
      },
      offset: offset,
      limit: pageSize * 1,
    });

    const drinksResult = await Drinks.findAndCountAll({
      where: {
        cate_id: id * 1,
      },
      offset: offset,
      limit: pageSize * 1,
    });

    if(drinksResult.count <= 0) {
      return {
        pageNum,
        pageSize,
        total: hotfoodResult.count,
        list: hotfoodResult.rows,
      }
    } else {
      return {
        pageNum,
        pageSize,
        total: drinksResult.count,
        list: drinksResult.rows,
      }
    }
  
  }

  async getAllCategory(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Category.findAndCountAll({ // findAndCountAll是sequelize内置内置
      offset: offset,
      limit: pageSize * 1,
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
  // 添加类别
  async createCate(cate) {
    res = await Category.create(cate)
    console.log('res--------category', res)
    return res.dataValues
  }
  
}

module.exports = new GoodsService()
