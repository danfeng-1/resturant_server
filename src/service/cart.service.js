const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')
const Drinks = require('../model/drinks.model');

class CartService {
  async createOrUpdate(user_id, goods_id,cate_id, add_number) {
    // 购物车的id可以获取最后一个然后自增，因为购物车的id和其他表无关联，同样的还有地址id
    const maxId = await Cart.max('id');

    // 根据user_id和cate_id, goods_id同时查找, 有没有记录
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          cate_id,
          goods_id,
        },
      },
    })
    if (res) {
      // 已经存在一条记录, 默认将number + 1
      await res.increment('number', { by: add_number })
      return await res.reload()
    } else {

      return await Cart.create({
        id: maxId + 1,
        user_id,
        goods_id,
        cate_id,
      })
    }
  }

  async isInSql(goods_id, cate_id) {
    let res
    if(cate_id === '1') {
        res = await Drinks.findOne({
            where: {
                id: goods_id
            },
          })
    } else {
        res = await Goods.findOne({
            where: {
                cate_id,
                id: goods_id
            },
        })
    }
    return res
  
  }

  async findCarts(user_id, pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res1 = await Cart.findAndCountAll({
      where: {
        user_id,
        cate_id: {
          [Op.not]: 1
        }
      },
      attributes: ['id', 'goods_id','cate_id', 'number', 'selected'],
      offset: offset,
      limit: pageSize * 1,
      include: [
        {
          model: Goods,
          as: 'goods_info',
          attributes: ['id', 'name', 'price','cate_id', 'imgUrl'],
        },
      ]
    })

    const res2 = await Cart.findAndCountAll({
      where: {
        user_id,
        cate_id: 1
      },
      attributes: ['id', 'goods_id','cate_id', 'number', 'selected'],
      offset: offset,
      limit: pageSize * 1,
      include: [
        {
          model: Drinks,
          as: 'drinks_info', // 不同别名
          attributes: ['id', 'name', 'price','cate_id', 'imgUrl'],
        },
      ]
    })
   
    // console.log('res1',res1)
    // console.log('777777777777777777777777777777777777777777777777')
    // console.log('res2',res2)

    let count = res1.count + res2.count
    let rows = [...res1.rows, ...res2.rows]

    // 这段是错误写法。。。。
    // const { count, rows } = await Cart.findAndCountAll({
    //   where: {
    //     user_id
    //   },
    //   attributes: ['id', 'goods_id', 'cate_id','number', 'selected'],
    //   offset: offset,
    //   limit: pageSize * 1,
    //   include: [
    //     {
    //     model: Drinks,
    //     as: 'drinks_info',
    //     attributes: ['id', 'name','cate_id', 'price', 'imgUrl'],
    //     where: {
    //       cate_id: 1
    //     },
    //   },
    //   {
    //     model: Goods,
    //     as: 'goods_info',
    //     attributes: ['id', 'name', 'cate_id','price', 'imgUrl'],
    //     where: {
    //       cate_id: {
    //         [Op.not]: 1
    //       }
    //     },
    //   }
    // ]
    // })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }


  async updateCarts({ user_id, id, number, selected }) {
    // const res = await Cart.findByPk(id) // 仅仅根据购物车的商品id
    const res = await Cart.findOne({  // 实际上还需要user_id
      where: {
        id,
        user_id
      }
    });
    if (!res) return ''
    number !== undefined ? (res.number = number) : ''
    selected !== undefined ? (res.selected = selected) : ''
    return await res.save()
  }

  async removeCarts(user_id, ids) {
    return await Cart.destroy({
      where: {
        user_id,
        id: {
          [Op.in]: ids,
        },
      },
    })
  }

  async selectAllOrNotCarts(selected, user_id) {
    return await Cart.update(
      { selected: selected }, // 把所有的selcted改为传入的值
      {
        where: {
          user_id,
        },
      }
    )
  }
}

module.exports = new CartService()
