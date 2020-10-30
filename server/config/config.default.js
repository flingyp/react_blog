/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: 'root',
      database: 'myblog',
    },
    app: true,
    agent: false
  }

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
  }

  config.cors = {
    // 忽略 origin 字段， 可以在 domainWhiteList 配置多个跨域网址
    // origin: 'http://127.0.0.1:3001', 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true // 允许cookie跨域
  }

  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595942251954_2496';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 开启 file 模式
  exports.multipart = {
    mode: 'file',
  }

  return {
    ...config,
    ...userConfig,
  };
};


