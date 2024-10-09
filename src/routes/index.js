'use strict';

// ** Utils
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const initRoutes = (app, baseUrl = '/api') => {
  try {
    const files = fs.readdirSync(__dirname);

    // Filter out the files that end with .routes.ts
    const routes = files.filter(file => /\.routes\.(ts|js)$/.test(file));

    // Import and mount each route on the Express app
    routes.forEach(_route => {
      const route = _route.split('.')[0];
      app.use(`${baseUrl}/${route}`, require(path.join(__dirname, `./${_route}`)).default);
    });
  } catch (error) {
    console.log(error);
    logger.error('[EXPRESS-SERVER]: Error loading routes ❌');
  }
};

module.exports = initRoutes;
