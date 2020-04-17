const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.lobby = {
            _lobbyID: "id1",
            Name: "OnlyNoobs",
            Capacity: 42,
            Size: 17,
            _Creator: {
                type: "LobbyCreator1",
                ref: 'User'
            },
            _Game: {
                type: "lobbyGame1",
                ref: 'Game'
            }
        };
        return next();
    };
};