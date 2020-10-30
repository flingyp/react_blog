"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  let adminauth = app.middleware.adminauth();
  router.get("/admin/test", controller.admin.main.test);
  router.post("/admin/login", controller.admin.main.login);
  router.get(
    "/admin/getTypeInfo",
    adminauth,
    controller.admin.main.getTypeInfo
  );
  router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle);
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.admin.main.getArticleList
  );
  router.get(
    "/admin/delArticle/:id",
    adminauth,
    controller.admin.main.delArticle
  );
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.admin.main.getArticleById
  );
  router.post(
    "/admin/addGoodArticle",
    adminauth,
    controller.admin.main.addGoodArticle
  );
  router.get(
    "/admin/goodArticleList",
    adminauth,
    controller.admin.main.goodArticleList
  );
  router.get(
    "/admin/delGoodArticleById",
    adminauth,
    controller.admin.main.delGoodArticleById
  );

  // 和博客项目是分开的，用于上传图片保存到服务器上的
  router.post(
    "/admin/uploadImg",
    adminauth,
    controller.admin.main.uploadImg
  )
};
