const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Lobby = db.model('Lobby', {
    _lobbyID: String,
    Name: String,
    Capacity: Number,
    Size: Number,
    _Creator: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    _Game: {
        type: Schema.Types.ObjectID,
        ref: 'Game'
    }
});

module.exports = Lobby;