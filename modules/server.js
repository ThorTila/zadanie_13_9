var http = require('http'),
    colors = require('colors'),
    handlers = require('./handlers'),
    express = require('express'),
    app = express(),
    port = 3000;
    
function start() {
    app.all('/', function (request, response) {
        handlers.welcome(request, response);
    });
    app.all('/upload', function (request, response, next) {
        handlers.upload(request, response, next);
    });
    app.all('/show', function (request, response) {
        handlers.show(request, response);
    });

    app.use(express.static('./templates'));

    /* function onRequest(request, response) {
        console.log("Odebrano zapytanie.".green);
        console.log("Zapytanie " + request.url + " odebrane.");

        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

        switch (request.url) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
            case '/style.css':
                handlers.style(request, response);
                break;
            default:
                handlers.error(request, response);
                break;
        }
    } */

var server = app.listen(port, function() {
    console.log('Serwer nasłuchuje na http://localhost:' + port);
});

console.log("Uruchomiono serwer na porcie: ".green + port + '!'.green);
};

exports.start = start;