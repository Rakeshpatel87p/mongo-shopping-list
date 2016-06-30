require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var itemRoutes = require('./routes/item');
var app = express();

// New stuff for npm registry
'use strict'; 
var Registry = require('npm-registry');
var npm = new Registry({ options });

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', itemRoutes);
app.use('*', function(req, res){
	res.status(404).json({message: 'Not Found'});
});

app.listen(8080, function(){
	console.log('Listening on port 8080');
});

// Makes it available across the environ?
exports.app = app;