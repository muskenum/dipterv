/**
 * Gets one lobby from the database using the :lobbyid parameter.
 * Saves the result to res.locals.lobby.
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const LobbyModel = requireOption(objectRepository, 'LobbyModel');
    return function (req, res, next) {
        LobbyModel.findOne({_id: req.params.lobbyid}, (err, lobby) => {
            if (err || !lobby) {
                next(err);
            }
            res.locals.lobby = lobby;
            return next();
        });
    };
};