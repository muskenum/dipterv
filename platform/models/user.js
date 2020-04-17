const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    _userID: String,
    Name: String,
    UserName: String,
    Mail: String,
    Pass: String,
    Country: String
});

module.exports = User;