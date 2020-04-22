/**
 * Gets all lobbies from the database and puts them on res.locals.lobbies.
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const LobbyModel = requireOption(objectRepository, 'LobbyModel');
    return function (req, res, next) {
        LobbyModel.find({}, (err, lobbies) => {
            if (err) {
                return next(err);
            }
            res.locals.lobbies = lobbies;
            return next();
        });
    };
};