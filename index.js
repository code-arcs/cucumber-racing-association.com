'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Cucumber = require('./cucumber');


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        for(let i = 0; i < Cucumber._getRandomInt(5,15); i++) {
            const x = Cucumber._getRandomInt(50, data.windowWidth - 50) / data.windowWidth;
            client.emit('throwCucumber', Cucumber.create(x, Cucumber._getRandomInt(20, 100)));
        }
    });

    client.on('throwCucumber', function(data) {
        io.emit('throwCucumber', Cucumber.create(data.x, data.y));
    });
});


app.use(express.static('public'));

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});