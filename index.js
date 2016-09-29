var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    client.on('throwCucumber', function(data) {
        console.log(data);
        io.emit('throwCucumber', data);
    });
});


app.use(express.static('public'));

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});