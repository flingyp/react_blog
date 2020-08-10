'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/test', controller.admin.main.test);
  router.post('/admin/login', controller.admin.main.login);
};
