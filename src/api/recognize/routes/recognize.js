'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/recognize',
      handler: 'recognize.recognize',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
