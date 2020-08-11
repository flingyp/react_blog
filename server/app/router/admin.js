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
};
