const { fileUploadError, 
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID} =  require('../constant/err.type')

const { createGoods, 
  updateGoods, 
  removeGoods, 
  restoreGoods, 
  findGoods, 
  searchGoods,
  getAllCategory,
  createCate } = require('../service/goods.service')
const path = require('path')

class GoodsController {
    async uploadImg(ctx, next) {
        
        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg']
        // console.log('file.type',file.mimetype)
        // 这样即便还是上传了才显示的结果，，
        if (file) {
          if (!fileTypes.includes(file.mimetype)) {
            console.error('上传格式出错')
            return ctx.app.emit('error', unSupportedFileType, ctx)
          }
          ctx.body = {
            code: 200,
            message: '商品图片上传成功',
            result: {
              goods_img: path.basename(file.filepath),
            },
          }
        } else {
          return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    async create(ctx) {
      // 直接调用service的createGoods方法
      try {
        // const { createdAt, updatedAt, ...res } = await createGoods(
        const { createdAt, updatedAt, deletedAt, ...res } = await createGoods(
          ctx.request.body
        )
        ctx.body = {
          code: 200,
          message: '添加商品成功',
          result: res,
        }
      } catch (err) {
        console.error(err)
        return ctx.app.emit('error', publishGoodsError, ctx)
      }
    }

    async update(ctx) {
      try {
        const res = await updateGoods(ctx.params.id, ctx.request.body)
  
        if (res) {
          ctx.body = {
            code: 200,
            message: '修改商品成功',
            result: '',
          }
        } else {
          return ctx.app.emit('error', invalidGoodsID, ctx)
        }
      } catch (err) {
        console.error(err)
      }
    }

    // 下架商品
    async remove(ctx) {
      const res = await removeGoods(ctx.params.cate_id, ctx.params.id)
      if (res) {
        ctx.body = {
          code: 200,
          message: '下架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    }
    async restore(ctx) {
      const res = await restoreGoods(ctx.params.cate_id, ctx.params.id)
      if (res) {
        ctx.body = {
          code: 200,
          message: '上架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    }

    async findAll(ctx) {
      // 1. 解析pageNum和pageSize
      const { pageNum = 1, pageSize = 10 } = ctx.request.query
      // 2. 调用数据处理的相关方法
      const res = await findGoods(pageNum, pageSize)
      // 3. 返回结果
      ctx.body = {
        code: 200,
        message: '获取商品列表成功',
        result: res,
      }
    }

    async searchClass(ctx) {
      // 解析id获取类别信息
      // const res = await updateGoods(ctx.params.id, ctx.request.body)
  
      // 1. 解析pageNum和pageSize
      const id = ctx.params.cate_id;
      const pageNum = ctx.query.pageNum || 1;
      const pageSize = ctx.query.pageSize || 10;

      // 2. 调用数据处理的相关方法
      const res = await searchGoods(id, pageNum, pageSize)

      // 3. 返回结果
      ctx.body = {
        code: 200,
        message: '获取该类商品成功',
        result: res,
      }
      
    }

    async getCategory(ctx) {
      // 1. 解析pageNum和pageSize
      const { pageNum = 1, pageSize = 10 } = ctx.request.query
      // 2. 调用数据处理的相关方法
      const res = await getAllCategory(pageNum, pageSize)
      // 3. 返回结果
      ctx.body = {
        code: 200,
        message: '获取商品列表成功',
        result: res,
      }
    }

    async addCate(ctx) {
      try {
        // const { createdAt, updatedAt, ...res } = await createGoods(
        const { createdAt, updatedAt, deletedAt, ...res } = await createCate(
          ctx.request.body
        )
        ctx.body = {
          code: 200,
          message: '添加类别成功',
          result: res,
        }
      } catch (err) {
        console.error(err)
        return ctx.app.emit('error', publishGoodsError, ctx)
      }

    }
    
}

module.exports = new GoodsController()