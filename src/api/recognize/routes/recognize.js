'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/recognize',
      handler: 'recognize.recognize',
      config: {
        auth: false, // set to true if you want auth
      },
    },
  ],
};
