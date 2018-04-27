var fs = require('fs'),
  formidable = require('formidable'),
  http = require('http'),
  express = require('express'),
  app = express();

let fileUploaded = new Object();

exports.welcome = function(request, response) {
  console.log('Rozpoczynam obsługę żądania welcome.');
  fs.readFile('templates/start.html', function(err, html) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(html);
    response.end();
  });
  console.log('Kończę obsługę żądania welcome.');
};

exports.upload = function(request, response, next) {
  console.log('Rozpoczynam obsługę żądania upload.');
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    if (files.upload) {
      fileUploaded.temp = fs.readFileSync(files.upload.path);
      fileUploaded.name = fields.title || files.upload.name;
      fileUploaded.path = './' + fileUploaded.name;
      fs.writeFileSync(fileUploaded.path, fileUploaded.temp);
      fs.readFile('templates/uploaded.html', function(err, html) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(html);
        response.end();
      });
      console.log('Kończę obsługę żądania upload.');
    } else {
      console.log('nic nie przesłano');
      response.redirect(303, '/');
      console.log('Kończę obsługę żądania upload bez danych.');
    }
  });
};

exports.show = function(request, response) {
  console.log('Rozpoczynam obsługę żądania show.');
  fs.readFile(fileUploaded.path, 'binary', function(error, file) {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(file, 'binary');
    response.end();
  });
  console.log('Kończę obsługę żądania show.');
};

exports.error = function(request, response) {
  console.log('Nie wiem co robić.');
  response.write('404 :(');
  response.end();
};
