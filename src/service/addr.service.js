const Address = require('../model/addr.model')

class AddrService {
    async isInSql(consignee,phone, address) {
        const res = await Address.findOne({
            where: {
                consignee,
                phone,
                address
            },
        })
        return res
      
    }

    async createAddr(addr) {
        // 在原id上+1
        const maxId = await Address.max('id');
        return await Address.create({id: maxId+1, ...addr})
    }

    async findAllAddr(user_id) {
        return await Address.findAll({
          attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
          where: { user_id },
        })
    }

    async updateAddr(id, addr) {
        return await Address.update(addr, { where: { id } })
    }

    async removeAddr(id) {
        return await Address.destroy({ where: { id } })
    }

    async setDefaultAddr(user_id, id) {
        // 排他思想，先把所有全部为0
        await Address.update(
          { is_default: false },
          {
            where: {
              user_id,
            },
          }
        )
        // 这个id地址设置为默认地址1
        return await Address.update(
          { is_default: true },
          {
            where: {
              id,
            },
          }
        )
      }
    


}

module.exports = new AddrService()