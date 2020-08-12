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

    async addArticle() { // 添加文章接口
        const {ctx, app} = this
        let addArticleProps = ctx.request.body
        const result = await app.mysql.insert('article', addArticleProps)
        const insertSuccess = result.affectedRows === 1  // 如果affectedRows 等于1就代表插入成功  返回 true
        const insertId = result.insertId   // 新文章添加成功 返回改文章的 ID值 对应数据库中的 ID
        ctx.body = {
            isSuccess : insertSuccess,
            arrticleId: insertId
        }
    }

    async updateArticle() { // 更新文章接口
        const {ctx, app} = this
        let addArticleProps = ctx.request.body
        const result = await app.mysql.update('article', addArticleProps)
        const updateSuccess = result.affectedRows === 1  // 如果affectedRows 等于1就代表更新成功  返回 true
        ctx.body = {
            isSuccess: updateSuccess
        }
    }
}



module.exports = MainController

