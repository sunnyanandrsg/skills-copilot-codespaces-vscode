// Create web server with Node.js
// 1. Import module http
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
// 2. Create web server
var server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.write('Not found');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data, 'utf8');
                }
                res.end();
            });
            break;
        case '/comments':
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });
                req.on('end', function() {
                    var post = qs.parse(body);
                    console.log(post);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Success');
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Hello');
            }
            break;
        default:
            res.writeHead(404);
            res.write('Not found');
            res.end();
            break;
    }
});
server.listen(8000);
console.log('Server running at http://localhost:8000/');