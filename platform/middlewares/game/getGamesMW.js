const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.locals.games = [
            {
                _gameID: "id1",
                Name: "AOE2",
                Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                File: "alma",
                _Owner: {
                    type: "dsgfsdgf",
                    ref: 'User'
                }
            },
            {
                _gameID: "id2",
                Name: "M&B Warband",
                Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                File: "alma",
                _Owner: {
                    type: "assadf",
                    ref: 'User'
                }
            }
        ];
        next();
    };
};