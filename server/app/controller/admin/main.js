'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
    async test() {
        const {ctx} = this;
        ctx.body="test egg.js"
    }

    async login() {
        const {ctx} = this;
        let { username, password } = ctx.request.body;
        const result = await this.app.mysql.get('blogsystem_user', {username: username, password: password})
        if(result !== null) {
            // 用户验证成功，进行 session缓存
            let openId = new Date().getTime()
            ctx.session.openId = openId
            ctx.body = {
                message: '登录成功',
                session: openId
            }
        }else {
            ctx.body = {
                message: '登录失败'
            }
        }
    }
}



module.exports = MainController

