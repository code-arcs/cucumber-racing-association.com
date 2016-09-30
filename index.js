'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Cucumber = require('./cucumber');

let thrownCucumbers = 0;

io.on('connection', function (client) {
    client.on('join', function (data) {
        for (let i = 0; i < Cucumber._getRandomInt(5, 15); i++) {
            const x = Cucumber._getRandomInt(50, data.windowWidth - 50) / data.windowWidth;
            client.emit('throwCucumber', Cucumber.create(x, Cucumber._getRandomInt(20, 50)));
        }

        client.emit('thrownCucumbers', thrownCucumbers);
    });

    client.on('throwCucumber', function (data) {
        thrownCucumbers++;
        io.emit('throwCucumber', Cucumber.create(data.x, data.y));
        io.emit('thrownCucumbers', thrownCucumbers);
    });

});

setInterval(() => {
    for(let i = 0; i < Cucumber._getRandomInt(1, 5); i++) {
        io.emit('throwCucumber', Cucumber.create(Math.random(), Cucumber._getRandomFloat(20, 50)))
    }
}, 20000);


app.use(express.static('public'));

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});