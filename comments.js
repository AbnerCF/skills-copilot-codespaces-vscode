// Create web server
// Create a server that listens on port 8000
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/comments' && req.method === 'POST') {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();
        });
        req.on('end', function () {
            comments.push(JSON.parse(body));
            res.end();
        });
    } else if (parsedUrl.pathname === '/comments' && req.method === 'GET') {
        res.end(JSON.stringify(comments));
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(8000);