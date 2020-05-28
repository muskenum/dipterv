const io = require('socket.io-client');

const Game = require('./game/Game');

const socket = io();
const game = Game.create(socket, 'canvas');
socket.emit('new-player', {name: 'Jolika'}, () => {
    game.run();
});

