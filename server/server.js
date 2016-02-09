var DB = require('../db/db')

var Path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();


// Serve a browserified file for GET /scripts/app-bundle.js
app.get('/scripts/app-bundle.js',
  browserify('./client/main.js'));


// Non-js static files
app.use(express.static('client/public'));

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
