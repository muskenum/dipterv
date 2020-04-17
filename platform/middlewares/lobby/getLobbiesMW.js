const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.lobbies = [
            {
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
            },
            {
                _lobbyID: "id2",
                Name: "ProGamers",
                Capacity: 69,
                Size: 45,
                _Creator: {
                    type: "LobbyCreator2",
                    ref: 'User'
                },
                _Game: {
                    type: "lobbyGame2",
                    ref: 'Game'
                }
            }
        ];
        next();
    };
};