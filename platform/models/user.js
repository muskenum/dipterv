const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    name: String,
    username: String,
    mail: String,
    pass: String,
    country: String
});

module.exports = User;