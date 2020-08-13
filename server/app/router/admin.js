'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  let adminauth = app.middleware.adminauth()
  router.get('/admin/test', controller.admin.main.test);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminauth,controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', controller.admin.main.addArticle);
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth ,controller.admin.main.getArticleList);
};
