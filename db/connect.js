var mongoose = require('mongoose');
// Giving map to Mongoose?
var env = require('../environment');
// What does this connect to?
var config = require('./config');

mongoose.connect(config[env].url);