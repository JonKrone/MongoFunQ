var Db   = require('../db/db')
var Util = require('./server_utils')

var Char = require('../models/character')

var browserify = require('browserify-middleware');

var express = require('express');
var app = express();


let characters = [];


// Serve a browserified file for GET /scripts/app-bundle.js
app.get('/scripts/app-bundle.js',
  browserify('./client/main.js'));


// Non-js static files
app.use(express.static('client'));


app.get('/update', function(request, response) { })


// setInterval(fetchCharacters, 1000)
// function fetchCharacters() {
//   Chars.all().then(function(chars) {
//     characters = chars
//   })
// }


var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
