var http = require('http'),
    colors = require('colors'),
    handlers = require('./handlers');
    
function start() {
    function onRequest(request, response) {
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
        }
    }

http.createServer(onRequest).listen(80);

console.log("Uruchomiono serwer!".green);
}

exports.start = start;