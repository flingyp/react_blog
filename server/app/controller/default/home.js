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

  async getArticleList() {
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
}

module.exports = HomeController;
