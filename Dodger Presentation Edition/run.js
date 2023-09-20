var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();
var highscore = 0;
var scores = [];


app.listen(3000);
console.log('now listening to 3000');

app.use('/', express.static('src'));

app.get('/', function(req, res){
  console.log(req.url);
  var scorelist = "";
  var trycount;
  for(var e = 0; e < scores.length; e++){
      trycount = (e - scores.length)*-1;
      scorelist += '<p class="list-item"><span class="list-item-left">Try #' + trycount + '</span><span class="list-item-right">' + scores[e] + '</span></p>';
  }
  fs.readFile(__dirname + '/src/dodger.html', function(err, data){
    var html = data.toString();
    html = html.replace('[list]', scorelist);
    html = html.replace('[highscore]', highscore);
    res.send(html);
  });
  //res.sendFile(__dirname + '/src/dodger.html');
});

app.get('/setcounter/:count', function(req, res){
  var count = parseInt(req.params.count);
  scores.unshift(count);
  console.log('New Score: ' + count);
  res.sendStatus(200);
  if(count > highscore){
    highscore = count;
    console.log('New Highscore! ' + highscore);
  }

});
