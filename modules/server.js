var http = require('http'),
  colors = require('colors'),
  handlers = require('./handlers'),
  express = require('express'),
  app = express(),
  port = 3000;

function start() {
  app.all('/', function(request, response) {
    handlers.welcome(request, response);
  });
  app.all('/upload', function(request, response, next) {
    handlers.upload(request, response, next);
  });
  app.all('/show', function(request, response) {
    handlers.show(request, response);
  });

  app.use(express.static('./templates'));

  var server = app.listen(port, function() {
    console.log('Serwer nasłuchuje na http://localhost:' + port);
  });

  console.log('Uruchomiono serwer na porcie: '.green + port + '!'.green);
}

exports.start = start;
