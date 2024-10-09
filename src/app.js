const path = require('path');
const express = require('express');
const cors = require('cors');

const initRoutes = require('./routes');
const { version } = require('../package.json');

const app = express();

// ** Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res, _next) => {
  res.send('Hello world');
});

app.use((_req, res, next) => {
  try {
    res.locals.backpack = {
      errors: [],
    };

    return next();
  } catch (error) {
    return next(error);
  }
});

app.use((req, res, next) => {
  try {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    });

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      throw new Error('Method not allowed');
    }

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

app.use((_req, res, next) => {
  try {
    /* Express interceptor */
    const oldJson = res.json;
    const response = {
      version,
      token: '',
      message: '',
      data: {},
      errors: [],
    };

    res.json = function (data) {
      let status = 200;

      if (data.message) {
        response.message = data.message;
      }

      if (res.locals.token) {
        response.token = res.locals.token;
      }

      if (data.data) {
        response.data = data.data;
      }

      if (data.errors) {
        response.errors = Array.isArray(data.errors) ? data.errors : [data.errors];
      }

      res.json = oldJson;

      if (status && status !== 200) {
        return res.status(status).json(response);
      }

      if (data.message === 'PM-SAVED') return res.json(data.data);

      return res.json(response);
    };

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// ** Routes
initRoutes(app);

app.use((req, _res, next) => {
  try {
    const NOT_FOUND_REQUEST = {
      name: 'NOT_FOUND_REQUEST',
      url: req.headers.host + req.originalUrl,
      method: req.method,
      ip: req.ip,
    };

    throw new Error(JSON.stringify({ status: 404, json: { message: 'Not found', data: NOT_FOUND_REQUEST } }));
  } catch (error) {
    return next(error);
  }
});

// ** Server internal error handler
app.use((error, _req, res, _next) => {
  try {
    const errorData = JSON.parse(error.message);
    return res.status(errorData.status).json(errorData.json);
  } catch (_err) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
