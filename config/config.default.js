'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1500019401789_9482';

  // add your config here
  config.middleware = [ 'errorHandler' ];
  return config;
};

// config/config.default.js
// 如果10086被占用，你可以通过这个配置指定其他的端口号
exports.proxyworker = {
  port: 10086,
};
