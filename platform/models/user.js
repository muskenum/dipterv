const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    userName: String,
    userUserName: String,
    userMail: String,
    userPass: String,
    userCountry: String
});

module.exports = User;