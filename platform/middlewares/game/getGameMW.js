/**
 * Gets one game from the database using the :gameid parameter.
 * Saves the result to res.locals.game.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const GameModel = requireOption(objectRepository, 'GameModel');
    let actualID = "";
    return function (req, res, next) {
        if (typeof req.params.gameid !== 'undefined') {
            actualID = req.params.gameid;
        } else if (typeof res.locals.lobby !== 'undefined') {
            actualID = res.locals.lobby._game;
        }
        GameModel.findOne({_id: actualID}, (err, game) => {
            if (err || !game) {
                return next(err);
            }
            res.locals.game = game;
            return next();
        });
    };
};