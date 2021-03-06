"use strict";

const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const path = require("path");
const fs = require("mz/fs");

class MainController extends Controller {
  async test() {
    const { ctx } = this;
    ctx.body = "test egg.js";
  }

  async login() {
    // 登录接口
    const { ctx } = this;
    let { username, password } = ctx.request.body;
    const result = await this.app.mysql.get("blogsystem_user", {
      username: username,
      password: password,
    });
    if (result !== null) {
      // 用户验证成功，进行 session缓存
      // let openId = new Date().getTime()
      // 生成token
      const token = jwt.sign(
        { username: result.username, id: result.Id },
        "secret",
        { expiresIn: "1days" }
      );
      ctx.cookies.set("openId", token, {
        httpOnly: false,
        signed: false,
        maxAge: 1000 * 3600 * 2, // cookie有效期为两个小时
      });
      ctx.body = {
        message: "登录成功",
        openId: token,
      };
    } else {
      ctx.body = {
        message: "登录失败",
      };
    }
  }

  async getTypeInfo() {
    // 获取分类信息接口
    const { ctx } = this;
    const resType = await this.app.mysql.select("type");
    ctx.body = {
      data: resType,
    };
  }

  async addArticle() {
    // 添加文章接口
    const { ctx, app } = this;
    let addArticleProps = ctx.request.body;
    const result = await app.mysql.insert("article", addArticleProps);
    const insertSuccess = result.affectedRows === 1; // 如果affectedRows 等于1就代表插入成功  返回 true
    const insertId = result.insertId; // 新文章添加成功 返回改文章的 ID值 对应数据库中的 ID
    ctx.body = {
      isSuccess: insertSuccess,
      arrticleId: insertId,
    };
  }

  async updateArticle() {
    // 更新文章接口
    const { ctx, app } = this;
    let addArticleProps = ctx.request.body;
    const result = await app.mysql.update("article", addArticleProps);
    const updateSuccess = result.affectedRows === 1; // 如果affectedRows 等于1就代表更新成功  返回 true
    ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() {
    // 获取文章列表接口
    const { ctx, app } = this;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.view_count as view_count," +
      "article.addTime as addTime," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id ";

    const resList = await app.mysql.query(sql);
    ctx.body = {
      list: resList,
    };
  }

  async delArticle() {
    // 删除文章
    const { ctx, app } = this;
    let id = ctx.params.id;
    const res = await app.mysql.delete("article", { id: id });
    ctx.body = {
      message: "删除成功",
      data: res,
    };
  }

  async getArticleById() {
    // 根据文章ID获取文章详情
    const { ctx, app } = this;
    let id = ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;
    const result = await app.mysql.query(sql);
    ctx.body = {
      data: result,
    };
  }

  async addGoodArticle() {
    // 添加优秀文章
    const { ctx, app } = this;
    // POST请求参数
    let goodArticleProps = ctx.request.body;
    const result = await app.mysql.insert("wellarticle", goodArticleProps);
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      ctx.body = {
        isSuccess: "成功添加优秀文章",
        articleId: result.insertId,
      };
    } else {
      ctx.body = {
        isErrot: "添加失败",
      };
    }
  }

  async goodArticleList() {
    // 获取所有优秀文章
    const { ctx, app } = this;
    let sql = `SELECT * from wellarticle`;
    const result = await app.mysql.query(sql);
    ctx.body = {
      data: result,
    };
  }

  async delGoodArticleById() {
    // 删除优秀文章
    const { ctx, app } = this;
    let id = ctx.query.id;
    console.log(id);
    const res = await app.mysql.delete("wellarticle", { id: id });
    console.log(res);
    ctx.body = {
      message: "删除成功",
      data: res,
    };
  }

  async uploadImg() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'uploadimg' + path.basename(file.filename);
    // {
    //   field: 'avatar',
    //   filename: '个人照2.png',
    //   encoding: '7bit',
    //   mime: 'image/png',
    //   fieldname: 'avatar',
    //   transferEncoding: '7bit',
    //   mimeType: 'image/png',
    //   filepath: 'C:\\Users\\Administrator\\AppData\\Local\\Temp\\egg-multipart-tmp\\server\\2020\\10\\17\\23\\255471e0-5e04-4837-bb08-d9a35cc0a122.png'
    // } 
    //uploadimg/个人照2.png
    console.log(file, name);
    // let result
    // try {
    //   // 处理文件，比如上传到云端
    //   result = await ctx.oss.put(name, file.filepath);
    //   console.log(result)
      
    // } finally {
    //   // 需要删除临时文件
    //   await fs.unlink(file.filepath);
    // }
    ctx.body = {
      message: "上传成功"
    }
  }
}

module.exports = MainController;
