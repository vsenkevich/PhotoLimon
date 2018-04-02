const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('request: ', req.url);
    const filePath = (req.url === '/') ? './public/index.html' : './public' + req.url;
    console.log('path: ', filePath);

    fs.readFile(filePath, (err, file) => {
        if (err) {
            res.writeHead(404);
            res.write("File not found", filePath);
        }
        else {
            res.writeHead(200);
            res.write(file);
        }
        res.end();
    });
});

server.listen('3000', () => {
    console.log('Server is running');
});
