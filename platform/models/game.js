const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Game = db.model('Game', {
    _gameID: String,
    Name: String,
    Desc: String,
    File: String,
    _Owner: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = Game;