const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Lobby = db.model('Lobby', {
    lobbyID: Number,
    lobbySize: Number,
    _lobbyCreator: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    _lobbyGame: {
        type: Schema.Types.ObjectID,
        ref: 'Game'
    }
});

module.exports = Lobby;