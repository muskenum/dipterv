const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Game = db.model('Game', {
    gameName: String,
    gameDesc: String,
    gameFile: String,
    _gameOwner: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = Game;