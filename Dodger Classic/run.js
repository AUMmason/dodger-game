var http = require('http');
var express = require('express');

var app = express();

app.listen(3000);
console.log('now listening to 3000');

app.use('/', express.static('src'));

app.get('/', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + '/src/dodger.html');
});
