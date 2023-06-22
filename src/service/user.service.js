// model 层主要是做数据库处理
class UserService {
    async createUser(username, password) {
        // todo:写入数据库
        return '写入成功'
    }
}

module.exports = new UserService()