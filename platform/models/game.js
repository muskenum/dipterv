const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Game = db.model('Game', {
    name: String,
    desc: String,
    gamefile: String,
    _owner: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = Game;