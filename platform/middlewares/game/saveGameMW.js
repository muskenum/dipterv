/**
 * Updates or creates a game in the database, using POST parameters
 * If the requested game exists, the middleware updates it, otherwise it creates a new entity.
 * Redirects to the game's page if successful.
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const GameModel = requireOption(objectRepository, 'GameModel');
    return function (req, res, next) {
        console.log(req.file);
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.desc === 'undefined')) {
            return next();
        }
        if (typeof res.locals.game === 'undefined') {
            res.locals.game = new GameModel();
        }
        res.locals.game.name = req.body.name;
        res.locals.game.desc = req.body.desc;
        res.locals.game.gamefile = req.file.filename;
        res.locals.game._owner = res.locals.session.user._id;
        res.locals.game.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(`/games/${res.locals.game._id}`);
        });
    };
};