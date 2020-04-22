const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Lobby = db.model('Lobby', {
    name: String,
    capacity: Number,
    size: Number,
    _creator: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    _game: {
        type: Schema.Types.ObjectID,
        ref: 'Game'
    }
});

module.exports = Lobby;