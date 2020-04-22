/**
 * Gets one game from the database using the :gameid parameter.
 * Saves the result to res.locals.game.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const GameModel = requireOption(objectRepository, 'GameModel');
    return function (req, res, next) {
        GameModel.findOne({_id: req.params.gameid}, (err, game) => {
            if (err || !game) {
                return next(err);
            }
            res.locals.game = game;
            return next();
        });
    };
};