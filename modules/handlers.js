var fs = require('fs'),
    formidable = require('formidable');

let fileUploaded = new Object();

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
    console.log('Kończę obsługę żądania welcome.');
}

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");

    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        fileUploaded.temp = fs.readFileSync(files.upload.path);
        fileUploaded.name = fields.title || files.upload.name;
        fileUploaded.path = './' + fileUploaded.name;
        fs.writeFileSync(fileUploaded.path, fileUploaded.temp);
        fs.readFile('templates/uploaded.html', function(err, html) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(html);
            response.end();
        });
        /* response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end(); */
        console.log("Kończę obsługę żądania upload.");
    });
}

exports.show = function(request, response) {
    fs.readFile(fileUploaded.path, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.style = function(request, response) {
    console.log('Wysyłam style.');
    fs.readFile('./templates/style.css', "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}