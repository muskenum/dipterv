/**
 * Gets all games from the database and puts them on res.locals.games.
 * If there is an user specified, then gets only that user's games.
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const GameModel = requireOption(objectRepository, 'GameModel');
    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            GameModel.find({}, (err, games) => {
                if (err) {
                    return next(err);
                }
                res.locals.games = games;
                return next();
            });
        } else {
            GameModel.find({_owner: res.locals.user._id}, (err, games) => {
                if (err) {
                    return next(err);
                }
                res.locals.games = games;
                return next();
            });
        }
    };
};