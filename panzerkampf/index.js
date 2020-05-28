//Dependencies
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const port = process.env.port || 5000;

const Game = require('./server/Game');

//Initialization
const app = express();
const server = http.Server(app);
const io = socketio(server);
const game = new Game();

app.set('port', port);
app.use('/client', express.static(__dirname + '/client'));
app.use('/dist', express.static(__dirname + '/dist'));

//Routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything runs asynchronously with
 * the game loop.
 */
io.on('connection', socket => {
    socket.on('new-player', (data, callback) => {
        game.addNewPlayer(data.name, socket);
        io.sockets.emit('chat-server-to-client', {
            name: 'Panzerkampf',
            message: `${data.name} has joined the game.`,
            isNotification: true
        });
        callback();
    });

    socket.on('player-action', data => {
        game.updatePlayerOnInput(socket.id, data);
    });

    socket.on('chat-client-to-server', data => {
        io.sockets.emit('chat-server-to-client', {
            name: game.getPlayerNameBySocketId(socket.id),
            message: data
        });
    });

    socket.on('disconnect', () => {
        const name = game.removePlayer(socket.id);
        io.sockets.emit('chat-server-to-client', {
            name: 'Panzerkampf',
            message: `${name} has left the game.`,
            isNotification: true
        });
    });
});

setInterval(() => {
    game.update();
    game.sendState();
}, 10000 / 180);

//Starting the server
server.listen(port, () => {
    console.log(`Listening on ${port}`);
});