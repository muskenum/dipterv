const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const LobbyModel = requireOption(objectRepository, 'LobbyModel');
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined')||
            (typeof req.body.capacity === 'undefined') ||
            (typeof req.body._game === 'undefined')) {
            return next();
        }
        if (typeof res.locals.lobby === 'undefined') {
            res.locals.lobby = new LobbyModel();
        }
        res.locals.lobby.name = req.body.name;
        res.locals.lobby.capacity = req.body.capacity;
        res.locals.lobby.size = 1;
        res.locals.lobby._creator = res.locals.session.user._id;
        res.locals.lobby._game = req.body._game;
        res.locals.lobby.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(`/lobbies/${res.locals.lobby._id}`);
        });
    };
};