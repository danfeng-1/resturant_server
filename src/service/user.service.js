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
        console.log(res)
        return res
    }
    async getUserInfo({ id, username, password, isadmin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        isadmin && Object.assign(whereOpt, { isadmin })
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null 

    }
}

module.exports = new UserService()