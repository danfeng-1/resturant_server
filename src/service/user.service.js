// model 层主要是做数据库处理

const User = require('../model/user.model')

class UserService {
    async createUser(username, password) {
        // todo:写入数据库，create方法包含insert操作数据库,返回的是一个Promise对象
        const res = await User.create({
            // 表的字段  传递的值
            username: username,
            password: password
        })
        return res
    }
    async getUserInfo({ id, username, password, isadmin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        isadmin && Object.assign(whereOpt, { isadmin })
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'isadmin'], // 查询到有该用户时返回的信息有id
            where: whereOpt
        })
        return res ? res.dataValues : null 

    }
    async updateById({ id, username, password, isadmin }) {
        const whereOpt = { id }
        const newUser = {}
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        isadmin && Object.assign(newUser, { isadmin })
        const res = await User.update(newUser, { where: whereOpt }) // res 是 [0]未修改 [1]则修改了
        return res[0] > 0 ? true: false
    }
}

module.exports = new UserService()