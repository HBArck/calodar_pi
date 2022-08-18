const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
// const errorsHandler = require('./helper/errors/errors-handler')

const app = express()
app.disable('x-powered-by')

app.use(logger('[:date[clf]] :remote-user :method :status  :response-time ms :url :res[content-length]'))
app.use(cors());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

/**
 * Log all to one place
 */
app.use(function (req, res, next) {
  next();
})
// app.use(errorsHandler);

module.exports = app
