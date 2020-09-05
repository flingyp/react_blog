"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/default/index", controller.default.home.test);
  router.get("/default/getArticleList", controller.default.home.getArticleList);
  router.get(
    "/default/getArticleById/:id",
    controller.default.home.getArticleById
  );
  router.get("/default/getTypeInfo", controller.default.home.getTypeInfo);
  router.get("/default/getListById/:id", controller.default.home.getListById);
  router.post("/default/addViewsById/:id", controller.default.home.addViews);
  router.get(
    "/default/goodArticleList",
    controller.default.home.goodArticleList
  );
};
