const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.game= {
            _gameID: "id1",
            Name: "HoI2",
            Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            File: "game.zip",
            _Owner: {
                type: "gameowner",
                ref: 'User'
            }
        };
        return next();
    };
};