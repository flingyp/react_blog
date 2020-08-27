'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() { // 测试接口
    const {
      ctx
    } = this;
    let result = await this.app.mysql.select("test")
    ctx.body = {
      data: result
    }
  }

  async getArticleList() { //获取首页文章接口
    const {
      ctx
    } = this;
    let page = ctx.query.page // 首页页数
    let limit = ctx.query.limit // 文字条数
    let sql = `
      SELECT 
        article.id as id,
        article.title as title,
        article.introduce as introduce,
        article.addTime as addTime,
        article.view_count as view_count,
        type.typeName as typeName
        FROM article LEFT JOIN type ON article.type_id = type.Id
        LIMIT ${(page - 1)*limit}, ${limit}
    `
    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }

  async getArticleById() { // 获取文章接口 通过  acticle.id值
    const {
      ctx
    } = this;
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "article.addTime as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }

  async getTypeInfo() { // 获取类别名称 和 类别编号
    const {
      ctx
    } = this
    const result = await this.app.mysql.select('type')
    ctx.body = {
      data: result
    }
  }

  async getListById() { //根据类别ID获得文章列表
    const {
      ctx
    } = this
    let id = ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "article.addTime as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id

    const result = await this.app.mysql.query(sql)

    ctx.body = {
      data: result
    }
  }

  async addViews() { // 增加文章浏览数量
    const {
      ctx
    } = this;
    let id = ctx.params.id // 博客文章 ID值
    let view_count = ctx.request.body.view_count // 获取博客当前文章浏览量
    let new_view_count = parseInt(view_count) + 1 // 点击博客后 文章浏览量 + 1
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
      id,
      view_count: new_view_count
    };
    const result = await this.app.mysql.update('article', row); // 更新 posts 表中的记录
    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;
    if (updateSuccess) {
      ctx.body = {
        message: '文章浏览量更新成功'
      }
    } else {
      ctx.body = {
        message: '文章浏览量更新失败'
      }
    }
  }
}

module.exports = HomeController;