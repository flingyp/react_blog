'use strict'

const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')

class MainController extends Controller {
    async test() {
        const {ctx} = this;
        ctx.body="test egg.js"
    }

    async login() { // 登录接口
        const {ctx} = this;
        let { username, password } = ctx.request.body;
        const result = await this.app.mysql.get('blogsystem_user', {username: username, password: password})
        if(result !== null) {
            // 用户验证成功，进行 session缓存
            // let openId = new Date().getTime()
            // 生成token
            const token = jwt.sign(
                {username: result.username, id: result.Id},
                'secret',
                {expiresIn: '1h'}
            )
            console.log(token)
            ctx.session.openId = token
            ctx.body = {
                message: '登录成功',
                openId: token
            }
        }else {
            ctx.body = {
                message: '登录失败'
            }
        }
    }

    async getTypeInfo() {  // 获取分类信息接口
        const {ctx} = this
        const resType = await this.app.mysql.select('type')
        ctx.body = {
            data: resType
        }
    }
}



module.exports = MainController

