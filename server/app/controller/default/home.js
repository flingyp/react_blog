'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() {
    const { ctx } = this;
    let result = await this.app.mysql.select("test")
    ctx.body= {
      data: result
    }
  }
}

module.exports = HomeController;
