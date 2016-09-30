'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Cucumber = require('./cucumber');
const fs = require('fs');

let thrownCucumbers;

io.on('connection', function (client) {
    client.on('join', function (data) {
        for (let i = 0; i < Cucumber._getRandomInt(5, 15); i++) {
            const x = Cucumber._getRandomInt(50, data.windowWidth - 50) / data.windowWidth;
            client.emit('throwCucumber', Cucumber.create(x, Cucumber._getRandomInt(20, 50)));
        }
        sendInfo(client);
    });

    client.on('throwCucumber', function (data) {
        thrownCucumbers++;
        io.emit('throwCucumber', Cucumber.create(data.x, data.y));
        sendInfo(client);
    });

    client.on('disconnect', function(data) {
        sendInfo(client);
    });

    client.on('timeout', function(){
        console.log("client.timeout")
    });
});

io.on('timeout', function(){
    console.log("io.timeout")
});

setInterval(() => {
    for(let i = 0; i < Cucumber._getRandomInt(1, 5); i++) {
        io.emit('throwCucumber', Cucumber.create(Math.random(), Cucumber._getRandomFloat(20, 50)))
    }
}, 20000);


app.use(express.static('public'));

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    fs.readFile('./db/cucumber.json', 'UTF8', (err, data) => {
        if(err) throw err;

        thrownCucumbers = JSON.parse(data).thrownCucumbers;

    })
});

function sendInfo(client) {
    client.emit('info', {
        thrownCucumbers: thrownCucumbers,
        connectedUsers: Object.keys(io.sockets.sockets).length
    });

    writeThrownCucumbers(thrownCucumbers);
}

function writeThrownCucumbers(thrownCucumbers){
    fs.writeFile('./db/cucumber.json', JSON.stringify({thrownCucumbers: thrownCucumbers}), (err) => {});
}