const _ = require('lodash');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const autoIncrement = require('mongoose-auto-increment');

const config = require('../config'); // get our config file
const options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: config.user,
  pass: config.password
};
const connection = mongoose.connect(config.url, options);
autoIncrement.initialize(connection);
let model = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    model = _.extend(model, require(path.join(__dirname, file)));
  });

module.exports = model;
