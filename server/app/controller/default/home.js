'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() { // 测试接口
    const { ctx } = this;
    let result = await this.app.mysql.select("test")
    ctx.body = {
      data: result
    }
  }

  async getArticleList() { //获取首页文章接口
    const { ctx } = this;
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    '.type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }

  async getArticleById() { // 获取文章接口 通过  acticle.id值
    const {ctx} = this;
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }

  async getTypeInfo() {  // 获取类别名称 和 类别编号
    const {ctx} = this
    const result = await this.app.mysql.select('type')
    ctx.body = {
      data: result
    }
  }

  async getListById() { //根据类别ID获得文章列表
    const {ctx} = this
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id

    const result = await this.app.mysql.query(sql)

    ctx.body = {
      data: result
    }
  }
}

module.exports = HomeController;
